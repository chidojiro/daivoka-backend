import { WithoutId } from '@/common/types';
import { isDuplicateError } from '@/errors/utils';
import { ServiceRoute } from '@/routing/types';
import Joi from 'joi';
import { WordServices } from './services';
import { Word } from './types';
import Boom from '@hapi/boom';

export const WordRoutes: ServiceRoute = {
  createWord: {
    method: 'POST',
    path: '/words/create',
    handler: async (request, h) => {
      try {
        const newWord = (await WordServices.create(request.payload as WithoutId<Word>)).toObject();

        return h.response(newWord);
      } catch (e) {
        if (isDuplicateError(e)) throw Boom.badRequest('Word already exits');

        throw Boom.internal();
      }
    },
    options: {
      validate: {
        payload: Joi.object<WithoutId<Word>>({
          text: Joi.string().required(),
          pronunciations: Joi.array().items(
            Joi.object({
              text: Joi.string().required(),
              type: Joi.string().required(),
              accent: Joi.string().required(),
            })
          ),
        }),
      },
    },
  },
};
