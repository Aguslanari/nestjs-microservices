import { Injectable } from '@nestjs/common';

export interface OrderItem {
  productId: number;
  quantity: number;
  price: number;
}

export interface Order {
  id: number;
  userId: number;
  items: OrderItem[];
  status: 'pending' | 'confirmed' | 'shipped' | 'delivered' | 'cancelled';
  total: number;
  createdAt: Date;
}

@Injectable()
export class OrderService {
  private orders: Order[] = [
    {
      id: 1,
      userId: 1,
      items: [
        { productId: 1, quantity: 1, price: 999.99 },
        { productId: 2, quantity: 2, price: 599.99 },
      ],
      status: 'confirmed',
      total: 2199.97,
      createdAt: new Date(),
    },
    {
      id: 2,
      userId: 2,
      items: [{ productId: 3, quantity: 3, price: 29.99 }],
      status: 'pending',
      total: 89.97,
      createdAt: new Date(),
    },
  ];

  getOrders(): Order[] {
    return this.orders;
  }

  getOrder(id: number): Order | null {
    const order = this.orders.find((order) => order.id === id);
    return order || null;
  }

  createOrder(orderData: {
    userId: number;
    products: { productId: number; quantity: number }[];
  }): Order {
    const items: OrderItem[] = orderData.products.map((product) => ({
      productId: product.productId,
      quantity: product.quantity,
      price: this.getProductPrice(product.productId),
    }));

    const total = items.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0,
    );

    const newOrder: Order = {
      id: this.orders.length + 1,
      userId: orderData.userId,
      items,
      status: 'pending',
      total,
      createdAt: new Date(),
    };

    this.orders.push(newOrder);
    return newOrder;
  }

  updateOrderStatus(id: number, status: string): Order | null {
    const orderIndex = this.orders.findIndex((order) => order.id === id);
    if (orderIndex === -1) return null;

    this.orders[orderIndex].status = status as Order['status'];
    return this.orders[orderIndex];
  }

  getOrdersByUser(userId: number): Order[] {
    return this.orders.filter((order) => order.userId === userId);
  }

  cancelOrder(id: number): Order | null {
    const orderIndex = this.orders.findIndex((order) => order.id === id);
    if (orderIndex === -1) return null;

    if (this.orders[orderIndex].status === 'delivered') {
      return null;
    }

    this.orders[orderIndex].status = 'cancelled';
    return this.orders[orderIndex];
  }

  private getProductPrice(productId: number): number {
    const prices = {
      1: 999.99,
      2: 599.99,
      3: 29.99,
    };
    return prices[productId] || 0;
  }
}