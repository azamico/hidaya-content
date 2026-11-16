# Content sources and licences

Every piece of Quran, hadith, translation, city and font data that Hidaya ships or downloads, with its terms and how we comply. The in-app **Sources** screen (Settings → About) shows the same attributions, read from each pack's `meta` table.

Hidaya is a commercial app (free download, one-week trial, then subscription or one-time unlock; no ads). Every source below was checked for that use on 14 November 2026. Terms were read on the providers' own sites; quotes are verbatim.

**Integrity rule (all sources):** text is stored exactly as published. The pipeline only splits it into rows; `content/scripts/verify.mjs` fails the build if any stored Quran, translation or hadith text differs by a single character from the pinned source file.

---

## 1. Quran Arabic text: Tanzil Project

- **Source:** https://tanzil.net (Quran text version 1.1; metadata version 1.0). Uthmani, Simple and Simple (Clean) text types, XML output, download-page default options (pause marks, sajdah sign, superscript alef, tatweel).
- **Licence:** Creative Commons Attribution 3.0. Commercial use is allowed under CC BY.
- **Terms (verbatim, from the copyright block in every file):**
  > Permission is granted to copy and distribute verbatim copies of this text, but CHANGING IT IS NOT ALLOWED.
  >
  > This Quran text can be used in any website or application, provided that its source (Tanzil Project) is clearly indicated, and a link is made to tanzil.net to enable users to keep track of changes.
  >
  > This copyright notice shall be included in all verbatim copies of the text, and shall be reproduced appropriately in all files derived from or containing substantial portion of this text.
- **How we comply:** text stored verbatim (verified); the full copyright block of each text type is kept in `quran.sqlite` (`meta.notice_uthmani`, `notice_simple`, `notice_simple_clean`); the Sources screen names Tanzil Project and links to https://tanzil.net. The diacritic-free `text_search` column is a search index derived from the Simple (Clean) text and is never displayed.
- **Pack:** `quran.sqlite`.

## 2. Quran translations: QuranEnc.com

- **Source:** https://quranenc.com, Encyclopedia of the Translations of the Meanings of the Noble Quran (Rowad Translation Center with the King Fahd Glorious Quran Printing Complex and partners). One XML file per translation from `https://quranenc.com/en/home/d/xml/<key>`.
- **Terms (verbatim, from the "Terms and Policies" on https://quranenc.com/en/home/api/):**
  > Contents of the translations can be downloaded and re-published, with the following terms and conditions:
  > 1. No modification, addition, or deletion of the content.
  > 2. Clearly referring to the publisher and the source (QuranEnc.com).
  > 3. Mentioning the version number when re-publishing the translation.
  > 4. Keeping the transcript information inside the document.
  > 5. Notifying the source (QuranEnc.com) of any note on the translation.
  > 6. Updating the translation according to the latest version issued from the source (QuranEnc.com).
  > 7. Inappropriate advertisements must not be included when displaying translations of the meanings of the Noble Quran.
- **Commercial use:** the terms don't mention paid apps. Decision (Azam, 14 Nov 2026): rely on the published terms.
- **How we comply:** (1) verbatim, including footnote markers and footnotes (verified); (2) the Sources screen and each translation's header credit the translation title/publisher and QuranEnc.com; (3) the version number is stored in each pack (`meta.version`) and shown; (4) the file's metadata (`title`, `id`, `url`, `updated_at`) is kept in `meta`; (5) a "Report a note on this translation" link goes to QuranEnc; (6) the pipeline pins each file's SHA-256 and `fetch.mjs --update` picks up new versions (check before each release); (7) no ads at all.
- **Not used:** Tanzil's translations ("for non-commercial purposes only").
- **Packs:** `tr-<lang>-<key>.sqlite`, listed below.

## 3. Daily hadith: HadeethEnc.com

- **Source:** https://hadeethenc.com, Encyclopedia of Translated Prophetic Hadiths (Rowad Translation Center). SQLite export per language from `https://hadeethenc.com/en/browse/download/<lang>/sqlite`.
- **Terms (verbatim, from the "Terms and Policies" on https://hadeethenc.com/en/home):**
  > Contents of the translations can be downloaded and republished under the following terms:
  > 1. No modification, addition, or deletion of the content.
  > 2. Clearly refer to the publisher and source (HadeethEnc.com).
  > 3. Mention the version number when republishing the translation.
  > 4. Keep the translation version information inside the document.
  > 5. Notify the source (HadeethEnc.com) of any note on the translation.
  > 6. Update translations according to the latest version issued by the source.
  > 7. Do not include inappropriate advertisements when displaying the content.
- **Commercial use:** not mentioned; handled like QuranEnc.
- **Version:** HadeethEnc files carry no version number. We use the date of the file inside each download (stored as `meta.version` and shown on the Sources screen) plus its SHA-256 pin.
- **How we comply:** as for QuranEnc. The lock screen only shows hadith short enough to display in full (brief §6); nothing is truncated.
- **Curation:** only hadith attributed to the Six Books with a Sahih/Hasan grade are candidates (`content/review/daily-hadith-candidates.csv`). Azam reviews them; only approved ids go into `content/daily-hadith-allowlist.json`.
- **Packs:** `hadeethenc-<lang>.sqlite`.

## 4. The Six Books (Arabic and translations): fawazahmed0/hadith-api

- **Source:** https://github.com/fawazahmed0/hadith-api, pinned to commit `df57907be35291c91ad6a6691180e22ca9920784` (Arabic editions `ara-<collection>` and translation editions `<eng|urd|ind|ben|tur|fra|rus|tam>-<collection>`, served via jsDelivr).
- **Licence:** The Unlicense:
  > This is free and unencumbered software released into the public domain. … Anyone is free to copy, modify, publish, use, compile, sell, or distribute this software … for any purpose, commercial or non-commercial, and by any means.
- **Grades:** included per hadith with the grader's name (e.g. Al-Albani, Shuaib Al Arnaut, Zubair Ali Zai, Muhammad Muhyi Al-Din Abdul Hamid). Not all hadith have grades.
- **Translations:** English, Urdu, Indonesian, Bengali, Turkish, French, Russian and Tamil, wherever the repository has an edition (40 packs). The translators' rights (e.g. Muhsin Khan's Bukhari translation) are not covered by the Unlicense; **Azam has permission to use them** (DECISIONS #15, 15 Nov 2026). Each pack's attribution names the translator where the source gives one. Some editions are incomplete (e.g. Turkish an-Nasa'i); the app falls back to English for those hadith.
- **Packs:** `hadith-<collection>-ar.sqlite` (Arabic, with grades) and `hadith-<collection>-<lang>.sqlite` (translations, matched to the Arabic by hadith number).

## 4a. Quran recitation: EveryAyah

- **Source:** verse-by-verse MP3s from https://everyayah.com (`data/<reciter>/<SSSAAA>.mp3`), streamed by the app; nothing is bundled or hosted by us.
- **Reciters:** Mishary Rashid Alafasy (`Alafasy_128kbps`), Abdul Basit Abdus Samad (`Abdul_Basit_Murattal_192kbps`), Mahmoud Khalil Al-Husary (`Husary_128kbps`), Abdur-Rahman As-Sudais (`Abdurrahmaan_As-Sudais_192kbps`).
- **Permission:** Azam has permission for these reciters (DECISIONS #15/#17); in-app credit is not required, so it is listed here only, not on the Sources screen (DECISIONS #20).

## 4b. Adhkar: Hisn al-Muslim (hisnmuslim.com)

- **Source:** *Hisn al-Muslim* (Fortress of the Muslim) by Sa'id ibn Ali ibn Wahf al-Qahtani, from the hisnmuslim.com API: `api/ar/husn_ar.json`, `api/en/husn_en.json` and `api/{ar,en}/{1..132}.json`, pinned by SHA-256 in `sources.lock.json`.
- **Permission:** Azam has permission to use the Arabic text, transliteration and English translation (15 Nov 2026); in-app credit is not required, so it is listed here only, not on the Sources screen (DECISIONS #20).
- **Use:** stored verbatim (only line endings normalised and surrounding spaces trimmed; `verify.mjs` checks every item against the source). The app adds a tap counter using each item's repeat count.
- **Pack:** `adhkar.sqlite` (bundled).

## 4d. Adhan recordings

- **Voices:** Masjid al-Haram (Makkah), Sheikh Usaamah Akhdhar (Madinah), Mishary Rashid Alafasy (three recordings), Ahmad Al Nafees, Mansour Al-Zahrani, Hafiz Mustafa Özcan, Doha (Qatar) and Mohammed Gad, and a recording of the dua after the adhan. MP3s supplied by Azam on 15 Nov 2026 (`design/adhan-src/`).
- **Permission:** Azam has permission for the adhan voices (DECISIONS #15/#22). Credited on the Sources screen.
- **Use:** decoded with Windows Media Foundation (`design/tools/adhan-decode.ps1`), then `design/tools/adhan.mjs` trims leading and trailing silence, levels each to a -1 dBFS peak and writes a 29-second version (with a fade-out, for iPhone notifications) and the full recording into `design/audio/`, which both apps bundle. Nothing else is edited.

## 4c. The 99 Names of Allah

- **Arabic and transliteration:** the list narrated by at-Tirmidhi (3507), in its order, in the standard forms.
- **English meanings:** short glosses drafted for Hidaya (DECISIONS #14), reviewed by Azam before release (`content/asma-ul-husna.json`, `reviewed`).
- **Pack:** carried in `reading-lists.json`.

## 5. Cities: GeoNames

- **Source:** https://download.geonames.org/export/dump/: `cities15000.zip`, `countryInfo.txt`, `admin1CodesASCII.txt`. GeoNames regenerates these daily, so the snapshot used is committed in `content/sources/geonames/`.
- **Licence:** Creative Commons Attribution 4.0. GeoNames: "commercial usage is allowed" and "You should give credit to GeoNames when using data or web services with a link or another reference to GeoNames."
- **How we comply:** the Sources screen credits GeoNames with a link and the CC BY 4.0 licence.
- **Pack:** `cities.sqlite`.

## 6. Fonts

All bundled from `design/fonts/` (from github.com/google/fonts at commit `29b4ec6`) under the SIL Open Font License 1.1, which allows bundling in commercial apps. The licence text for each is in `design/fonts/OFL-*.txt` and is shipped with the app.

| Font | Use | Licence file |
|---|---|---|
| Amiri Quran | Quran Arabic | `OFL-AmiriQuran.txt` |
| Amiri | Hadith Arabic | `OFL-Amiri.txt` |
| EB Garamond | Display, translations | `OFL-EBGaramond.txt` |
| Inter | Interface | `OFL-Inter.txt` |
| Noto Nastaliq Urdu | Urdu translation | `OFL-NotoNastaliqUrdu.txt` |

## Where sources are credited in the app

On **Settings → Sources and licences**, which shows the attribution text stored in each pack on the phone (`meta.attribution`, from `content/scripts/lib/notices.mjs`) plus the data, fonts and software below. The Ayah and Hadith screens show only the Quran or Six Books reference (DECISIONS #16).

## 7. Magnetic declination: World Magnetic Model

- **Use:** turning the compass's magnetic heading into true north for the Qibla. Android uses the system's `GeomagneticField`. On iOS, when the phone gives no true heading (no location permission), `ios/Core/Sources/Core/Qibla/Declination.swift` does the same calculation.
- **Data:** WMM-2020 coefficients from NOAA/NGA (US government work, public domain).
- **Code:** the iOS calculation is ported from Android's `android.hardware.GeomagneticField` (Android Open Source Project, Apache License 2.0). The Sources screen credits AOSP and shows the Apache 2.0 notice.

## 8. Gold, silver and exchange rates (zakat calculator)

- **Source:** [Frankfurter](https://frankfurter.dev) v2 blended daily rates (base USD, including XAU and XAG). Its licence page says the blended rates are Frankfurter's own calculation and free to use; no attribution is required, but the Sources screen credits it. Cross-checked against [fawazahmed0/exchange-api](https://github.com/fawazahmed0/exchange-api) (CC0-1.0), which is not republished.
- **Use:** `scripts/zakat-rates.mjs` in hidaya-content writes `rates/zakat-rates.json` (gold and silver in US dollars per gram, units of each currency per US dollar) once a day; the app downloads it when the calculator opens (DECISIONS #21). Not used: LBMA prices (licensed), ExchangeRate-API open access (no redistribution), the free tiers of metal-price APIs (no commercial use).

## 9. Moon phase

- **Code:** `MoonPhase` in both cores uses the low-precision sun and moon positions from Jean Meeus, *Astronomical Algorithms*, in the form used by [SunCalc](https://github.com/mourner/suncalc) (Vladimir Agafonkin, BSD 2-Clause License). Credited on the Sources screen.

---

## Packs

Generated from the built packs by `node content/scripts/licenses.mjs`. Don't edit by hand.

<!-- generated:packs:start -->
| Pack | Content | Source and version | Size | Bundled |
|---|---|---|---|---|
| `adhkar.sqlite` | adhkar | hisnmuslim.com | 0.3 MB | yes |
| `cities.sqlite` | Cities (population ≥ 15,000) | GeoNames snapshot 2026-11-14T03:44:34 | 7.2 MB | yes |
| `daily-hadith.json` | Daily-hadith pool: 618 HadeethEnc ids, not yet reviewed | built from HadeethEnc packs + `daily-hadith-allowlist.json` | 0.0 MB | yes |
| `hadeethenc-ar.sqlite` | Daily hadith (ar) | HadeethEnc, file dated 2026-10-14T13:50:10 | 12.4 MB | yes |
| `hadeethenc-az.sqlite` | Daily hadith (az) | HadeethEnc, file dated 2026-06-02T19:01:28 | 1.7 MB | download |
| `hadeethenc-bn.sqlite` | Daily hadith (bn) | HadeethEnc, file dated 2026-11-13T00:36:14 | 12.2 MB | download |
| `hadeethenc-bs.sqlite` | Daily hadith (bs) | HadeethEnc, file dated 2026-10-02T00:35:02 | 5.8 MB | download |
| `hadeethenc-de.sqlite` | Daily hadith (de) | HadeethEnc, file dated 2026-09-25T00:34:32 | 2.1 MB | download |
| `hadeethenc-en.sqlite` | Daily hadith (en) | HadeethEnc, file dated 2026-06-02T17:54:32 | 6.3 MB | yes |
| `hadeethenc-es.sqlite` | Daily hadith (es) | HadeethEnc, file dated 2026-06-26T00:32:34 | 5.4 MB | download |
| `hadeethenc-fa.sqlite` | Daily hadith (fa) | HadeethEnc, file dated 2026-07-31T00:37:42 | 10.7 MB | download |
| `hadeethenc-fr.sqlite` | Daily hadith (fr) | HadeethEnc, file dated 2026-06-02T18:08:08 | 5.4 MB | download |
| `hadeethenc-ha.sqlite` | Daily hadith (ha) | HadeethEnc, file dated 2026-06-02T18:32:52 | 3.7 MB | download |
| `hadeethenc-hi.sqlite` | Daily hadith (hi) | HadeethEnc, file dated 2026-08-28T00:35:50 | 11.3 MB | download |
| `hadeethenc-id.sqlite` | Daily hadith (id) | HadeethEnc, file dated 2026-06-02T18:02:02 | 6.3 MB | download |
| `hadeethenc-it.sqlite` | Daily hadith (it) | HadeethEnc, file dated 2026-06-02T18:58:10 | 0.8 MB | download |
| `hadeethenc-ja.sqlite` | Daily hadith (ja) | HadeethEnc, file dated 2026-06-02T18:41:10 | 1.4 MB | download |
| `hadeethenc-ml.sqlite` | Daily hadith (ml) | HadeethEnc, file dated 2026-06-02T18:35:28 | 8.3 MB | download |
| `hadeethenc-ms.sqlite` | Daily hadith (ms) | HadeethEnc, file dated 2026-06-02T19:09:36 | 0.5 MB | download |
| `hadeethenc-nl.sqlite` | Daily hadith (nl) | HadeethEnc, file dated 2026-06-02T18:46:20 | 2.7 MB | download |
| `hadeethenc-ps.sqlite` | Daily hadith (ps) | HadeethEnc, file dated 2026-06-02T18:42:02 | 4.6 MB | download |
| `hadeethenc-pt.sqlite` | Daily hadith (pt) | HadeethEnc, file dated 2026-06-02T18:34:24 | 4.0 MB | download |
| `hadeethenc-ru.sqlite` | Daily hadith (ru) | HadeethEnc, file dated 2026-06-26T00:37:44 | 12.1 MB | download |
| `hadeethenc-so.sqlite` | Daily hadith (so) | HadeethEnc, file dated 2026-07-03T00:42:20 | 0.9 MB | download |
| `hadeethenc-sq.sqlite` | Daily hadith (sq) | HadeethEnc, file dated 2026-07-31T00:39:06 | 2.4 MB | download |
| `hadeethenc-sw.sqlite` | Daily hadith (sw) | HadeethEnc, file dated 2026-06-02T18:37:34 | 2.6 MB | download |
| `hadeethenc-ta.sqlite` | Daily hadith (ta) | HadeethEnc, file dated 2026-06-19T00:46:44 | 6.4 MB | download |
| `hadeethenc-th.sqlite` | Daily hadith (th) | HadeethEnc, file dated 2026-06-02T18:40:14 | 8.0 MB | download |
| `hadeethenc-tr.sqlite` | Daily hadith (tr) | HadeethEnc, file dated 2026-09-25T00:33:30 | 6.5 MB | download |
| `hadeethenc-ur.sqlite` | Daily hadith (ur) | HadeethEnc, file dated 2026-06-02T17:57:02 | 9.9 MB | download |
| `hadeethenc-uz.sqlite` | Daily hadith (uz) | HadeethEnc, file dated 2026-06-26T00:45:02 | 2.4 MB | download |
| `hadeethenc-zh.sqlite` | Daily hadith (zh) | HadeethEnc, file dated 2026-06-02T18:22:28 | 5.2 MB | download |
| `hadith-abudawud-ar.sqlite` | Sunan Abi Dawud (Arabic, grades) | hadith-api @ df57907 | 12.2 MB | download |
| `hadith-abudawud-bn.sqlite` | hadith-translation | fawazahmed0/hadith-api | 8.8 MB | download |
| `hadith-abudawud-en.sqlite` | hadith-translation | fawazahmed0/hadith-api | 3.5 MB | download |
| `hadith-abudawud-fr.sqlite` | hadith-translation | fawazahmed0/hadith-api | 3.9 MB | download |
| `hadith-abudawud-id.sqlite` | hadith-translation | fawazahmed0/hadith-api | 5.2 MB | download |
| `hadith-abudawud-ru.sqlite` | hadith-translation | fawazahmed0/hadith-api | 5.0 MB | download |
| `hadith-abudawud-tr.sqlite` | hadith-translation | fawazahmed0/hadith-api | 4.5 MB | download |
| `hadith-abudawud-ur.sqlite` | hadith-translation | fawazahmed0/hadith-api | 5.8 MB | download |
| `hadith-bukhari-ar.sqlite` | Sahih al-Bukhari (Arabic, grades) | hadith-api @ df57907 | 18.6 MB | download |
| `hadith-bukhari-bn.sqlite` | hadith-translation | fawazahmed0/hadith-api | 20.0 MB | download |
| `hadith-bukhari-en.sqlite` | hadith-translation | fawazahmed0/hadith-api | 6.4 MB | download |
| `hadith-bukhari-fr.sqlite` | hadith-translation | fawazahmed0/hadith-api | 7.0 MB | download |
| `hadith-bukhari-id.sqlite` | hadith-translation | fawazahmed0/hadith-api | 8.6 MB | download |
| `hadith-bukhari-ru.sqlite` | hadith-translation | fawazahmed0/hadith-api | 10.4 MB | download |
| `hadith-bukhari-ta.sqlite` | hadith-translation | fawazahmed0/hadith-api | 21.4 MB | download |
| `hadith-bukhari-tr.sqlite` | hadith-translation | fawazahmed0/hadith-api | 14.7 MB | download |
| `hadith-bukhari-ur.sqlite` | hadith-translation | fawazahmed0/hadith-api | 13.0 MB | download |
| `hadith-ibnmajah-ar.sqlite` | Sunan Ibn Majah (Arabic, grades) | hadith-api @ df57907 | 8.9 MB | download |
| `hadith-ibnmajah-bn.sqlite` | hadith-translation | fawazahmed0/hadith-api | 5.6 MB | download |
| `hadith-ibnmajah-en.sqlite` | hadith-translation | fawazahmed0/hadith-api | 2.4 MB | download |
| `hadith-ibnmajah-fr.sqlite` | hadith-translation | fawazahmed0/hadith-api | 2.5 MB | download |
| `hadith-ibnmajah-id.sqlite` | hadith-translation | fawazahmed0/hadith-api | 3.8 MB | download |
| `hadith-ibnmajah-tr.sqlite` | hadith-translation | fawazahmed0/hadith-api | 5.4 MB | download |
| `hadith-ibnmajah-ur.sqlite` | hadith-translation | fawazahmed0/hadith-api | 3.8 MB | download |
| `hadith-muslim-ar.sqlite` | Sahih Muslim (Arabic, grades) | hadith-api @ df57907 | 16.2 MB | download |
| `hadith-muslim-bn.sqlite` | hadith-translation | fawazahmed0/hadith-api | 14.5 MB | download |
| `hadith-muslim-en.sqlite` | hadith-translation | fawazahmed0/hadith-api | 5.1 MB | download |
| `hadith-muslim-fr.sqlite` | hadith-translation | fawazahmed0/hadith-api | 5.1 MB | download |
| `hadith-muslim-id.sqlite` | hadith-translation | fawazahmed0/hadith-api | 7.4 MB | download |
| `hadith-muslim-ru.sqlite` | hadith-translation | fawazahmed0/hadith-api | 3.0 MB | download |
| `hadith-muslim-ta.sqlite` | hadith-translation | fawazahmed0/hadith-api | 8.5 MB | download |
| `hadith-muslim-tr.sqlite` | hadith-translation | fawazahmed0/hadith-api | 9.2 MB | download |
| `hadith-muslim-ur.sqlite` | hadith-translation | fawazahmed0/hadith-api | 9.6 MB | download |
| `hadith-nasai-ar.sqlite` | Sunan an-Nasa'i (Arabic, grades) | hadith-api @ df57907 | 11.9 MB | download |
| `hadith-nasai-bn.sqlite` | hadith-translation | fawazahmed0/hadith-api | 8.6 MB | download |
| `hadith-nasai-en.sqlite` | hadith-translation | fawazahmed0/hadith-api | 3.3 MB | download |
| `hadith-nasai-fr.sqlite` | hadith-translation | fawazahmed0/hadith-api | 3.5 MB | download |
| `hadith-nasai-id.sqlite` | hadith-translation | fawazahmed0/hadith-api | 5.0 MB | download |
| `hadith-nasai-tr.sqlite` | hadith-translation | fawazahmed0/hadith-api | 0.5 MB | download |
| `hadith-nasai-ur.sqlite` | hadith-translation | fawazahmed0/hadith-api | 4.0 MB | download |
| `hadith-tirmidhi-ar.sqlite` | Jami' at-Tirmidhi (Arabic, grades) | hadith-api @ df57907 | 12.9 MB | download |
| `hadith-tirmidhi-bn.sqlite` | hadith-translation | fawazahmed0/hadith-api | 10.5 MB | download |
| `hadith-tirmidhi-en.sqlite` | hadith-translation | fawazahmed0/hadith-api | 2.5 MB | download |
| `hadith-tirmidhi-id.sqlite` | hadith-translation | fawazahmed0/hadith-api | 5.0 MB | download |
| `hadith-tirmidhi-tr.sqlite` | hadith-translation | fawazahmed0/hadith-api | 4.1 MB | download |
| `hadith-tirmidhi-ur.sqlite` | hadith-translation | fawazahmed0/hadith-api | 6.3 MB | download |
| `quran.sqlite` | Quran Arabic (Uthmani, Simple), metadata, search index | Tanzil text v1.1, metadata v1.0 | 4.5 MB | yes |
| `reading-lists.json` | Daily-hadith pool: undefined HadeethEnc ids, not yet reviewed | built from HadeethEnc packs + `daily-hadith-allowlist.json` | 0.0 MB | yes |
| `tr-az-azeri_musayev.sqlite` | Ali Khan Musayev (az) | QuranEnc `azeri_musayev` v1.0.4-xml.1 | 1.7 MB | download |
| `tr-bs-bosnian_rwwad.sqlite` | Rowwad Translation Centre (bs) | QuranEnc `bosnian_rwwad` v2.0.4-xml.1 | 1.5 MB | download |
| `tr-de-german_bubenheim.sqlite` | Frank Bubenheim (de) | QuranEnc `german_bubenheim` v1.1.5-xml.1 | 1.6 MB | download |
| `tr-en-english_saheeh.sqlite` | Noor International Center (en) | QuranEnc `english_saheeh` v1.1.2-xml.1 | 1.7 MB | yes |
| `tr-es-spanish_garcia.sqlite` | Isa Garcia (es) | QuranEnc `spanish_garcia` v1.0.2-xml.1 | 1.9 MB | download |
| `tr-fa-persian_ih.sqlite` | Rowwad Translation Center (fa) | QuranEnc `persian_ih` v1.1.3-xml.1 | 2.4 MB | download |
| `tr-fr-french_montada.sqlite` | Noor International Center (fr) | QuranEnc `french_montada` v1.0.0-xml.1 | 1.9 MB | download |
| `tr-ha-hausa_gummi.sqlite` | Abu Bakr Jumi (ha) | QuranEnc `hausa_gummi` v1.2.2-xml.1 | 1.9 MB | download |
| `tr-hi-hindi_omari.sqlite` | Azizul Haq Al-Omari (hi) | QuranEnc `hindi_omari` v1.1.5-xml.1 | 4.3 MB | download |
| `tr-id-indonesian_affairs.sqlite` | Ministry of Religious Affairs (id) | QuranEnc `indonesian_affairs` v1.0.1-xml.1 | 1.9 MB | download |
| `tr-ja-japanese_saeedsato.sqlite` | Saeed Sato (ja) | QuranEnc `japanese_saeedsato` v1.0.13-xml.1 | 5.1 MB | download |
| `tr-ml-malayalam_kunhi.sqlite` | Abdul Hamid Haidar and Kunhi Muhammad (ml) | QuranEnc `malayalam_kunhi` v1.0.3-xml.1 | 5.7 MB | download |
| `tr-nl-dutch_center.sqlite` | Rowwad Translation Center (nl) | QuranEnc `dutch_center` v2.0.10-xml.1 | 1.8 MB | download |
| `tr-ps-pashto_rwwad.sqlite` | Rowwad Translation Center (ps) | QuranEnc `pashto_rwwad` v1.0.1-xml.1 | 2.1 MB | download |
| `tr-pt-portuguese_nasr.sqlite` | Helmi Nasr (pt) | QuranEnc `portuguese_nasr` v1.4.1-xml.1 | 1.8 MB | download |
| `tr-so-somali_yacob.sqlite` | Abdullah Hasan Yaqoub (so) | QuranEnc `somali_yacob` v1.0.27-xml.1 | 1.8 MB | download |
| `tr-sq-albanian_nahi.sqlite` | Hassan Nahi (sq) | QuranEnc `albanian_nahi` v1.1.0-xml.1 | 1.7 MB | download |
| `tr-sw-swahili_barawani.sqlite` | Ali Mohsin Al-Barwani (sw) | QuranEnc `swahili_barawani` v1.0.1-xml.1 | 3.3 MB | download |
| `tr-ta-tamil_omar.sqlite` | Omar Sharif (ta) | QuranEnc `tamil_omar` v1.0.4-xml.1 | 4.8 MB | download |
| `tr-th-thai_rwwad.sqlite` | Rowwad Translation Center (th) | QuranEnc `thai_rwwad` v1.0.1-xml.1 | 6.0 MB | download |
| `tr-tr-turkish_rwwad.sqlite` | Rowwad Translation Center (tr) | QuranEnc `turkish_rwwad` v1.0.4-xml.1 | 1.6 MB | download |
| `tr-ur-urdu_junagarhi.sqlite` | Muhammad Junagarhi (ur) | QuranEnc `urdu_junagarhi` v1.1.3-xml.1 | 7.6 MB | download |
| `tr-uz-uzbek_rwwad.sqlite` | Rowwad Translation Center (uz) | QuranEnc `uzbek_rwwad` v1.0.4-xml.1 | 2.2 MB | download |
| `tr-zh-chinese_makin.sqlite` | Muhammad Makeen (zh) | QuranEnc `chinese_makin` v1.0.2-xml.1 | 2.4 MB | download |
<!-- generated:packs:end -->
