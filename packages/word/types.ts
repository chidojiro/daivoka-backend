export type Accent = 'US' | 'UK';

export type IPA = {
  text: string;
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
  ipas: IPA[];
  meanings: Meaning[];
};
