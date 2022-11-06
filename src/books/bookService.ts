import { PrismaClient, Book } from '@prisma/client';
import { CreateBook, UpdateBook } from './book';

export class BookService {
  private prisma: PrismaClient;

  constructor() {
    this.prisma = new PrismaClient();
  }

  public async create(theDto: CreateBook): Promise<Book> {
    try {
      return await this.prisma.book.create({
        data: {
          ...theDto,
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
      return await this.prisma.book.findUnique({
        where: {
          id,
        },
      });
    } catch (error) {
      console.log(error);
    } finally {
      await this.prisma.$disconnect();
    }
  }

  public async getAll(): Promise<Book[]> {
    try {
      return await this.prisma.book.findMany();
    } catch (error) {
      console.log(error);
    } finally {
      await this.prisma.$disconnect();
    }
  }

  public async update(theDto: UpdateBook, id: string): Promise<Book> {
    try {
      return await this.prisma.book.update({
        where: {
          id: id,
        },
        data: {
          ...theDto,
        },
      });
    } catch (error) {
      console.log(error);
    } finally {
      await this.prisma.$disconnect();
    }
  }

  public async delete(id: string): Promise<Book> {
    try {
      return await this.prisma.book.delete({
        where: {
          id,
        },
      });
    } catch (error) {
      console.log(error);
    } finally {
      await this.prisma.$disconnect();
    }
  }
}
