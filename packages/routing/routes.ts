import { AuthRoutes } from '@/auth/routes';
import { MeaningRoutes } from '@/meaning/routes';
import { UserRoutes } from '@/user/routes';
import { WordRoutes } from '@/word/routes';

export const Routes = {
  ...AuthRoutes,
  ...UserRoutes,
  ...WordRoutes,
  ...MeaningRoutes,
};
