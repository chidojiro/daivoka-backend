import { WordModel } from './models';
import { Word } from './types';

const getBySlug = (slug: string) => {
  return WordModel.findOne({ slug });
};

const create = (data: Omit<Word, '_id'>) => {
  return WordModel.create(data);
};

const updateBySlug = (slug: string, data: Word) => {
  return WordModel.findOneAndUpdate({ slug }, data);
};

export const WordServices = { create, getBySlug, updateBySlug };
