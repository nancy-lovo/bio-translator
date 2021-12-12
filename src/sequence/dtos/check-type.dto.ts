import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class SeqDto {
  @IsNotEmpty()
  @IsString()
  readonly seq: string;

  @IsOptional()
  @IsString()
  readonly reverse: boolean;
}
