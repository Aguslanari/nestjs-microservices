import {
  Controller,
  Get,
  Post,
  Put,
  Param,
  Body,
  Inject,
  Query,
} from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';

@Controller('orders')
export class OrderController {
  constructor(@Inject('ORDER_SERVICE') private orderClient: ClientProxy) {}

  @Get()
  getOrders(@Query('userId') userId?: string) {
    console.log('get_orders');
    if (userId) {
      return this.orderClient.send('get_orders_by_user', {
        userId: parseInt(userId),
      });
    }
    return this.orderClient.send('get_orders', {});
  }

  @Get(':id')
  getOrder(@Param('id') id: string) {
    console.log('get_order');
    return this.orderClient.send('get_order', { id: parseInt(id) });
  }

  @Post()
  createOrder(
    @Body()
    orderData: {
      userId: number;
      products: { productId: number; quantity: number }[];
    },
  ) {
    console.log('create_order');
    return this.orderClient.send('create_order', orderData);
  }

  @Put(':id/status')
  updateOrderStatus(
    @Param('id') id: string,
    @Body() statusData: { status: string },
  ) {
    return this.orderClient.send('update_order_status', {
      id: parseInt(id),
      status: statusData.status,
    });
  }

  @Put(':id/cancel')
  cancelOrder(@Param('id') id: string) {
    return this.orderClient.send('cancel_order', { id: parseInt(id) });
  }
}