import * as Hapi from '@hapi/hapi';
import { Book, BookWhereInput, CreateBook, UpdateBook } from './book';
import { nanoid } from 'nanoid';
import { isEmpty } from '../utils/util';
import { db, Datastore } from '../nedb';

export class BookService {
  private db: Datastore<Book>;

  constructor() {
    if (this.db === null || !this.db) this.db = db;
  }

  public async create(theDto: CreateBook): Promise<Book> {
    try {
      return await new Promise((resolve, reject) => {
        this.db.insert(
          {
            ...theDto,
            // generate id with nanoid
            id: nanoid(),
            // finished is pageCount equal with readPage
            finished: theDto.pageCount === theDto.readPage,
            insertedAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
          },
          (err, newBook) => {
            if (err) reject(err);

            resolve(newBook);
          },
        );
      });
    } catch (error) {
      console.log(error);
    }
  }

  public async getById(id: string): Promise<Book> {
    try {
      return await new Promise((resolve, reject) => {
        this.db.findOne({ id }, (err, book) => {
          if (err) reject(err);

          resolve(book);
        });
      });
    } catch (error) {
      console.log(error);
    }
  }

  public async getAll(query?: Hapi.RequestQuery): Promise<Book[]> {
    try {
      const where: BookWhereInput = {};
      if (query) {
        if (typeof query.name === 'string' && !isEmpty(query.name))
          where.name = new RegExp(query.name, 'i');
        if (typeof query.reading === 'string' && !isEmpty(query.reading))
          where.reading = Boolean(parseInt(query.reading, 10));
        if (typeof query.finished === 'string' && !isEmpty(query.finished))
          where.finished = Boolean(parseInt(query.finished, 10));
      }
      return new Promise((resolve, reject) => {
        this.db.find(where).exec((err, books) => {
          if (err) reject(err);
          resolve(books);
        });
      });
    } catch (error) {
      console.log(error);
    }
  }

  public async update(theDto: UpdateBook, id: string): Promise<Book> {
    try {
      return await new Promise((resolve, reject) => {
        this.db.update({ id }, { $set: { ...theDto } }, {}, (err) => {
          if (err) reject(err);

          this.db.findOne({ id }, (err, book) => {
            if (err) reject(err);

            resolve(book);
          });
        });
      });
    } catch (error) {
      console.log(error);
    }
  }

  public async delete(id: string): Promise<Book> {
    try {
      return await new Promise((resolve, reject) => {
        this.db.remove({ id }, {}, (err) => {
          if (err) reject(err);

          this.db.findOne({ id }, (err, book) => {
            if (err) reject(err);

            resolve(book);
          });
        });
      });
    } catch (error) {
      console.log(error);
    }
  }
}
