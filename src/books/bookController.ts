import * as Hapi from '@hapi/hapi';
import { CreateBook, UpdateBook } from './book';
import { BookService } from './bookService';
import Boom from '@hapi/boom';

export class BookController {
  public async create(
    request: Hapi.Request,
    h: Hapi.ResponseToolkit,
  ): Promise<Hapi.ResponseObject | Boom.Boom<unknown>> {
    try {
      const requestBody: CreateBook = request.payload as CreateBook;
      const result = await new BookService().create(requestBody);
      return h.response(result).code(201);
    } catch (error) {
      if (typeof error === 'string' || typeof error === 'object')
        request.log('error', error);

      return Boom.badImplementation(JSON.stringify(error));
    }
  }

  public async getAll(
    request: Hapi.Request,
    h: Hapi.ResponseToolkit,
  ): Promise<Hapi.ResponseObject | Boom.Boom<unknown>> {
    try {
      const result = await new BookService().getAll();
      return h.response(result).code(200);
    } catch (error) {
      if (typeof error === 'string' || typeof error === 'object')
        request.log('error', error);

      return Boom.badImplementation(JSON.stringify(error));
    }
  }

  public async getById(
    request: Hapi.Request,
    h: Hapi.ResponseToolkit,
  ): Promise<Hapi.ResponseObject | Boom.Boom<unknown>> {
    try {
      const id: number = +request.params.id;
      const result = await new BookService().getById(id);
      return h.response(result).code(200);
    } catch (error) {
      if (typeof error === 'string' || typeof error === 'object')
        request.log('error', error);

      return Boom.badImplementation(JSON.stringify(error));
    }
  }

  public async update(
    request: Hapi.Request,
    h: Hapi.ResponseToolkit,
  ): Promise<Hapi.ResponseObject | Boom.Boom<unknown>> {
    try {
      const id: number = +request.params.id;
      const requestBody: UpdateBook = request.payload as UpdateBook;
      const result = await new BookService().update(requestBody, id);
      return h.response(result).code(200);
    } catch (error) {
      if (typeof error === 'string' || typeof error === 'object')
        request.log('error', error);

      return Boom.badImplementation(JSON.stringify(error));
    }
  }

  public async delete(
    request: Hapi.Request,
    h: Hapi.ResponseToolkit,
  ): Promise<Hapi.ResponseObject | Boom.Boom<unknown>> {
    try {
      const id: number = +request.params.id;
      const result = await new BookService().delete(id);
      return h.response(result).code(200);
    } catch (error) {
      if (typeof error === 'string' || typeof error === 'object')
        request.log('error', error);

      return Boom.badImplementation(JSON.stringify(error));
    }
  }
}
