import { IsString, IsOptional, IsInt, Min, Max } from 'class-validator';
import { IsArray, IsNumber, IsUUID } from 'class-validator';

export class CreateMembershipDto {
  @IsString()
  id: string;

  @IsString()
  title: string;

  @IsString()
  description: string;

  @IsNumber()
  price: number;

  @IsArray()
  @IsString({ each: true })
  benefits: string[];

  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  tags?: string[];

  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  pictures?: string[];

  @IsUUID()
  creatorId: string;
}

export class MembershipIdDto {
  @IsUUID()
  id: string;
}

export class UpdateMembershipDto {
  @IsString()
  @IsOptional()
  title?: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsNumber()
  @IsOptional()
  price?: number;

  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  benefits?: string[];

  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  tags?: string[];

  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  pictures?: string[];
}
export class CreateCategoryDto {
  @IsString()
  name: string;

  @IsString()
  @IsOptional()
  description?: string;
}

export class UpdateCategoryDto {
  @IsString()
  @IsOptional()
  name?: string;

  @IsString()
  @IsOptional()
  description?: string;
}

export class CreateRatingDto {
  @IsInt()
  @Min(1)
  @Max(5)
  score: number;

  @IsString()
  @IsOptional()
  comment?: string;

  @IsUUID()
  userId: string;

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
