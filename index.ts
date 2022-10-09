import { JWT_SECRET, MONGO_URI } from '@/env/constants';
import { Routes } from '@/routing/routes';
import { server } from '@/routing/server';
import { Request, ResponseToolkit } from '@hapi/hapi';
import mongoose from 'mongoose';

server.realm.modifiers.route.prefix = '/api';

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
