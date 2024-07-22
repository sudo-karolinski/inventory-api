import { container } from 'tsyringe';
import { Request, Response } from 'express';
import asyncHandler from 'express-async-handler';
import { DecreaseProductStockUseCase } from '../useCases/DecreaseProductStockUseCase';
import { ZodString } from 'zod';
import { BadRequest } from 'http-errors';

export const decreaseProductStockHandler = asyncHandler<{
  id: ZodString['_output'];
}>(async (req: Request, res: Response) => {
  const decreaseProductStockUseCase = container.resolve(
    DecreaseProductStockUseCase
  );
  const result = await decreaseProductStockUseCase.run(
    req.params.id,
    req.body.amount
  );

  if (result.numAffected === 0) {
    throw new BadRequest(
      `Cannot decrease stock of the product: ${req.params.id}, Either it doesnt exist or stock number would be negative after the change`
    );
  }

  res.status(200).json({ msg: 'Stock value decreased' });
});
