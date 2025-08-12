import { Injectable, Inject } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';

export interface User {
  id: number;
  name: string;
  email: string;
  createdAt: Date;
}

@Injectable()
export class UserService {
  constructor(
    @Inject('NOTIFICATION_SERVICE') private notificationClient: ClientProxy,
  ) {}
  private users: User[] = [
    {
      id: 1,
      name: 'Juan Pérez',
      email: 'juan@example.com',
      createdAt: new Date(),
    },
    {
      id: 2,
      name: 'María García',
      email: 'maria@example.com',
      createdAt: new Date(),
    },
  ];

  getUsers(): User[] {
    return this.users;
  }

  getUser(id: number): User | null {
    const user = this.users.find((user) => user.id === id);
    return user || null;
  }

  createUser(userData: { name: string; email: string }): User {
    const newUser: User = {
      id: this.users.length + 1,
      name: userData.name,
      email: userData.email,
      createdAt: new Date(),
    };
    this.users.push(newUser);

    console.log('🚀 Emitiendo evento NATS: user_created', { userId: newUser.id, email: newUser.email });
    this.notificationClient.emit('user_created', newUser);

    return newUser;
  }

  updateUser(
    id: number,
    userData: { name?: string; email?: string },
  ): User | null {
    const userIndex = this.users.findIndex((user) => user.id === id);
    if (userIndex === -1) return null;

    this.users[userIndex] = {
      ...this.users[userIndex],
      ...userData,
    };
    return this.users[userIndex];
  }

  deleteUser(id: number): boolean {
    const userIndex = this.users.findIndex((user) => user.id === id);
    if (userIndex === -1) return false;

    this.users.splice(userIndex, 1);
    return true;
  }
}