import { Transform } from 'class-transformer';
import { IsNotEmpty, IsString } from 'class-validator';
import { validateRNACodon } from 'src/utils/transform';

export class CodonAminoAcidDto {
  @IsNotEmpty()
  @Transform(validateRNACodon)
  @IsString()
  readonly rnaCodon: string;
}
