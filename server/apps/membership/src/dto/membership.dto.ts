import { IsString, IsOptional, IsInt, Min, Max } from 'class-validator';
import { IsArray, IsNumber, IsUUID } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateMembershipDto {
  @ApiProperty({ description: 'ID of the membership' })
  @IsString()
  id: string;

  @ApiProperty({ description: 'Title of the membership' })
  @IsString()
  title: string;

  @ApiProperty({ description: 'Description of the membership' })
  @IsString()
  description: string;

  @ApiProperty({ description: 'Price of the membership' })
  @IsNumber()
  price: number;

  @ApiProperty({
    description: 'Benefits of the membership',
    type: [String],
    required: false,
  })
  @IsArray()
  @IsOptional()
  benefits: string[];

  @ApiProperty({
    description: 'Pictures for the membership',
    type: [String],
    required: false,
  })
  @IsArray()
  @IsOptional()
  pictures: string[];

  @ApiProperty({ description: 'Creator of the membership', example: 'string' })
  @IsUUID()
  creatorId: string;

  @ApiProperty({
    description: 'Array of category-tag associations',
    type: [String],
  })
  @IsArray()
  categoryTags: { categoryId: string; tagId: string }[];
}

export class UpdateMembershipDto {
  @ApiProperty({ description: 'Title of the membership', required: false })
  @IsString()
  @IsOptional()
  title?: string;

  @ApiProperty({
    description: 'Description of the membership',
    required: false,
  })
  @IsString()
  @IsOptional()
  description?: string;

  @ApiProperty({ description: 'Price of the membership', required: false })
  @IsNumber()
  @IsOptional()
  price?: number;

  @ApiProperty({
    description: 'Benefits of the membership',
    isArray: true,
    required: false,
  })
  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  benefits?: string[];

  @ApiProperty({
    description: 'Tags for the membership',
    isArray: true,
    required: false,
  })
  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  tags?: string[];

  @ApiProperty({
    description: 'Pictures for the membership',
    isArray: true,
    required: false,
  })
  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  pictures?: string[];
}

export class CreateMembershipTagDto {
  @ApiProperty({ description: 'The name of the tag' })
  @IsString()
  name: string;
}

export class CreateMembershipCategoryDto {
  @ApiProperty({ description: 'The name of the category' })
  @IsString()
  name: string;

  @ApiProperty({
    description: 'Optional description of the category',
    required: false,
  })
  @IsString()
  @IsOptional()
  description?: string;
}

export class AddTagToCategoryDto {
  @ApiProperty({ description: 'UUID of the category' })
  @IsUUID()
  categoryName: string;

  @ApiProperty({ description: 'UUID of the tag' })
  @IsUUID()
  tagName: string;
}

export class MembershipIdDto {
  @IsUUID()
  id: string;
}

export class UpdateCategoryDto {
  @ApiProperty({ description: 'Name of the category', required: false })
  @IsString()
  @IsOptional()
  name?: string;

  @ApiProperty({ description: 'Description of the category', required: false })
  @IsString()
  @IsOptional()
  description?: string;
}

export class CreateRatingDto {
  @ApiProperty({ description: 'Score of the rating' })
  @IsInt()
  @Min(1)
  @Max(5)
  score: number;

  @ApiProperty({ description: 'Comment of the rating', required: false })
  @IsString()
  @IsOptional()
  comment?: string;

  @ApiProperty({ description: 'UUID of the user' })
  @IsUUID()
  userId: string;

  @ApiProperty({ description: 'UUID of the membership' })
  @IsUUID()
  membershipId: string;
}

export class UpdateRatingDto {
  @IsInt()
  @Min(1)
  @Max(5)
  @IsOptional()
  score?: number;

  @IsString()
  @IsOptional()
  comment?: string;
}
export class CreateFavoriteDto {
  @IsUUID()
  userId: string;

  @IsUUID()
  membershipId: string;
}

export class CreateSuccessStoryDto {
  @IsString()
  title: string;

  @IsString()
  content: string;

  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  media?: string[];

  @IsUUID()
  userId: string;

  @IsUUID()
  membershipId: string;
}
