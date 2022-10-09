import { ServiceRoute } from '@/routing/types';
import Joi from 'joi';
import { MeaningServices } from './service';

const createMeaningGroupValidator = Joi.object({
  type: Joi.string(),
  ipas: Joi.array().items(Joi.object({ text: Joi.string(), accent: Joi.string() })),
});

export const MeaningRoutes: ServiceRoute = {
  createMeaningGroup: {
    method: 'POST',
    path: '/words/{wordId}/meaning-group',
    options: {
      validate: {
        params: Joi.object({ wordId: Joi.string() }),
        payload: createMeaningGroupValidator,
      },
    },
    handler: async (request, h) => {
      const wordId = request.params.wordId;

      const word = await MeaningServices.createGroup({
        wordId,
        ...(request.payload as any),
      });

      return h.response(word);
    },
  },
};