import { inject, singleton } from 'tsyringe';
import Nedb from '@seald-io/nedb';
import { Product } from '../../commands/schemas';

@singleton()
export class ProductRepository {
  constructor(
    @inject('Nedb') private readonly nedb: Nedb<Record<string, any>>
  ) {}

  /* Unsafe method - lack of pagination */
  public async getProductsWithoutPagination() {
    return this.nedb.getAllData<Product>();
  }
}
