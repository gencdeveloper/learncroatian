import { readdirSync, readFileSync } from "node:fs";
import { join } from "node:path";

export type Bilingual = { hr: string; en: string };

export type QuestionMC = {
  id: string;
  prompt: string;
  promptHr?: string;
  options: string[];
  correctIndex: number;
  explanation?: string;
};

export type ChunkGroup = {
  context: string;
  items: {
    hr: string;
    en: string;
    note?: string;
  }[];
};

export type Topic = {
  id: string;
  level: "a1" | "a2" | "b1" | "b2";
  order: number;
  title: Bilingual;
  grammar: {
    title: Bilingual;
    intro: string;
    rules: {
      label: string;
      explanation: string;
      examples: Bilingual[];
    }[];
    table?: {
      headers: string[];
      rows: string[][];
    };
  };
  reading: {
    title: Bilingual;
    paragraphs: Bilingual[];
  };
  readingQuestions: QuestionMC[];
  test: QuestionMC[];
  chunks: ChunkGroup[];
};

const LEVELS: Topic["level"][] = ["a1", "a2", "b1", "b2"];
const CONTENT_DIR = join(process.cwd(), "content");

export const LEVEL_STYLES: Record<Topic["level"], { badge: string; border: string; heading: string }> = {
  a1: { badge: "bg-blue-600", border: "border-blue-500", heading: "text-blue-700" },
  a2: { badge: "bg-emerald-600", border: "border-emerald-500", heading: "text-emerald-700" },
  b1: { badge: "bg-amber-600", border: "border-amber-500", heading: "text-amber-700" },
  b2: { badge: "bg-rose-600", border: "border-rose-500", heading: "text-rose-700" },
};

export function getAllTopics(): Topic[] {
  const topics: Topic[] = [];

  for (const level of LEVELS) {
    const levelDir = join(CONTENT_DIR, level);
    let files: string[];
    try {
      files = readdirSync(levelDir).filter((f) => f.endsWith(".json"));
    } catch {
      continue;
    }

    for (const file of files) {
      const raw = readFileSync(join(levelDir, file), "utf-8");
      topics.push(JSON.parse(raw) as Topic);
    }
  }

  return topics.sort((a, b) => {
    if (a.level !== b.level) return LEVELS.indexOf(a.level) - LEVELS.indexOf(b.level);
    return a.order - b.order;
  });
}

export function getTopic(level: string, id: string): Topic | undefined {
  return getAllTopics().find((t) => t.level === level && t.id === id);
}

export type VocabularyItem = { hr: string; en: string; note?: string };

export type StoryVocabulary = {
  verbs: VocabularyItem[];
  nouns: VocabularyItem[];
  adjectives: VocabularyItem[];
};

export type Story = {
  id: string;
  level: "a1" | "a2" | "b1" | "b2";
  order: number;
  title: Bilingual;
  topicsUsed: string[];
  paragraphs: Bilingual[];
  vocabulary?: StoryVocabulary;
};

export type VerbEntry = {
  hr: string;
  en: string;
  prezent: Bilingual;
  perfekt: Bilingual;
  futur: Bilingual;
};

export type VerbReference = {
  id: string;
  title: Bilingual;
  intro: string;
  verbs: VerbEntry[];
};

export type CaseEntry = {
  id: string;
  name: Bilingual;
  question: string;
  usage: string;
  endings: {
    headers: string[];
    rows: string[][];
  };
  examples: Bilingual[];
  exercises?: QuestionMC[];
};

export type CaseStudyGuide = {
  id: string;
  title: Bilingual;
  intro: string;
  cases: CaseEntry[];
};

export type CumulativeTestQuestion = QuestionMC & { topicLabel: string };

export type CumulativeTest = {
  id: string;
  title: Bilingual;
  intro: string;
  questions: CumulativeTestQuestion[];
};

export type ChunkCollection = {
  id: string;
  level: "a1" | "a2" | "b1" | "b2";
  title: Bilingual;
  intro: string;
  groups: ChunkGroup[];
};

const STORIES_DIR = join(CONTENT_DIR, "stories");
const REFERENCE_DIR = join(CONTENT_DIR, "reference");
const TESTS_DIR = join(CONTENT_DIR, "tests");
const PHRASES_DIR = join(CONTENT_DIR, "phrases");

export function getAllStories(): Story[] {
  let files: string[];
  try {
    files = readdirSync(STORIES_DIR).filter((f) => f.endsWith(".json"));
  } catch {
    return [];
  }
  return files
    .map((file) => JSON.parse(readFileSync(join(STORIES_DIR, file), "utf-8")) as Story)
    .sort((a, b) => {
      const la = LEVELS.indexOf(a.level);
      const lb = LEVELS.indexOf(b.level);
      if (la !== lb) return la - lb;
      return a.order - b.order;
    });
}

export function getStory(id: string): Story | undefined {
  return getAllStories().find((s) => s.id === id);
}

function readReferenceFile<T>(filename: string): T | undefined {
  try {
    return JSON.parse(readFileSync(join(REFERENCE_DIR, filename), "utf-8")) as T;
  } catch {
    return undefined;
  }
}

export function getVerbReference(): VerbReference | undefined {
  return readReferenceFile<VerbReference>("100-most-common-verbs.json");
}

export function getCaseGuide(): CaseStudyGuide | undefined {
  return readReferenceFile<CaseStudyGuide>("cases.json");
}

function readJsonDir<T extends { id: string }>(dir: string): T[] {
  let files: string[];
  try {
    files = readdirSync(dir).filter((f) => f.endsWith(".json"));
  } catch {
    return [];
  }
  return files.map((file) => JSON.parse(readFileSync(join(dir, file), "utf-8")) as T);
}

export function getAllTests(): CumulativeTest[] {
  return readJsonDir<CumulativeTest>(TESTS_DIR);
}

export function getTest(id: string): CumulativeTest | undefined {
  return getAllTests().find((t) => t.id === id);
}

export function getAllChunkCollections(): ChunkCollection[] {
  return readJsonDir<ChunkCollection>(PHRASES_DIR);
}

export function getChunkCollection(id: string): ChunkCollection | undefined {
  return getAllChunkCollections().find((c) => c.id === id);
}
