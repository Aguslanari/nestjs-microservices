import {
  Controller,
  Get,
  Post,
  Param,
  Body,
  Inject,
  Query,
} from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';

@Controller('notifications')
export class NotificationController {
  constructor(
    @Inject('NOTIFICATION_SERVICE') private notificationClient: ClientProxy,
  ) {}

  @Get()
  getNotifications() {
    console.log('get_notifications');
    return this.notificationClient.send('get_notifications', {});
  }

  @Get('recipient/:email')
  getNotificationsByRecipient(@Param('email') email: string) {
    console.log('get_notifications_by_recipient');
    return this.notificationClient.send('get_notifications_by_recipient', { recipient: email });
  }

  @Post()
  sendNotification(@Body() notificationData: {
    type: 'email' | 'sms' | 'push';
    recipient: string;
    subject?: string;
    message: string;
    data?: any;
  }) {
    return this.notificationClient.send('send_notification', notificationData);
  }
}