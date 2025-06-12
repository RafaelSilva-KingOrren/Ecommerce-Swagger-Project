import {
  Column,
  Entity,
  ManyToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  JoinColumn,
  JoinTable,
} from 'typeorm';
import { Orders } from '../orders/order.entity';
import { Products } from '../products/products.entity';

@Entity('order_details')
export class OrderDetails {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'decimal', precision: 10, scale: 2, nullable: false })
  price: number;

  @OneToOne(() => Orders, (order) => order.orderDetails, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'order_id' })
  orders: Orders;

  @ManyToMany(() => Products, (product) => product.orderDetails)
  @JoinTable({
    name: 'products_order_details',
  })
  products: Products[];
}
