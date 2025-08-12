import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
  Inject,
} from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';

@Controller('users')
export class UserController {
  constructor(@Inject('USER_SERVICE') private userClient: ClientProxy) {}

  @Get()
  getUsers() {
    return this.userClient.send('get_users', {});
  }

  @Get(':id')
  getUser(@Param('id') id: string) {
    return this.userClient.send('get_user', { id: parseInt(id) });
  }

  @Post()
  createUser(@Body() userData: { name: string; email: string }) {
    console.log('create_user');
    return this.userClient.send('create_user', userData);
  }

  @Put(':id')
  updateUser(
    @Param('id') id: string,
    @Body() userData: { name?: string; email?: string },
  ) {
    console.log('update_user');
    return this.userClient.send('update_user', {
      id: parseInt(id),
      ...userData,
    });
  }

  @Delete(':id')
  deleteUser(@Param('id') id: string) {
    console.log('delete_user');
    return this.userClient.send('delete_user', { id: parseInt(id) }); 
  }
}