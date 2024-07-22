import { inject, singleton } from 'tsyringe';
import { ProductRepository } from '../repositories/Product.repository';
import { pino } from 'pino';
import BaseLogger = pino.BaseLogger;

@singleton()
export class DecreaseProductStockUseCase {
  constructor(
    private readonly productRepository: ProductRepository,
    @inject('logger') private readonly logger: BaseLogger
  ) {}

  public async run(productId: string, amount: number) {
    this.logger.debug(productId, 'Product created');
    return this.productRepository.changeProductStock(productId, -amount);
  }
}
