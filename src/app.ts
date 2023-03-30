import * as Hapi from '@hapi/hapi';
import baseRoute from './baseRoute';
import bookRoutes from './books/booksRoutes';
import * as HapiSwagger from '../node_modules/hapi-swagger';
import * as Inert from '@hapi/inert';
import * as Vision from '@hapi/vision';

class App {
  theApp: Hapi.Server | undefined;

  // function to initialize the server after routes have been registered

  public async init() {
    // set up server
    this.theApp = Hapi.server({
      port: process.env.PORT || 9000,
      host: process.env.HOST || '0.0.0.0',
    });

    // Configure swagger documentation

    const swaggerOptions: HapiSwagger.RegisterOptions = {
      info: {
        title: 'Church Office Management REST API Documentation',
        version: '1.0.0',
        description:
          "Example Project of 'Hapi Js' with typescript and much features. This is a example books REST api built with Hapi js, Typescript , in-memory Database (NeDB). It is an example of how to structure a hapi js REST Api project into models, routes, controllers and services for effective separation of concerns and unit testing.",
        contact: {
          name: 'Afif Abdillah Jusuf',
          url: 'https://afif.dev',
        },
      },
    };

    const swaggerPlugins: Array<Hapi.ServerRegisterPluginObject<any>> = [
      {
        plugin: Inert,
      },
      {
        plugin: Vision,
      },
      {
        plugin: HapiSwagger,
        options: swaggerOptions,
      },
    ];

    // register swagger plugins
    await this.theApp.register(swaggerPlugins, { once: true });

    // register routes
    await this.theApp.register([baseRoute, bookRoutes], { once: true });
    console.log('Route(s) have been registered');

    // initialize app with routes
    await this.theApp?.initialize();
    console.log('The app has been initialized');
  }

  // Function to start the server for the main application or for tests

  public async start() {
    await this.theApp?.start();
  }
}

// create singleton for use in main app or for tests.
const appInstance = new App();

export default appInstance;
