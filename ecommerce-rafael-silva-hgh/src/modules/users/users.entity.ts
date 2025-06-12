import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Orders } from '../orders/order.entity';
@Entity('users')
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @Column({ type: 'varchar', length: 50, nullable: false })
  name: string;
  @Column({ unique: true, nullable: false, type: 'varchar', length: 50 })
  email: string;
  @Column({ nullable: false, type: 'varchar', length: 100 })
  password: string;
  @Column({ type: 'varchar' })
  address: string;
  @Column({ type: 'bigint' })
  phone: number;
  @Column({ type: 'varchar', length: 50 })
  country: string;
  @Column({ type: 'varchar', length: 50 })
  city: string;
  @Column({ type: 'boolean', default: false })
  isAdmin: boolean;
  @OneToMany(() => Orders, (order) => order.user)
  orders: Orders[];
}
