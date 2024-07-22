import { container } from 'tsyringe';
import { Request, Response } from 'express';
import asyncHandler from 'express-async-handler';
import { GetProductsUseCase } from '../useCases/GetProductsUseCase';

export const getProductsHandler = asyncHandler(
  async (req: Request, res: Response) => {
    const getProductsUseCase = container.resolve(GetProductsUseCase);
    const products = await getProductsUseCase.run();
    res.send(products);
  }
);
