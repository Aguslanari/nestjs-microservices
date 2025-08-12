import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { NotificationService, NotificationData } from './notification.service';

@Controller()
export class NotificationController {
  constructor(private readonly notificationService: NotificationService) {}

  @MessagePattern('send_notification')
  async sendNotification(@Payload() data: NotificationData) {
    console.log('send_notification');
    return this.notificationService.sendNotification(data);
  }

  @MessagePattern('get_notifications')
  async getNotifications() {
    return this.notificationService.getNotifications();
  }

  @MessagePattern('get_notifications_by_recipient')
  async getNotificationsByRecipient(@Payload() data: { recipient: string }) {
    return this.notificationService.getNotificationsByRecipient(data.recipient);
  }

  @MessagePattern('user_created')
  async handleUserCreated(@Payload() userData: any) {
    console.log('📨 Evento NATS recibido: user_created', { userId: userData.id, email: userData.email });
    
    const notification: NotificationData = {
      type: 'email',
      recipient: userData.email,
      subject: 'Bienvenido!',
      message: `Hola ${userData.name}, tu cuenta ha sido creada exitosamente.`,
      data: userData,
    };

    return this.notificationService.sendNotification(notification);
  }

  @MessagePattern('order_created')
  async handleOrderCreated(@Payload() orderData: any) {
    const notification: NotificationData = {
      type: 'email',
      recipient: orderData.userEmail,
      subject: 'Orden confirmada',
      message: `Tu orden #${orderData.id} ha sido confirmada por $${orderData.total}.`,
      data: orderData,
    };

    return this.notificationService.sendNotification(notification);
  }
}