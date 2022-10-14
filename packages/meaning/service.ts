import { Meaning, MeaningGroup } from '@/meaning/types';
import { Id } from '@/common/types';
import { WordModel } from '@/word/models';
import { WordServices } from '@/word/services';
import { WordErrorMessage } from '@/word/types';
import Boom from '@hapi/boom';
import { MeaningGroupModel, MeaningModel } from './model';
import { CreateMeaningGroupPayload, MeaningErrorMessage, CreateMeaningPayload } from './types';

const getGroup = async (id: string) => {
  const group = await MeaningGroupModel.findById(id);

  if (!group) {
    throw Boom.notFound(MeaningErrorMessage.GROUP_NOT_FOUND);
  }

  return group;
};

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

const updateGroup = async (id: string, data: MeaningGroup) => {
  const { _id: _, ...updatePayload } = data;

  await MeaningGroupModel.updateOne({ _id: id }, updatePayload);

  const word = await WordServices.get(updatePayload.wordId);

  return word;
};

const deleteGroup = async (id: string) => {
  const group = await MeaningGroupModel.findOneAndDelete({ _id: id }).lean();

  if (!group) {
    throw Boom.notFound(MeaningErrorMessage.GROUP_NOT_FOUND);
  }

  const word = await WordModel.findOneAndUpdate(
    { _id: group.wordId },
    { $pull: { meaningGroupIds: group._id } },
    { new: true }
  ).lean();

  if (!word) {
    throw Boom.notFound(WordErrorMessage.NOT_FOUND);
  }

  return WordServices.enhance(word);
};

const getGroupsByIds = async (ids: Id[]) => {
  return MeaningGroupModel.find().where('_id').in(ids).lean();
};

const get = async (id: string) => {
  const meaning = await MeaningModel.findById(id).lean();

  if (!meaning) {
    throw Boom.notFound(MeaningErrorMessage.NOT_FOUND);
  }

  return meaning;
};

const create = async (data: CreateMeaningPayload) => {
  const meaning = await MeaningModel.create(data);

  const meaningGroup = await MeaningGroupModel.findOneAndUpdate(
    { _id: meaning.get('groupId') },
    { $push: { meaningIds: meaning.get('_id') } }
  ).lean();

  if (!meaningGroup) {
    throw Boom.notFound(MeaningErrorMessage.GROUP_NOT_FOUND);
  }

  const word = await WordServices.get(meaningGroup.wordId);

  if (!word) {
    throw Boom.notFound(WordErrorMessage.NOT_FOUND);
  }

  return word;
};

const update = async (id: string, data: Meaning) => {
  const { _id: _, ...updatePayload } = data;

  const meaning = await MeaningModel.findOneAndUpdate({ _id: id }, updatePayload).lean();

  if (!meaning) {
    throw Boom.notFound(MeaningErrorMessage.NOT_FOUND);
  }

  const word = await WordServices.get(meaning.wordId);

  if (!word) {
    throw Boom.notFound(WordErrorMessage.NOT_FOUND);
  }

  return word;
};

const _delete = async (id: string) => {
  const meaning = await MeaningModel.findOneAndDelete({ _id: id }).lean();

  if (!meaning) {
    throw Boom.notFound(MeaningErrorMessage.NOT_FOUND);
  }

  const meaningGroup = await MeaningGroupModel.findOneAndUpdate(
    { _id: meaning.groupId },
    { $pull: { meaningIds: meaning._id } }
  ).lean();

  if (!meaningGroup) {
    throw Boom.notFound(MeaningErrorMessage.GROUP_NOT_FOUND);
  }

  const word = await WordServices.get(meaningGroup.wordId);

  if (!word) {
    throw Boom.notFound(WordErrorMessage.NOT_FOUND);
  }

  return word;
};

export const MeaningServices = {
  getGroup,
  getGroupsByIds,
  createGroup,
  updateGroup,
  deleteGroup,
  get,
  create,
  update,
  delete: _delete,
};
