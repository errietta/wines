import * as bodyParser from 'body-parser';
import * as cors from 'cors';
import * as dotenv from 'dotenv';
import * as express from 'express';
import * as core from 'express-serve-static-core';

import setupES from './elastic/setup';
import routes from './routes';
import { RouteState } from './types';

dotenv.config();

const setupApp = (): core.Express => {
  const app = express();

  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(bodyParser.json());
  app.options('*', cors())
  app.use(cors());

  return app;
};

const startServer = (app: core.Express): Promise<void> => (
  new Promise((resolve, reject) => {
    const port = process.env.PORT || 3000;
    app.listen(port, (err: Error) => (err ? reject(err) : resolve()));
  })
);

const setupRoutes = (app: core.Express, state: RouteState): void => {
  app.get('/', (req, res) => {
    res.send('Hello World!');
  });
  app.use(routes(state));
};

(async () => {
  try {
    const esHost = process.env.ES_HOST;
    if (!esHost) {
      throw new Error('please provide ES_HOST');
    }

    const app: core.Express = setupApp();
    console.log('ES client setting up');
    const esClient = await setupES(esHost);
    console.log('ES client set up');

    const state: RouteState = {
      esClient,
    };

    setupRoutes(app, state);
    await startServer(app);
    console.info('server started');
  } catch (e) {
    console.error(e);
  }
})();
