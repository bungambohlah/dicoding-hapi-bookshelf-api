import { BookController } from './bookController';
import * as Hapi from '@hapi/hapi';

// create instance of controller
const controller = new BookController();

// configure the routes
const bookRoutes = {
  name: 'books',
  register: async (server: Hapi.Server): Promise<void> => {
    server.route([
      {
        method: 'POST',
        path: '/books',
        handler: controller.create,
        options: {
          tags: ['api'],
        },
      },
      {
        method: 'GET',
        path: '/books',
        handler: controller.getAll,
        options: {
          tags: ['api'],
        },
      },
      {
        method: 'GET',
        path: '/books/{id}',
        handler: controller.getById,
        options: {
          tags: ['api'],
        },
      },
      {
        method: 'PUT',
        path: '/books/{id}',
        handler: controller.update,
        options: {
          tags: ['api'],
        },
      },
      {
        method: 'DELETE',
        path: '/books/{id}',
        handler: controller.delete,
        options: {
          tags: ['api'],
        },
      },
    ]);
  },
};

export default bookRoutes;
