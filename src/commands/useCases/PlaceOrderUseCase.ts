import { inject, singleton } from 'tsyringe';
import { ProductRepository } from '../repositories/Product.repository';
import { pino } from 'pino';
import BaseLogger = pino.BaseLogger;
import { Order } from '../schemas';
import { BadRequest } from 'http-errors';

@singleton()
export class PlaceOrderUseCase {
  constructor(
    private readonly productRepository: ProductRepository,
    @inject('logger') private readonly logger: BaseLogger
  ) {}

  /* Nedb is lacking support for bulk update, that's why each product stock value is changed separately  */
  /* Moreover it doesn't have support for transactions so the rollback is done manually */
  public async run(order: Order) {
    for (let [index, { productId, amount }] of order.products.entries()) {
      const result = await this.productRepository.changeProductStock(
        productId,
        -amount
      );
      if (result.numAffected == 0) {
        this.logger.error(
          `Cannot place an order, started revert process, cannot change stock value for the productId: ${productId}`
        );
        for (let i = 0; i < index; i++) {
          const { productId, amount } = order.products[i];
          await this.productRepository.changeProductStock(productId, amount);
        }
        this.logger.info('Finished revert process');
        throw new BadRequest(
          `Cannot place an order: Either product ${productId} doesnt exist or not enough products in the stock`
        );
      }
    }
  }
}
