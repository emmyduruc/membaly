import { Controller, Get, Post, Body, Inject } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { pipe, timeout } from 'rxjs';

@ApiTags('Gateway')
@Controller('gateway')
export class GatewayController {
  constructor(
    @Inject('MEMBERSHIP') private readonly membershipService: ClientProxy,
  ) {}
  @Get('/')
  @ApiOperation({
    summary: 'API Gateway Root',
    description:
      'Returns a welcome message and basic information about the API Gateway.',
  })
  getRoot() {
    return {
      message: 'Welcome to the API Gateway!',
      services: [
        { name: 'Auth Service', route: '/auth' },
        { name: 'User Service', route: '/user' },
        { name: 'Payment Service', route: '/payment' },
        { name: 'Membership Service', route: '/membership' },
        { name: 'Analytics Service', route: '/analytics' },
      ],
      documentation: '/api-docs',
    };
  }

  @Get('health')
  @ApiOperation({
    summary: 'Health Check',
    description: 'Checks the health of the API Gateway.',
  })
  healthCheck() {
    return { status: 'OK', timestamp: new Date().toISOString() };
  }
}
