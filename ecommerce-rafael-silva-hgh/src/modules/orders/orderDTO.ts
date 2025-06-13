import { Products } from '../products/products.entity';

export class CreateOrderDTO {
  userId: string;
  products: Partial<Products[]>;
}
