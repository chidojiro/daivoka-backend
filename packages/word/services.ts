import { MeaningServices } from '@/meaning/service';
import Boom from '@hapi/boom';
import { WordModel } from './models';
import { EnhancedWord, Word, WordErrorMessage } from './types';

const enhance = async (word: Word) => {
  const meaningGroups = await MeaningServices.getGroupsByIds(word.meaningGroupIds);

  const enhancedWord: EnhancedWord = { ...word, meaningGroups };

  return enhancedWord;
};

const get = async (id: string) => {
  const word = await WordModel.findById(id).lean();

  if (!word) throw Boom.notFound(WordErrorMessage.NOT_FOUND);

  return enhance(word);
};

const create = (data: Omit<Word, '_id'>) => {
  return WordModel.create(data);
};

const getBySlug = async (slug: string) => {
  const word = await WordModel.findOne({ slug }).lean();

  if (!word) throw Boom.notFound(WordErrorMessage.NOT_FOUND);

  return enhance(word);
};

const update = async (id: string, data: Word) => {
  const { _id, ...updatePayload } = data;

  const updatedWord = await WordModel.findOneAndUpdate({ _id: id }, updatePayload).lean();

  if (!updatedWord) throw Boom.notFound(WordErrorMessage.NOT_FOUND);

  return updatedWord;
};

export const WordServices = { get, create, getBySlug, update, enhance };
