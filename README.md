# Hidaya content packs

Downloadable content packs for the Hidaya app (Quran translations and HadeethEnc hadith translations), published unmodified from their sources.

- Each release is a tag named after the content version (for example `2026.11.1`). The app downloads `packs/<file>` from that tag and checks every file against the SHA-256 in the manifest bundled inside the app.
- `packs/manifest.json` lists every pack (bundled and downloadable) with its size, SHA-256 and the pinned source files it was built from.
- The text in every pack is stored exactly as its publisher released it. Sources, licences and attributions are in [LICENSES.md](LICENSES.md) and in each pack's `meta` table.

Built reproducibly by the content pipeline in the (private) app repository: `node content/scripts/build.mjs`.

## Zakat rates

`rates/zakat-rates.json` holds the day's gold and silver prices (US dollars per gram) and exchange rates (units per US dollar) for the app's zakat calculator. The [Zakat rates workflow](.github/workflows/zakat-rates.yml) rebuilds it every day with `node scripts/zakat-rates.mjs` from Frankfurter's blended central-bank rates (frankfurter.dev, free to use), cross-checked against fawazahmed0/exchange-api (CC0). If the sources disagree or are stale, the previous file is kept. Prices are for guidance only.
