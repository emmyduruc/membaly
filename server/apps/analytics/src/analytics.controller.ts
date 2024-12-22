import { Controller, Get, Inject } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { timeout } from 'rxjs';

@ApiTags('Analytics')
@Controller('analytics')
export class AnalyticsController {
  constructor(
    @Inject('ANALYTICS') private readonly analyticClientProxy: ClientProxy,
  ) {}

  @Get('get')
  @ApiOperation({
    summary: 'Get Analytics',
    description: 'Retrieves analytics data.',
  })
  getAnalytics() {
    return this.analyticClientProxy
      .send({ cmd: 'get-analytics' }, {})
      .pipe(timeout(5000))
      .toPromise();
  }
}
