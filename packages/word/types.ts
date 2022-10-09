import { Id } from '@/common/types';
import { MeaningGroup } from '@/meaning/types';

export type Word = {
  _id: Id;
  text: string;
  slug: string;
  meaningGroupIds: string[];
};

export type EnhancedWord = Word & { meaningGroups: MeaningGroup[] };

export enum WordErrorMessage {
  NOT_FOUND = 'NOT_FOUND',
}
