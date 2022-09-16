import mongoose from 'mongoose';

const PronunciationSchema = new mongoose.Schema({
  text: { type: String, required: true },
  type: { type: String, required: true },
  accent: { type: String, required: true },
});

const WordSchema = new mongoose.Schema({
  text: { type: String, required: true, unique: true },
  pronunciations: { type: [PronunciationSchema], required: true },
});

export const WordModel = mongoose.model('word', WordSchema);
