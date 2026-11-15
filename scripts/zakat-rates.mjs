#!/usr/bin/env node
// Writes rates/zakat-rates.json for the Hidaya zakat calculator: gold and silver in US dollars per gram, and how many
// units of each currency buy 1 US dollar. Source: Frankfurter's blended daily rates (frankfurter.dev, free to use),
// cross-checked against fawazahmed0/exchange-api (CC0). If the two disagree too much, or the data is stale, the
// script exits with an error and leaves the last good file in place.
//
//   node scripts/zakat-rates.mjs

import { readFileSync, writeFileSync, mkdirSync, existsSync } from "node:fs";

const CURRENCIES = (
  "EUR,GBP,CHF,CAD,AUD,NZD,JPY,CNY,HKD,SGD,KRW,INR,PKR,BDT,LKR,NPR,AFN,IRR,IDR,MYR,BND,THB,PHP,TRY,EGP,MAD,DZD,TND," +
  "LYD,JOD,LBP,IQD,SYP,SAR,AED,BHD,KWD,QAR,OMR,YER,NGN,KES,TZS,UGX,ZAR,GHS,ETB,SDG,SOS,XOF,RUB,KZT,UZS,AZN,TJS,KGS," +
  "TMT,BAM,ALL,MKD,SEK,NOK,DKK,PLN,CZK,HUF,RON,BRL,MXN,ARS,MVR"
).split(",");
const GRAMS_PER_TROY_OUNCE = 31.1034768;
const MAX_AGE_DAYS = 5;
const OUT = "rates/zakat-rates.json";

async function json(url) {
  const res = await fetch(url, { headers: { "user-agent": "hidaya-content-rates" }, signal: AbortSignal.timeout(60_000) });
  if (!res.ok) throw new Error(`${url}: HTTP ${res.status}`);
  return res.json();
}

const rows = await json(`https://api.frankfurter.dev/v2/rates?base=USD&quotes=${[...CURRENCIES, "XAU", "XAG"].join(",")}`);
const perUsd = {};
let latest = "";
for (const r of rows) {
  if (r.base !== "USD" || !(r.rate > 0)) continue;
  perUsd[r.quote] = r.rate;
  if (r.date > latest) latest = r.date;
}
const xau = perUsd.XAU, xag = perUsd.XAG;
delete perUsd.XAU; delete perUsd.XAG;
if (!xau || !xag) throw new Error("no gold or silver rate from Frankfurter");
const ageDays = (Date.now() - Date.parse(latest + "T00:00:00Z")) / 86_400_000;
if (ageDays > MAX_AGE_DAYS) throw new Error(`Frankfurter data is ${ageDays.toFixed(1)} days old (${latest})`);

const goldUsdPerGram = 1 / xau / GRAMS_PER_TROY_OUNCE;
const silverUsdPerGram = 1 / xag / GRAMS_PER_TROY_OUNCE;

// Cross-check against an independent source; skip (with a warning) if it is down.
try {
  const f = (await json("https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies/usd.min.json")).usd;
  const off = (a, b) => Math.abs(a / b - 1);
  const checks = [["gold", 1 / f.xau / GRAMS_PER_TROY_OUNCE, goldUsdPerGram, 0.04], ["silver", 1 / f.xag / GRAMS_PER_TROY_OUNCE, silverUsdPerGram, 0.08],
    ...["EUR", "GBP", "PKR", "INR", "SAR", "TRY"].filter((c) => perUsd[c] && f[c.toLowerCase()]).map((c) => [c, f[c.toLowerCase()], perUsd[c], 0.05])];
  for (const [what, other, ours, limit] of checks) {
    if (off(ours, other) > limit) throw new Error(`${what}: ${ours} differs from the cross-check ${other} by more than ${limit * 100}%`);
  }
} catch (e) {
  if (String(e.message).includes("differs")) throw e;
  console.warn(`cross-check skipped: ${e.message}`);
}

const round = (x, digits) => Number(x.toPrecision(digits));
const file = {
  version: 1,
  asOf: latest,
  source: "Frankfurter (frankfurter.dev), blended daily central-bank reference rates",
  goldUsdPerGram: round(goldUsdPerGram, 6),
  silverUsdPerGram: round(silverUsdPerGram, 6),
  perUsd: Object.fromEntries(Object.keys(perUsd).sort().map((c) => [c, round(perUsd[c], 6)])),
};
const text = JSON.stringify(file, null, 1) + "\n";
mkdirSync("rates", { recursive: true });
if (existsSync(OUT) && readFileSync(OUT, "utf8") === text) console.log("unchanged");
else { writeFileSync(OUT, text); console.log(`wrote ${OUT}: ${latest}, gold $${file.goldUsdPerGram}/g, silver $${file.silverUsdPerGram}/g, ${Object.keys(perUsd).length} currencies`); }
