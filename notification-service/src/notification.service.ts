import { Injectable } from '@nestjs/common';

export interface NotificationData {
  type: 'email' | 'sms' | 'push';
  recipient: string;
  subject?: string;
  message: string;
  data?: any;
}

@Injectable()
export class NotificationService {
  private notifications: any[] = [];

  async sendNotification(notification: NotificationData): Promise<any> {
    const sentNotification = {
      id: Date.now(),
      ...notification,
      sentAt: new Date(),
      status: 'sent',
    };

    this.notifications.push(sentNotification);

    console.log(`📧 Notification sent:`, {
      type: notification.type,
      recipient: notification.recipient,
      subject: notification.subject,
      message: notification.message,
    });

    return sentNotification;
  }

  async getNotifications(): Promise<any[]> {
    return this.notifications;
  }

  async getNotificationsByRecipient(recipient: string): Promise<any[]> {
    return this.notifications.filter(n => n.recipient === recipient);
  }
}