import { Accent, MeaningType, _AccentEnum, _MeaningTypeEnum } from './types';

export const meaningTypes: MeaningType[] = Object.keys(_MeaningTypeEnum) as any;

export const accents: Accent[] = Object.keys(_AccentEnum) as any;
