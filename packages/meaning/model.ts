import mongoose from 'mongoose';
import { accents, meaningTypes } from './constants';

const IpaSchema = new mongoose.Schema(
  {
    text: { type: 'string', required: true },
    accent: { type: 'string', enum: accents, required: true },
  },
  { _id: false }
);

const MeaningGroupSchema = new mongoose.Schema({
  wordId: { type: 'string', required: true },
  type: { type: 'string', enum: meaningTypes, required: true },
  ipas: { type: [IpaSchema], required: true },
});

export const MeaningGroupModel = mongoose.model('meaning-group', MeaningGroupSchema);

const MeaningSchema = new mongoose.Schema({
  text: { type: 'string', required: true },
  examples: { type: ['string'] },
  illustratingImage: { type: 'string' },
  groupId: { type: 'string', required: true },
  wordId: { type: 'string', required: true },
});

export const MeaningModel = mongoose.model('meaning', MeaningSchema);
