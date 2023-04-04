import * as Hapi from '@hapi/hapi';
import appInstance from '../app';
// import { Book } from './book';
// import { nanoid } from 'nanoid';

describe('tests for Book controller', () => {
  // set dependencies
  let server: Hapi.Server;
  // const newDate: string = new Date().toISOString();

  // Construct dummy test data
  // const testData: Book[] = [
  //   {
  //     id: nanoid(),
  //     author: 'Author',
  //     name: 'Name',
  //     pageCount: 100,
  //     publisher: 'Publisher',
  //     reading: false,
  //     readPage: 25,
  //     summary: 'Summary',
  //     year: 2010,
  //     finished: false,
  //     insertedAt: newDate,
  //     updatedAt: newDate,
  //   },
  // ];

  // Mock service class

  // jest.mock("./bookService", () => {
  //     return {
  //         create: (theDto) => {
  //             let keys = ["email", "name", "role", "phoneNumber", "permissions"];
  //             let isObject = typeof theDto === 'object';
  //             let isRightType = keys.every(value => theDto.hasOwnProperty(value));
  //             let isRightLength = Object.keys(theDto).length === keys.length;

  //             if (isObject && isRightType && isRightLength) {
  //                 return theDto;
  //             } else {
  //                 return { error: "Wrong implementation" }
  //             }
  //         },
  //         getById: (id) => {
  //             // controller should convert request param from string to number
  //             if (typeof id !== 'number') {
  //                 return { error: "Wrong implementation" }
  //             } else {
  //                 let theItem = testData.find(value => value.id === id);
  //                 return theItem;
  //             }
  //         },
  //         getAll: () => {
  //             return testData;
  //         },
  //         update: (theDto, id) => {

  //             if (typeof theDto === 'object') {
  //                 let theItem = testData.find(value => value.id === id);
  //                 return theItem;
  //             } else {
  //                 return { error: "Wrong implementation" }
  //             }

  //         },
  //         delete: (id) => {
  //             // controller should convert request param from string to number
  //             if (typeof id !== 'number') {
  //                 return { error: "Wrong implementation" }
  //             } else {
  //                 let theItem = testData.find(value => value.id === id);
  //                 return theItem;
  //             }
  //         }
  //     }
  // });

  // effect the mock
  // TODO - FIGURE OUT WHY JEST MOCKS DON'T WORK WITH HAPI'S INJECT TEST METHOD OR USE CHAI-HTTP AS ALTERNATIVE

  // mocked(BookService, true);

  // Set hooks

  beforeAll(async () => {
    await appInstance.init();
    if (appInstance.theApp) server = appInstance.theApp;
  });

  afterAll(async () => {
    await server.stop();
  });

  // Write tests
  test('#create() should create the entity when passed the right input', async () => {
    const input = {
      author: 'Author',
      name: 'Name',
      pageCount: 100,
      publisher: 'Publisher',
      reading: false,
      readPage: 25,
      summary: 'Summary',
      year: 2010,
      finished: false,
    };
    const response = await server.inject({
      method: 'POST',
      url: '/books',
      payload: { ...input },
    });

    expect(response.statusCode).toBe(201);
  });

  test('#getAll() should function as expected', async () => {
    const response = await server.inject({
      method: 'GET',
      url: '/books',
    });

    expect(response.statusCode).toBe(200);
  });
});
