import { inject, singleton } from 'tsyringe';
import { ProductRepository } from '../repositories/Product.repository';
import { pino } from 'pino';
import BaseLogger = pino.BaseLogger;

@singleton()
export class GetProductsUseCase {
  constructor(
    private readonly productRepository: ProductRepository,
    @inject('logger') private readonly logger: BaseLogger
  ) {}

  public async run() {
    const products =
      await this.productRepository.getProductsWithoutPagination();
    this.logger.debug(products, 'List of all products');
    return products;
  }
}
