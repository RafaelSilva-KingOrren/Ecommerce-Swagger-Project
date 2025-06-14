import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Products } from '../products/products.entity';
import { CreateOrderDTO } from '../orders/orderDTO';
import { User } from '../users/users.entity';
import { Orders } from './order.entity';
import { Repository } from 'typeorm';
import { OrderDetails } from '../orderDetails/orderDetails.entity';

@Injectable()
export class OrdersService {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
    @InjectRepository(Orders)
    private readonly ordersRepository: Repository<Orders>,
    @InjectRepository(OrderDetails)
    private readonly orderDetailsRepository: Repository<OrderDetails>,
    @InjectRepository(Products)
    private readonly productsRepository: Repository<Products>,
  ) {}

  async addOrder(userId: string, products: Partial<Products[]>) {
    const user: User | null = await this.usersRepository.findOneBy({
      id: userId,
    });

    if (!user) return 'Usuario no encontrado';

    const order = new Orders();
    order.user = user;
    order.date = new Date();

    const newOrder = await this.ordersRepository.save(order);

    let total = 0;

    const productsArray: Products[] = await Promise.all(
      products.map(async (item) => {
        const product: Products | null =
          await this.productsRepository.findOneBy({ id: item?.id });
        if (!product) {
          throw new NotFoundException(
            `Producto con ID ${product} no encontrado`,
          );
        }
        total += Number(product.price);

        if (product.stock <= 0) {
          throw new BadRequestException(`Producto ${product.name} sin stock`);
        }

        await this.productsRepository.update(
          { id: item?.id },
          { stock: product.stock - 1 },
        );
        return product;
      }),
    );

    const orderDetail = new OrderDetails();
    orderDetail.orders = newOrder;
    orderDetail.price = Number(total.toFixed(2));
    orderDetail.products = productsArray;

    await this.orderDetailsRepository.save(orderDetail);
    newOrder.orderDetails = orderDetail;
    await this.ordersRepository.save(newOrder);

    const orderWithDetails = await this.ordersRepository.findOne({
      where: { id: newOrder.id },
      relations: ['orderDetails', 'orderDetails.products'],
    });

    if (!orderWithDetails || !orderWithDetails.orderDetails) {
      throw new NotFoundException(
        'Error al recuperar los detalles de la orden',
      );
    }

    return {
      message: `Pedido realizado!`,
      data: {
        id: orderWithDetails.id,
        date: orderWithDetails.date,
        total: orderWithDetails.orderDetails.price,
        products: orderWithDetails.orderDetails.products.map((product) => ({
          id: product.id,
          name: product.name,
          price: product.price,
        })),
      },
    };
  }

  async getOrder(id: string) {
    return await this.ordersRepository.findOne({
      where: { id },
      relations: ['orderDetails', 'orderDetails.products'],
    });
  }
}
