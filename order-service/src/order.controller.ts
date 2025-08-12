import { Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { OrderService } from './order.service';

@Controller()
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @MessagePattern('get_orders')
  getOrders() {
    console.log('get_orders');
    return this.orderService.getOrders();
  }

  @MessagePattern('get_order')
  getOrder(data: { id: number }) {
    return this.orderService.getOrder(data.id);
  }

  @MessagePattern('create_order')
  createOrder(data: {
    userId: number;
    products: { productId: number; quantity: number }[];
  }) {
    console.log('create_order');
    return this.orderService.createOrder(data);
  }

  @MessagePattern('update_order_status')
  updateOrderStatus(data: { id: number; status: string }) {
    console.log('update_order_status');
    return this.orderService.updateOrderStatus(data.id, data.status);
  }

  @MessagePattern('get_orders_by_user')
  getOrdersByUser(data: { userId: number }) {
    console.log('get_orders_by_user');
    return this.orderService.getOrdersByUser(data.userId);
  }

  @MessagePattern('cancel_order')
  cancelOrder(data: { id: number }) {
    console.log('cancel_order');
    return this.orderService.cancelOrder(data.id);
  }
}