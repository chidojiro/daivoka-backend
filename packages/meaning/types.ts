import { Id } from '@/common/types';

export enum _AccentEnum {
  US,
  UK,
}

export type Accent = keyof typeof _AccentEnum;

export type IPA = {
  text: string;
  accent: Accent;
};

export enum _MeaningTypeEnum {
  NOUN,
  VERB,
  ADJECTIVE,
  ADVERB,
  PREPOSITION,
  PHRASAL_VERB,
}

export type MeaningType = keyof typeof _MeaningTypeEnum;

export type CreateMeaningGroupPayload = {
  wordId: string;
  type: MeaningType;
  ipas: IPA[];
};

export type Meaning = {
  _id: Id;
  text: string;
  examples: string[];
  illustration?: string;
};

export type MeaningGroup = {
  _id: Id;
  type: MeaningType;
  ipas: IPA[];
};
