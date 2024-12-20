import { Controller, Get, Post, Body } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';

@Controller('admin')
@ApiTags('Admin')
export class AdminController {
  private readonly client: ClientProxy;

  @Get('users')
  @ApiOperation({ summary: 'Get all users' })
  @ApiResponse({ status: 200, description: 'List of all users.' })
  async getAllUsers() {
    return this.client.send({ cmd: 'get-all-users' }, {});
  }

  @Post('users')
  @ApiOperation({ summary: 'Create a user' })
  @ApiResponse({ status: 201, description: 'User created.' })
  async createUser(@Body() data: any) {
    return this.client.send({ cmd: 'create-user' }, data);
  }
}
