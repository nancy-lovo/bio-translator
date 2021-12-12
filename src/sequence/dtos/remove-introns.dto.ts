import { Transform, Type } from 'class-transformer';
import {
  IsArray,
  IsNotEmpty,
  IsNumber,
  IsString,
  ValidateNested,
} from 'class-validator';
import { IsArrayOfArrays } from 'src/decorators/remove-introns.decorator';
import { transformToArray } from 'src/utils/transform';

export class NestedDTO {
  @Transform(transformToArray)
  @IsNumber(
    { allowNaN: false, allowInfinity: false, maxDecimalPlaces: 0 },
    { each: true },
  )
  @IsArray()
  exonRange: number[];
}

export class RemoveIntronsDto {
  @IsNotEmpty()
  @IsString()
  readonly seq: string;

  @IsArrayOfArrays()
  @ValidateNested()
  @Type(() => NestedDTO)
  readonly exonsRanges: NestedDTO[];
}
