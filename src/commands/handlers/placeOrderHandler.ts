import asyncHandler from 'express-async-handler';
import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { PlaceOrderUseCase } from '../useCases/PlaceOrderUseCase';

export const placeOrderHandler = asyncHandler(
  async (req: Request, res: Response) => {
    const placeOrderUseCase = container.resolve(PlaceOrderUseCase);
    await placeOrderUseCase.run(req.body);
    res.status(200).json({ msg: 'Order placed' });
  }
);
