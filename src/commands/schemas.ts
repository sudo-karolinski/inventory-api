import { z } from 'zod';

export const ProductSchema = z.object({
  name: z.string().max(50),
  description: z.string().max(50),
  stock: z.number().gte(0),
  price: z.number().gt(0)
});

export const CreateOrderSchema = z.object({
  customerId: z.string(),
  products: z.array(z.object({ productId: z.string(), amount: z.number() }))
});

export const StockSchema = z.object({
  amount: z.number().gt(0)
});

export const ProductIdSchema = z.object({
  id: z.string()
});

export type Product = z.infer<typeof ProductSchema>;

export type Order = z.infer<typeof CreateOrderSchema>;
