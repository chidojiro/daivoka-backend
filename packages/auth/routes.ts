import { ServiceRoute } from '@/routing/types';
import { CreateUserPayload } from '@/user/types';
import Joi from 'joi';
import { AuthServices } from './services';
import { LoginPayload } from './types';

export const AuthRoutes: ServiceRoute = {
  register: {
    method: 'POST',
    path: '/register',
    handler: async (request, h) => {
      const newUser = await AuthServices.register(request.payload as CreateUserPayload);

      return h.response(newUser);
    },
    options: {
      validate: { payload: Joi.object({ email: Joi.string().email().required(), password: Joi.string().required() }) },
      auth: false,
    },
  },
  login: {
    method: 'POST',
    path: '/login',
    options: { auth: false },
    handler: async (request, h) => {
      const accessToken = await AuthServices.login(request.payload as LoginPayload);

      return h.response().code(204).header('set-cookie', `accessToken=${accessToken};HttpOnly;SameSite=Strict`);
    },
  },
};
