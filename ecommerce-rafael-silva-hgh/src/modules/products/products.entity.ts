import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { v4 as uuid } from 'uuid';
@Entity('products')
export class Product {
  @PrimaryGeneratedColumn('uuid')
  id: string = uuid();
  @Column()
  name: string;
  @Column()
  description: string;
  @Column()
  price: string;
  @Column()
  stock: string;
  @Column()
  imgUrl: string;
  @Column()
  category_id: string;
}
