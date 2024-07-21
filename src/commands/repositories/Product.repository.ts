import { inject, singleton } from 'tsyringe';
import Nedb from '@seald-io/nedb';
import pino from 'pino';
import BaseLogger = pino.BaseLogger;
import { Product } from '../schemas';

@singleton()
export class ProductRepository {
  constructor(
    @inject('Nedb') private readonly nedb: Nedb<Record<string, any>>,
    @inject('logger') private readonly logger: BaseLogger
  ) {}

  public async create(product: Product) {
    return this.nedb.insertAsync(product);
  }

  public async changeProductStock(productId: string, amount: number) {
    return this.nedb.updateAsync(
      { _id: productId, stock: { $gte: -amount } },
      {
        $inc: {
          stock: amount
        }
      }
    );
  }
}
