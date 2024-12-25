import {
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  Param,
  Patch,
  Post,
  UseGuards,
  UsePipes,
} from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import {
  ApiTags,
  ApiOperation,
  ApiBearerAuth,
  ApiResponse,
} from '@nestjs/swagger';
import { timeout } from 'rxjs';
import { MembershipService } from './membership.service';
import {
  AddTagToCategoryDto,
  CreateMembershipCategoryDto,
  CreateMembershipDto,
  CreateMembershipTagDto,
} from './dto/membership.dto';
import { JoiValidationPipe } from '@app/common/validators/joinValidationPipe';
import { Role } from '@app/common/validators';
import { createMembershipSchema } from '@app/common/validators/membership.schema';
import { RolesGuard } from 'apps/auth/src/guards/roles.guard';
import { Roles } from '@app/common/decorator/roles.decorator';
import { Category } from '@prisma/client';

@ApiTags('Membership')
@ApiBearerAuth()
@UseGuards(RolesGuard)
@Roles(Role.CREATOR, Role.ADMIN)
@Controller('membership')
export class MembershipController {
  constructor(
    @Inject('MEMBERSHIP') private readonly membershipClientProxy: ClientProxy,
    private readonly membershipService: MembershipService,
  ) {}

  @Post('create')
  @UsePipes(new JoiValidationPipe(createMembershipSchema))
  @ApiOperation({
    summary: 'Create Membership',
    description: 'Creates a new membership.',
  })
  async createMembership(@Body() createMembershipDto: CreateMembershipDto) {
    return await this.membershipService.createMembership(createMembershipDto);
  }

  @Post('create/tag')
  @ApiOperation({ summary: 'Create a new tag' })
  @ApiResponse({
    status: 201,
    description: 'The tag has been successfully created.',
  })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  async createMembershipTag(@Body() createTagDto: CreateMembershipTagDto) {
    return this.membershipService.createMembershipTag(createTagDto);
  }
  @Post('create/category')
  @ApiOperation({ summary: 'Create a new category' })
  @ApiResponse({
    status: 201,
    description: 'The category has been successfully created.',
  })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  async createMembershipCategory(
    @Body() createCategoryDto: CreateMembershipCategoryDto,
  ) {
    return this.membershipService.createMembershipCategory(createCategoryDto);
  }

  @Get('get-categories')
  @ApiOperation({
    summary: 'Get Categories',
    description: 'Gets all categories.',
  })
  async getCategories(): Promise<Category[]> {
    return await this.membershipService.getMembershipCategories();
  }

  @Post('add-tag-to-category')
  async addTagToCategory(@Body() addTagToCategoryDto: AddTagToCategoryDto) {
    const { categoryName, tagName } = addTagToCategoryDto;
    return this.membershipService.addTagToCategory(categoryName, tagName);
  }

  @Get('get-tags')
  @ApiOperation({
    summary: 'Get Tags',
    description: 'Gets all tags.',
  })
  async getTags() {
    return await this.membershipService.getMembershipTags();
  }

  @Get('get-tag/:id')
  @ApiOperation({
    summary: 'Get Tag by ID',
    description: 'Gets a tag by ID.',
  })
  async getTagById(@Param('id') id: string) {
    return await this.membershipService.getMembershipTagById(id);
  }

  @Get('get-category/:id')
  @ApiOperation({
    summary: 'Get Category by ID',
    description: 'Gets a category by ID.',
  })
  async getCategoryById(@Param('id') id: string) {
    return await this.membershipService.getMembershipCategoryById(id);
  }

  @Patch('update')
  @UsePipes(new JoiValidationPipe(createMembershipSchema))
  @ApiOperation({
    summary: 'Update Membership',
    description: 'Updates an existing membership.',
  })
  async updateMembership(@Body() createMembershipDto: CreateMembershipDto) {
    return await this.membershipService.updateMembership(createMembershipDto);
  }

  @Delete('delete')
  @ApiOperation({
    summary: 'Delete Membership',
    description: 'Deletes an existing membership.',
  })
  async deleteMembership(@Param('id') id: string) {
    return await this.membershipService.deleteMembership({ id });
  }

  @Get('get')
  @ApiOperation({
    summary: 'Get Membership',
    description: 'Gets an existing membership.',
  })
  async getMembership() {
    return await this.membershipService.getAllMembership();
  }

  @Get('get-by-id/:id')
  @ApiOperation({
    summary: 'Get Membership by ID',
    description: 'Gets an existing membership by ID.',
  })
  async getMembershipById(@Param('id') id: string) {
    return await this.membershipService.getMembershipById(id);
  }

  @Get('list')
  @ApiOperation({
    summary: 'List Memberships',
    description: 'Lists all available memberships.',
  })
  async listMemberships() {
    try {
      return await this.membershipClientProxy
        .send({ cmd: 'list-memberships' }, {})
        .pipe(timeout(5000))
        .toPromise();
    } catch (err) {
      console.error(`Error: ${err}`);
    }
  }

  @Get('hello')
  @ApiOperation({
    summary: 'Membership Hello',
    description: 'Returns a hello message from the membership service.',
  })
  getHello() {
    return this.membershipClientProxy
      .send({ cmd: 'get-hello' }, {})
      .pipe(timeout(5000))
      .toPromise();
  }
}
