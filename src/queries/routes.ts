import express from 'express';
import { getProductsHandler } from './handlers/getProductsHandler';

export const queryRouter = express.Router();

queryRouter.get('/products', getProductsHandler);
