import { Products } from '../products/products.entity';
import { IsString, IsNotEmpty, IsArray, ArrayMinSize } from 'class-validator';

export class CreateOrderDTO {
  @IsNotEmpty()
  @IsString({ message: 'El nombre debe ser una cadena de texto' })
  userId: string;
  @IsArray()
  @ArrayMinSize(1)
  products: Partial<Products[]>;
}
