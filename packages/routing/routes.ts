import { AuthRoutes } from '@/auth/routes';
import { UserRoutes } from '@/user/routes';

export const Routes = {
  ...AuthRoutes,
  ...UserRoutes,
};
