# Learn Croatian

A free, open-source Croatian learning platform for English speakers, covering CEFR levels A1 through B1 (B2 in progress).

**Live site → [learn-croatian.vercel.app](https://learn-croatian.vercel.app)**

---

## What's inside

| Section | Content |
|---|---|
| Grammar topics | 42 structured topics across A1, A2, and B1 |
| Stories | 15 graded reading stories (5 per level) with vocabulary |
| Case guide | All 7 Croatian grammatical cases with exercises |
| Verb reference | 100 most common Croatian verbs with example sentences |
| Phrase collections | Essential everyday phrases grouped by situation |
| Tests | Level quizzes per topic + a cumulative A1–B1 review test |

---

## Tech stack

- **[Astro 5](https://astro.build)** — static site generator, zero JS by default
- **[Tailwind CSS v4](https://tailwindcss.com)** — utility-first styling
- **JSON content files** — all lessons, stories and tests are plain JSON; no database or CMS needed

---

## Getting started

```bash
# 1. Clone the repo
git clone https://github.com/gencdeveloper/learncroatian.git
cd learncroatian

# 2. Install dependencies
npm install

# 3. Start the dev server
npm run dev
# → http://localhost:4321

# 4. Build for production
npm run build
```

---

## Project structure

```
learncroatian/
├── content/
│   ├── a1/          # 14 A1 grammar topic JSON files
│   ├── a2/          # 14 A2 grammar topic JSON files
│   ├── b1/          # 14 B1 grammar topic JSON files
│   ├── stories/     # 15 graded reading stories
│   ├── reference/   # cases.json, 100-most-common-verbs.json
│   ├── phrases/     # phrase collection JSON files
│   └── tests/       # test JSON files
├── src/
│   ├── components/  # Astro components (TopicPage, StoryPage, CaseGuide, etc.)
│   ├── layouts/     # Base HTML layout
│   ├── lib/
│   │   └── content.ts   # All TypeScript types and content loader functions
│   ├── pages/       # Astro file-based routes
│   └── styles/
└── astro.config.mjs
```

---

## Adding content

All content lives in JSON files under `content/`. No build step is needed to add a new lesson — just drop a JSON file in the right folder and it is automatically picked up.

### Add a grammar topic

Create `content/a1/my-topic.json` (or `a2/`, `b1/`, `b2/`):

```json
{
  "id": "my-topic",
  "level": "a1",
  "order": 15,
  "title": { "hr": "Moja tema", "en": "My Topic" },
  "grammar": {
    "intro": "Short introduction sentence.",
    "rules": [
      {
        "title": "Rule name",
        "explanation": "Explanation using **bold** for Croatian words.\n\n- bullet one\n- bullet two"
      }
    ]
  },
  "reading": {
    "title": { "hr": "Naslov", "en": "Title" },
    "paragraphs": [
      { "hr": "Hrvatski tekst.", "en": "English translation." }
    ]
  },
  "readingQuestions": [],
  "test": [],
  "chunks": []
}
```

### Add a story

Create `content/stories/my-story.json`:

```json
{
  "id": "my-story",
  "level": "b1",
  "order": 6,
  "title": { "hr": "Moja priča", "en": "My Story" },
  "topicsUsed": ["past-tense", "conditional"],
  "paragraphs": [
    { "hr": "Hrvatski tekst.", "en": "English text." }
  ],
  "vocabulary": {
    "verbs": [{ "hr": "govoriti", "en": "to speak" }],
    "nouns": [],
    "adjectives": []
  }
}
```

Full type definitions are in [`src/lib/content.ts`](src/lib/content.ts).

---

## Grammar formatting

In `grammar.intro` and `grammar.rules[].explanation`, a small markdown subset is supported:

| Syntax | Renders as |
|---|---|
| `**word**` | **bold** |
| `\n\n` | paragraph break |
| `- item` at line start | bullet list item |

---

## Contributing

Contributions are welcome — whether that's fixing a typo in a translation, adding a new topic, or improving a component.

1. Fork the repo
2. Create a branch: `git checkout -b my-fix`
3. Make your changes
4. Open a pull request

If you are adding or correcting Croatian content, please make sure all Croatian text is proofread by a native or near-native speaker.

---

## Licence

MIT — free to use, modify and distribute. Attribution appreciated but not required.

---

Built by [Yunus Emre Özüdoğru](https://www.linkedin.com/in/emre-ozudogru-185956228/)
