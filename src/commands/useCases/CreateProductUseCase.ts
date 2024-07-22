import { inject, singleton } from 'tsyringe';
import { ProductRepository } from '../repositories/Product.repository';
import { pino } from 'pino';
import BaseLogger = pino.BaseLogger;
import { Product } from '../schemas';

@singleton()
export class CreateProductUseCase {
  constructor(
    private readonly productRepository: ProductRepository,
    @inject('logger') private readonly logger: BaseLogger
  ) {}

  public async run(product: Product) {
    const productDoc = await this.productRepository.create(product);
    this.logger.debug(productDoc, 'Product created');
    return productDoc;
  }
}
