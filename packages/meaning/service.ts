import { Id } from '@/common/types';
import { WordModel } from '@/word/models';
import { WordServices } from '@/word/services';
import { WordErrorMessage } from '@/word/types';
import Boom from '@hapi/boom';
import { MeaningGroupModel } from './model';
import { CreateMeaningGroupPayload } from './types';

const createGroup = async (payload: CreateMeaningGroupPayload) => {
  const newMeaningGroup = await MeaningGroupModel.create(payload);

  const word = await WordModel.findOneAndUpdate(
    { _id: payload.wordId },
    { $push: { meaningGroupIds: newMeaningGroup.get('id') } }
  ).lean();

  if (!word) {
    throw Boom.notFound(WordErrorMessage.NOT_FOUND);
  }

  return WordServices.enhance(word);
};

const getGroupsByIds = async (ids: Id[]) => {
  return MeaningGroupModel.find().where('_id').in(ids).lean();
};

export const MeaningServices = {
  createGroup,
  getGroupsByIds,
};
