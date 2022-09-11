import { ServerRoute } from '@hapi/hapi';

export type Route = ServerRoute | ServerRoute[];

export type ServiceRoute = Record<string, Route>;
