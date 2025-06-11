import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { v4 as uuid } from 'uuid';
@Entity('users')
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string = uuid();
  @Column()
  name: string;
  @Column()
  email: string;
  @Column()
  password: string;
  @Column()
  address: string;
  @Column()
  phone: string;
  @Column()
  country: string;
  @Column()
  city: string;
  @Column()
  orders_id: number;
}
