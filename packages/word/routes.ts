import { WithoutId } from '@/common/types';
import { isDuplicateError } from '@/errors/utils';
import { ServiceRoute } from '@/routing/types';
import Joi from 'joi';
import { WordServices } from './services';
import { Word } from './types';
import Boom from '@hapi/boom';
import { nonCaseToKebabCase } from '@/common/utils';
import { ErrorMessage } from '@/errors/constants';

const wordValidator = Joi.object<WithoutId<Word>>({
  text: Joi.string().required(),
});

export const WordRoutes: ServiceRoute = {
  getBySlug: {
    method: 'GET',
    path: '/words/slugs/{slug}',
    handler: async (request, h) => {
      const word = await WordServices.getBySlug(request.params.slug);

      return h.response(word);
    },
  },
  getById: {
    method: 'GET',
    path: '/words/{wordId}',
    handler: async (request, h) => {
      const word = await WordServices.get(request.params.wordId);

      return h.response(word);
    },
  },
  createWord: {
    method: 'POST',
    path: '/words/create',
    options: {
      validate: {
        payload: wordValidator,
      },
    },
    handler: async (request, h) => {
      const payload = request.payload as Omit<WithoutId<Word>, 'slug'>;

      try {
        const newWord = (await WordServices.create({ ...payload, slug: nonCaseToKebabCase(payload.text) })).toObject();

        return h.response(newWord);
      } catch (e) {
        if (isDuplicateError(e)) throw Boom.badRequest(ErrorMessage.ALREADY_EXIST);

        throw Boom.internal();
      }
    },
  },
  updateWord: {
    method: 'PUT',
    path: '/words/{wordId}',
    options: {
      validate: {
        payload: wordValidator,
      },
      handler: async (request, h) => {
        const wordId = request.params.wordId as string;
        const payload = request.payload as Word;

        const updatedWord = await WordServices.update(wordId, payload);

        return h.response(updatedWord);
      },
    },
  },
};
