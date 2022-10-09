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
    path: '/words/{slug}',
    handler: async (request, h) => {
      const word = await WordServices.getBySlug(request.params.slug);

      return h.response(word?.toObject());
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
    path: '/words/{slug}',
    options: {
      validate: {
        payload: wordValidator,
      },
      handler: async (request, h) => {
        const payload = request.payload as Omit<WithoutId<Word>, 'slug'>;

        const updatedWord = (
          await WordServices.create({ ...payload, slug: nonCaseToKebabCase(payload.text) })
        ).toObject();

        return h.response(updatedWord);
      },
    },
  },
};
