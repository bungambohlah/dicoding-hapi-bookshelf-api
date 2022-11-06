import * as Hapi from '@hapi/hapi';
import { CreateBook, UpdateBook } from './book';
import { BookService } from './bookService';
import Boom from '@hapi/boom';
import { isEmpty } from '../utils/util';

export class BookController {
  public async create(
    request: Hapi.Request,
    h: Hapi.ResponseToolkit,
  ): Promise<Hapi.ResponseObject | Boom.Boom<unknown>> {
    try {
      const payload = request.payload as CreateBook;

      if (!payload) {
        return h
          .response({ status: 'fail', message: 'bookData is empty' })
          .code(400);
      } else if (payload && isEmpty(payload.name)) {
        return h
          .response({
            status: 'fail',
            message: 'Gagal menambahkan buku. Mohon isi nama buku',
          })
          .code(400);
      } else if (
        typeof payload.readPage === 'number' &&
        typeof payload.pageCount === 'number' &&
        payload.readPage > payload.pageCount
      ) {
        return h
          .response({
            status: 'fail',
            message:
              'Gagal menambahkan buku. readPage tidak boleh lebih besar dari pageCount',
          })
          .code(400);
      }

      const requestBody: CreateBook = payload;
      const result = await new BookService().create(requestBody);
      return h
        .response({
          status: 'success',
          data: { bookId: result.id },
          message: 'Buku berhasil ditambahkan',
        })
        .code(201);
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
      const result = await new BookService().getAll(request.query);
      return h
        .response({
          status: 'success',
          data: {
            books: result.map(({ id, name, publisher }) => ({
              id,
              name,
              publisher,
            })),
          },
        })
        .code(200);
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
      const params: Hapi.Util.Dictionary<string> = request.params;
      if (isEmpty(params.id)) {
        return h
          .response({ status: 'fail', message: 'BookId is empty' })
          .code(400);
      } else if (params.id) {
        const result = await new BookService().getById(params.id);

        if (!result) {
          return h
            .response({ status: 'fail', message: 'Buku tidak ditemukan' })
            .code(404);
        }

        return h
          .response({ status: 'success', data: { book: result } })
          .code(200);
      }
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
      const params: Hapi.Util.Dictionary<string> = request.params;
      const requestBody: UpdateBook = request.payload as UpdateBook;

      if (isEmpty(params.id)) {
        return h
          .response({ status: 'fail', message: 'BookId is empty' })
          .code(400);
      } else if (requestBody && isEmpty(requestBody.name)) {
        return h
          .response({
            status: 'fail',
            message: 'Gagal memperbarui buku. Mohon isi nama buku',
          })
          .code(400);
      } else if (
        typeof requestBody.readPage === 'number' &&
        typeof requestBody.pageCount === 'number' &&
        requestBody.readPage > requestBody.pageCount
      ) {
        return h
          .response({
            status: 'fail',
            message:
              'Gagal memperbarui buku. readPage tidak boleh lebih besar dari pageCount',
          })
          .code(400);
      } else if (params.id) {
        const result = await new BookService().getById(params.id);
        if (!result) {
          return h
            .response({
              status: 'fail',
              message: 'Gagal memperbarui buku. Id tidak ditemukan',
            })
            .code(404);
        }

        await new BookService().update(requestBody, params.id);
        return h
          .response({ status: 'success', message: 'Buku berhasil diperbarui' })
          .code(200);
      }
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
      const params: Hapi.Util.Dictionary<string> = request.params;
      if (isEmpty(params.id)) {
        return h
          .response({
            status: 'fail',
            message: 'Buku gagal dihapus. Id tidak ditemukan',
          })
          .code(404);
      } else if (params.id) {
        const result = await new BookService().getById(params.id);
        if (!result) {
          return h
            .response({
              status: 'fail',
              message: 'Buku gagal dihapus. Id tidak ditemukan',
            })
            .code(404);
        }

        await new BookService().delete(params.id);
        return h
          .response({ status: 'success', message: 'Buku berhasil dihapus' })
          .code(200);
      }
    } catch (error) {
      if (typeof error === 'string' || typeof error === 'object')
        request.log('error', error);

      return Boom.badImplementation(JSON.stringify(error));
    }
  }
}
