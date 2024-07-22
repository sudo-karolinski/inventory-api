import { container } from 'tsyringe';
import { Request, Response } from 'express';
import asyncHandler from 'express-async-handler';
import { CreateProductUseCase } from '../useCases/CreateProductUseCase';

export const createProductHandler = asyncHandler(
  async (req: Request, res: Response) => {
    const createProductUseCase = container.resolve(CreateProductUseCase);
    const productDoc = await createProductUseCase.run(req.body);
    res.status(200).json(productDoc);
  }
);
