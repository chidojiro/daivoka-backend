import { Routes } from '@/routing/routes';
// import { server } from '@/routing/server';
import { Request, ResponseToolkit } from '@hapi/hapi';
import Joi from 'joi';
import Hapi from '@hapi/hapi';
import mongoose from 'mongoose';

const JWT_SECRET = process.env.JWT_SECRET;
const MONGO_URI = process.env.MONGO_URI!;

const server = Hapi.server({
  port: 8080,
});

const init = async () => {
  await mongoose.connect(MONGO_URI, { dbName: 'main' });

  await server.register(require('@hapi/jwt'));
  server.auth.strategy('jwt', 'jwt', {
    keys: JWT_SECRET,
    verify: false,
    validate: (artifacts: any, request: Request, h: ResponseToolkit) => {
      return {
        isValid: true,
        credentials: { user: artifacts.decoded.payload },
      };
    },
  });
  server.auth.default('jwt');

  Object.values(Routes).forEach(route => server.route(route));

  await server.start();
  console.log('Server running on %s', server.info.uri);

  process.on('unhandledRejection', err => {
    console.error(err);
    process.exit();
  });

  process.on('uncaughtException', function (err) {
    console.error(err);
    process.exit();
  });
};

init();
