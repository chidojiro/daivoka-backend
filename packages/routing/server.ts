import Hapi from '@hapi/hapi';

export const server = Hapi.server({
  port: process.env.PORT ? parseInt(process.env.PORT) : 8000,
});
