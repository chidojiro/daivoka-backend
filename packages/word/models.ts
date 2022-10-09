import mongoose from 'mongoose';

const wordSchema = new mongoose.Schema({
  text: { type: String, required: true, unique: true },
  slug: { type: String, required: true, unique: true },
  meaningGroupIds: { type: [String], required: true },
});

export const WordModel = mongoose.model('word', wordSchema);
