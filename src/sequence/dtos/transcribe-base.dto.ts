import { IsNotEmpty, IsString } from 'class-validator';

export class TranscribeBaseDto {
  @IsNotEmpty()
  @IsString()
  readonly base: string;
}
