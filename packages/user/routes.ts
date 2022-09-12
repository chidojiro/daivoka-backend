import { ServiceRoute } from '@/routing/types';
import { User } from '@/user/types';
import Boom from '@hapi/boom';
import { UserServices } from './services';

export const UserRoutes: ServiceRoute = {
  me: {
    method: 'GET',
    path: '/me',
    handler: async (request, h) => {
      const user = await UserServices.getByEmail((request.auth.credentials.user as User)?.email);

      if (!user) {
        throw Boom.notFound('User not found');
      }

      const { password, ...userResponse } = user.toObject();

      return h.response(userResponse);
    },
  },
};
