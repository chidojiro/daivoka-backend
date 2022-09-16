import mongoose from 'mongoose';
import { WordModel } from './models';
import { Word } from './types';

const create = (data: Omit<Word, '_id'>) => {
  return WordModel.create(data);
};

export const WordServices = { create };
