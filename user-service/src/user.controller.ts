import { Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { UserService } from './user.service';

@Controller()
export class UserController {
  constructor(private readonly userService: UserService) {}

  @MessagePattern('get_users')
  getUsers() {
    console.log('get_users');
    return this.userService.getUsers();
  }

  @MessagePattern('get_user')
  getUser(data: { id: number }) {
    console.log('get_user');
    return this.userService.getUser(data.id);
  }

  @MessagePattern('create_user')
  createUser(data: { name: string; email: string }) {
    console.log('create_user');
    return this.userService.createUser(data);
  }

  @MessagePattern('update_user')
  updateUser(data: { id: number; name?: string; email?: string }) {
    console.log('update_user');
    return this.userService.updateUser(data.id, data);
  }

  @MessagePattern('delete_user')
  deleteUser(data: { id: number }) {
    console.log('delete_user');
    return this.userService.deleteUser(data.id);
  }
}