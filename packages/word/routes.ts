import { WithoutId } from '@/common/types';
import { isDuplicateError } from '@/errors/utils';
import { ServiceRoute } from '@/routing/types';
import Joi from 'joi';
import { WordServices } from './services';
import { Word } from './types';
import Boom from '@hapi/boom';
import { nonCaseToKebabCase } from '@/common/utils';
import { ErrorMessage } from '@/errors/constants';

export const WordRoutes: ServiceRoute = {
  createWord: {
    method: 'POST',
    path: '/words/create',
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
    options: {
      validate: {
        payload: Joi.object<WithoutId<Word>>({
          text: Joi.string().required(),
          pronunciations: Joi.array().items(
            Joi.object({
              text: Joi.string().required().trim(),
              type: Joi.string().required(),
              accent: Joi.string().required().trim(),
            })
          ),
        }),
      },
    },
  },
};
