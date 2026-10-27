# Hataya · הַטָּיָה

A small installable web app (PWA) for Hebrew learners. Type any Hebrew word and see:

- **Nouns**: masculine or feminine, singular and plural, plus notes on irregular cases (עִיר is feminine, לַיְלָה is masculine, מִלָּה takes ־ִים…)
- **Verbs**: root, binyan, and every form: past, present, future, imperative, infinitive
- **Adjectives**: masculine and feminine, singular and plural

You can type *any* form (הָלַכְתִּי, גְּדוֹלוֹת, וְהַסְּפָרִים) with or without nikkud, or an English word. A toggle shows forms with vowels (nikkud) or in standard plain spelling.

## How it works

**Offline first.** A built-in dictionary of about 230 nouns, 90 adjectives and 220 verbs (counting each binyan separately) works with no connection. Verbs aren't stored form by form. A rule-based engine (`public/lib/conjugate.js`) generates them from the root and binyan. It handles:

- regular verbs in all seven binyanim
- guttural roots (פ"ג, ע"ג, ל"ג)
- ל"ה, ל"א, ע"ו/ע"י, פ"נ, פ"י and פ"א verbs
- four-letter roots
- hitpa'el letter-swapping (הִסְתַּדֵּר, הִצְטַלֵּם)

Plain spellings follow the Academy of the Hebrew Language's ktiv male rules (`public/lib/hebrew.js`).

**AI fallback.** For words that aren't in the dictionary, the app calls `/api/lookup`. This Cloudflare Pages Function asks Claude for a structured analysis in the same format. Answers are cached at the edge and saved on the device, so a word you've looked up once also works offline. AI answers are marked **✦ AI**.

## Project layout

```
public/              static app (no build step)
  index.html, app.js, styles.css, sw.js, manifest.webmanifest, icons/
  lib/hebrew.js      nikkud utilities, plain-spelling conversion, search keys
  lib/conjugate.js   verb conjugation engine
  lib/lexicon.js     built-in nouns, adjectives, verbs
  lib/dictionary.js  search index over every form
functions/api/lookup.js   AI fallback (Cloudflare Pages Function)
tests/               node:test unit tests
```

## Develop

```sh
npm install
npm test                      # unit tests
npm start                     # static app only (no AI), at http://localhost:3000
cp .dev.vars.example .dev.vars   # add your Anthropic API key
npm run dev                   # app + AI function via wrangler, at http://localhost:8788
```

## Deploy (Cloudflare Pages)

1. In the Cloudflare dashboard, go to **Workers & Pages → Create → Pages → Connect to Git** and pick this repo.
2. Leave the build command empty and set the **build output directory** to `public`.
3. Under **Settings → Variables and Secrets**, add `ANTHROPIC_API_KEY` as a secret.
4. Deploy. Every push to `main` redeploys.

Or from the command line: `npx wrangler pages deploy public --project-name hataya`

Without an API key the app still works fully offline. Unknown words then show a friendly "not configured" message.

### Cost notes

AI lookups use `claude-opus-5-5` and run only when a word isn't in the offline dictionary and the user presses Enter (or taps **Ask AI**). Results are cached per word for 30 days at the edge, and on each device indefinitely. The endpoint has no rate limiting yet. If you share the app widely, consider adding Cloudflare rate-limiting rules for `/api/lookup`.

## Adding words

Add a line to `public/lib/lexicon.js`:

- **Noun**: `singular|gender|plural|English`, with gender `m`, `f` or `mf`, and `-` for no plural.
- **Adjective**: `ms|fs|mp|fp|English`
- **Verb**: an object such as `{ r: 'כתב', b: 'paal', g: 'to write' }`. Flags cover verbs the rules can't infer: `fut` (future vowel), `py`/`pn`/`pa` (weak first letter), `c1Silent`, and `forms` (to override individual forms).

Run `npm test`. One test checks that every verb in the lexicon conjugates cleanly.
