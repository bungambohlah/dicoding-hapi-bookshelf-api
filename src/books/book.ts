export interface Book {
  id: string;
  name: string;
  year: number;
  author: string;
  summary: string;
  publisher: string;
  pageCount: number;
  readPage: number;
  finished?: boolean;
  reading: boolean;
  insertedAt?: string;
  updatedAt?: string;
}

export interface CreateBook {
  id: string;
  name: string;
  year: number;
  author: string;
  summary: string;
  publisher: string;
  pageCount: number;
  readPage: number;
  finished?: boolean;
  reading: boolean;
  insertedAt?: string;
  updatedAt?: string;
}

export interface UpdateBook {
  id: string;
  name: string;
  year: number;
  author: string;
  summary: string;
  publisher: string;
  pageCount: number;
  readPage: number;
  finished?: boolean;
  reading: boolean;
  insertedAt?: string;
  updatedAt?: string;
}

export interface BookWhereInput {
  name?: string | RegExp;
  reading?: boolean;
  finished?: boolean;
}
