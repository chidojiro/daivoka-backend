import { PORT } from '@/env/constants';
import Hapi from '@hapi/hapi';

export const server = Hapi.server({
  port: PORT,
});
