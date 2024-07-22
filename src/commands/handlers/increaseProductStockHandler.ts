import { container } from 'tsyringe';
import { Request, Response } from 'express';
import asyncHandler from 'express-async-handler';
import { IncreaseProductStockUseCase } from '../useCases/IncreaseProductStockUseCase';
import { ZodString } from 'zod';
import { NotFound } from 'http-errors';

export const increaseProductStockHandler = asyncHandler<{
  id: ZodString['_output'];
}>(async (req: Request, res: Response) => {
  const increaseProductStockUseCase = container.resolve(
    IncreaseProductStockUseCase
  );
  const result = await increaseProductStockUseCase.run(
    req.params.id,
    req.body.amount
  );

  if (result.numAffected === 0) {
    throw new NotFound(
      `Cannot find product with following id: ${req.params.id}`
    );
  }

  res.status(200).json({ msg: 'Stock value increased' });
});
