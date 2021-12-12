import { SequenceService } from './sequence.service';
import { Body, Controller, Get, HttpCode, Put, Query } from '@nestjs/common';
import {
  CodonAminoAcidDto,
  RemoveIntronsDto,
  SeqDto,
  TranscribeBaseDto,
} from './dtos';
import { BaseResponse } from 'src/utils/http';

@Controller('sequence')
export class SequenceController {
  constructor(private readonly sequenceService: SequenceService) {}

  @HttpCode(200)
  @Get('check')
  async getASequenceType(@Query() query: SeqDto): Promise<BaseResponse> {
    const data = await this.sequenceService.checkType(query);
    return BaseResponse.create('retrieved sequence type', data);
  }

  @HttpCode(200)
  @Get('complement')
  async getAComplement(@Query() query: SeqDto): Promise<BaseResponse> {
    const data = query.reverse
      ? await this.sequenceService.reverseComplement(query)
      : await this.sequenceService.complement(query);
    return BaseResponse.create(
      `retrieved complement sequence (reverse=${query.reverse})`,
      data,
    );
  }

  @HttpCode(200)
  @Get('transcribe')
  async getATranscribedBase(
    @Query() query: TranscribeBaseDto,
  ): Promise<BaseResponse> {
    const data = await this.sequenceService.getTranscribedBase(query);
    return BaseResponse.create('retrieved transcribed base', data);
  }

  @HttpCode(200)
  @Get('codons')
  async getACodonAminoAcid(
    @Query() query: CodonAminoAcidDto,
  ): Promise<BaseResponse> {
    const data = await this.sequenceService.getTranslatedAA(query);
    return BaseResponse.create('retrieved translated amino acid', data);
  }

  @HttpCode(200)
  @Put('introns')
  async removeIntrons(@Body() dto: RemoveIntronsDto): Promise<BaseResponse> {
    const data = await this.sequenceService.removeIntrons(dto);
    return BaseResponse.create('removed introns', data);
  }
}
