import { Id, WithoutId } from '@/common/types';

export enum MeaningErrorMessage {
  NOT_FOUND = 'MEANING_NOT_FOUND',
  GROUP_NOT_FOUND = 'MEANING_GROUP_NOT_FOUND',
}

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

export type Meaning = {
  _id: Id;
  text: string;
  examples: string[];
  groupId: string;
  wordId: string;
  illustratingImage?: string;
};

export type MeaningGroup = {
  _id: Id;
  type: MeaningType;
  ipas: IPA[];
  wordId: string;
};

export type CreateMeaningGroupPayload = WithoutId<MeaningGroup>;

export type CreateMeaningPayload = WithoutId<Meaning>;
