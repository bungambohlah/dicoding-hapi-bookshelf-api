import * as Hapi from '@hapi/hapi';
import { PrismaClient, Book, Prisma } from '@prisma/client';
import { CreateBook, UpdateBook } from './book';
import { nanoid } from 'nanoid';
import { isEmpty } from '../utils/util';

export class BookService {
  private prisma: PrismaClient;

  constructor() {
    if (this.prisma === null || !this.prisma) this.prisma = new PrismaClient();
  }

  public async create(theDto: CreateBook): Promise<Book> {
    try {
      return await this.prisma.book.create({
        data: {
          ...theDto,
          // generate id with nanoid
          id: nanoid(),
          // finished is pageCount equal with readPage
          finished: theDto.pageCount === theDto.readPage,
        },
      });
    } catch (error) {
      console.log(error);
    } finally {
      await this.prisma.$disconnect();
    }
  }

  public async getById(id: string): Promise<Book> {
    try {
      return await this.prisma.book.findFirst({ where: { id } });
    } catch (error) {
      console.log(error);
    } finally {
      await this.prisma.$disconnect();
    }
  }

  public async getAll(query?: Hapi.RequestQuery): Promise<Book[]> {
    try {
      const where: Prisma.BookWhereInput = {};
      if (query) {
        if (typeof query.name === 'string' && !isEmpty(query.name))
          where.name = { contains: query.name };
        if (typeof query.reading === 'string' && !isEmpty(query.reading))
          where.reading = Boolean(parseInt(query.reading, 10));
        if (typeof query.finished === 'string' && !isEmpty(query.finished))
          where.finished = Boolean(parseInt(query.finished, 10));
      }
      return await this.prisma.book.findMany({ where });
    } catch (error) {
      console.log(error);
    } finally {
      await this.prisma.$disconnect();
    }
  }

  public async update(theDto: UpdateBook, id: string): Promise<Book> {
    try {
      return await this.prisma.book.update({
        where: { id },
        data: { ...theDto },
      });
    } catch (error) {
      console.log(error);
    } finally {
      await this.prisma.$disconnect();
    }
  }

  public async delete(id: string): Promise<Book> {
    try {
      return await this.prisma.book.delete({ where: { id } });
    } catch (error) {
      console.log(error);
    } finally {
      await this.prisma.$disconnect();
    }
  }
}
