export type Accent = 'us' | 'uk';

export type Pronunciation = {
  text: string;
  type: string;
  accent: Accent;
};

export type Meaning = {
  _id: string;
  text: string;
  examples: string[];
  illustration?: string;
};

export type Word = {
  _id: string;
  text: string;
  slug: string;
  pronunciations: Pronunciation[];
  meanings: Meaning[];
};
