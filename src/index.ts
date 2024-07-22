import 'reflect-metadata';
import { container } from 'tsyringe';
import { db, initDatastore } from './database';
import express, { Express, NextFunction, Request, Response } from 'express';
import { commandRouter } from './commands/routes';
import { queryRouter } from './queries/routes';
import Nedb from '@seald-io/nedb';
import { isHttpError } from 'http-errors';
import pino from 'pino';

require('dotenv').config();

const logger = pino({
  level: process.env.LOG_LEVEL || 'debug'
});

const app: Express = express();

const main = async () => {
  await initDatastore();

  container.register<Nedb<Record<string, any>>>('Nedb', {
    useValue: db
  });

  container.register<pino.BaseLogger>('logger', {
    useValue: logger
  });

  app.use(express.json());
  app.use(commandRouter);
  app.use(queryRouter);

  app.use(
    async (err: unknown, req: Request, res: Response, next: NextFunction) => {
      logger.error(err, `Error caught`);
      if (isHttpError(err)) {
        res.status(err.statusCode);
        res.send({ message: err.message });
      } else {
        res.status(500);
        res.send('InternalServerError');
      }
      next();
    }
  );

  app.listen(process.env.PORT || 4000, () => {
    logger.info('Server started');
  });
};

main().then();
