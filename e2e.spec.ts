// Here are the end to end tests for the routes.
// But the unit tests are in the same folder with the file containing the functions they test
// We will use chai-http to test the api over http
// and to test external services such as the postgresq database working with the prisma ORM client

import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import * as Hapi from '@hapi/hapi';
import appInstance from './src/app';

// Bring in chai-http

chai.use(chaiHttp);

describe('end-to-end / integration tests', () => {
  // bring in the server

  let server: Hapi.Server;

  // Pass 'API' below to request instead of 'server' above since hapi js server instance does not have
  // address() function like express which chai-http expects

  const API = 'http://localhost:5000';

  // Set hooks

  beforeAll(async () => {
    await appInstance.init();
    if (appInstance.theApp) {
      server = appInstance.theApp;
      await server.start();
    }
  });

  beforeEach(async () => {});

  afterAll(async () => {
    await server.stop();
  });

  // Let us test only all the getAll() enpoints for each Model for example

  describe('Base route endpoint', () => {
    it('Live server should return success from base route', (done) => {
      chai
        .request(API)
        .get('/')
        .end((err, res) => {
          expect(res).to.have.status(200);
          done();
        });
    });
  });

  describe('Book model endpoint', () => {
    it('Live server should return all books in the database', (done) => {
      chai
        .request(API)
        .get('/books')
        .end((err, res) => {
          expect(res).to.have.status(200);
          done();
        });
    });
  });
});
