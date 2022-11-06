import * as Hapi from '@hapi/hapi';

// configure the base route
const baseRoute = {
  name: 'attendance',
  register: async (server: Hapi.Server): Promise<void> => {
    server.route({
      method: 'GET',
      path: '/',
      handler: (request: Hapi.Request) => {
        return `Welcome ! please find the api documentation at ${request.info.host}/documentation`;
      },
    });
  },
};

export default baseRoute;
