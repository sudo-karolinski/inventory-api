import express from 'express';
import { validateRequest } from 'zod-express-middleware';
import { createProductHandler } from './handlers/createProductHandler';
import { increaseProductStockHandler } from './handlers/increaseProductStockHandler';
import { decreaseProductStockHandler } from './handlers/decreaseProductStockHandler';
import {
  CreateOrderSchema,
  ProductIdSchema,
  ProductSchema,
  StockSchema
} from './schemas';
import { placeOrderHandler } from './handlers/placeOrderHandler';

export const commandRouter = express.Router();

commandRouter.post(
  '/products',
  validateRequest({
    body: ProductSchema
  }),
  createProductHandler
);

commandRouter.post(
  '/products/:id/restock',
  validateRequest({ body: StockSchema, params: ProductIdSchema }),
  increaseProductStockHandler
);

commandRouter.post(
  '/products/:id/sell',
  validateRequest({ body: StockSchema, params: ProductIdSchema }),
  decreaseProductStockHandler
);

commandRouter.post(
  '/orders',
  validateRequest({ body: CreateOrderSchema }),
  placeOrderHandler
);
