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
      const registerResponse = await AuthServices.register(request.payload as CreateUserPayload);

      return h.response(registerResponse);
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
      const loginResponse = await AuthServices.login(request.payload as LoginPayload);

      return h.response(loginResponse);
    },
  },
};
