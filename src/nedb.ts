import Datastore from 'nedb';
import { Book } from './books/book';

const db = new Datastore<Book>();
export { db, Datastore };
