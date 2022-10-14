import { CreateMeaningPayload, Meaning } from './types';
import { MeaningGroup } from '@/meaning/types';
import { ServiceRoute } from '@/routing/types';
import Joi from 'joi';
import { MeaningServices } from './service';

const meaningGroupValidator = Joi.object({
  type: Joi.string(),
  ipas: Joi.array().items(Joi.object({ text: Joi.string(), accent: Joi.string() })),
  wordId: Joi.string().optional(),
}).options({ stripUnknown: true });

const meaningValidator = Joi.object({
  text: Joi.string(),
  examples: Joi.array().items(Joi.string()),
  illustratingImage: Joi.string().optional(),
  groupId: Joi.string(),
  wordId: Joi.string(),
}).options({ stripUnknown: true });

export const MeaningRoutes: ServiceRoute = {
  createMeaningGroup: {
    method: 'POST',
    path: '/words/{wordId}/meaning-group',
    options: {
      validate: {
        params: Joi.object({ wordId: Joi.string() }),
        payload: meaningGroupValidator,
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
  updateMeaningGroup: {
    method: 'PUT',
    path: '/words/{wordId}/meaning-group/{meaningGroupId}',
    options: {
      validate: {
        params: Joi.object({ wordId: Joi.string(), meaningGroupId: Joi.string() }),
        payload: meaningGroupValidator,
      },
    },
    handler: async (request, h) => {
      const meaningGroupId = request.params.meaningGroupId;

      const word = await MeaningServices.updateGroup(meaningGroupId, request.payload as MeaningGroup);

      return h.response(word);
    },
  },
  deleteMeaningGroup: {
    method: 'DELETE',
    path: '/words/{wordId}/meaning-group/{meaningGroupId}',
    options: {
      validate: {
        params: Joi.object({ wordId: Joi.string(), meaningGroupId: Joi.string() }),
      },
    },
    handler: async (request, h) => {
      const meaningGroupId = request.params.meaningGroupId;

      const word = await MeaningServices.deleteGroup(meaningGroupId);

      return h.response(word);
    },
  },
  create: {
    method: 'POST',
    path: '/meaning',
    options: { validate: { payload: meaningValidator } },
    handler: async (request, h) => {
      const word = await MeaningServices.create(request.payload as CreateMeaningPayload);

      return h.response(word);
    },
  },
  update: {
    method: 'PUT',
    path: '/meaning/{meaningId}',
    options: { validate: { params: Joi.object({ meaningId: Joi.string() }), payload: meaningValidator } },
    handler: async (request, h) => {
      const word = await MeaningServices.update(request.params.meaningId, request.payload as Meaning);

      return h.response(word);
    },
  },
  delete: {
    method: 'DELETE',
    path: '/meaning/{meaningId}',
    options: { validate: { params: Joi.object({ meaningId: Joi.string() }) } },
    handler: async (request, h) => {
      const word = await MeaningServices.delete(request.params.meaningId);

      return h.response(word);
    },
  },
};
