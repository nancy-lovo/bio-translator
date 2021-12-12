import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import * as bioNode from 'bionode-seq';
import { capitalize } from 'src/utils/transform';
import { CodonAminoAcidDto, RemoveIntronsDto, SeqDto, TranscribeBaseDto } from './dtos';

@Injectable()
export class SequenceService {
  private readonly logger = new Logger(SequenceService.name);

  async checkType({ seq }: SeqDto) {
    try {
      const type: ISeqType = await bioNode.checkType(seq);
      return capitalize(String(type));
    } catch (error) {
      this.logger.error(`check seq type failed`);
      console.error(error);
    }
  }

  async complement({ seq }: SeqDto) {
    try {
      const compSeq = await bioNode.complement(seq);
      return capitalize(String(compSeq));
    } catch (error) {
      this.logger.error(`complement seq failed`);
      console.error(error);
    }
  }

  async reverseComplement({ seq }: SeqDto) {
    try {
      const revSeq = await bioNode.reverseComplement(seq);
      return capitalize(String(revSeq));
    } catch (error) {
      this.logger.error(`reverse complement seq failed`);
      console.error(error);
    }
  }

  async getTranscribedBase({ base }: TranscribeBaseDto) {
    try {
      return await bioNode.getTranscribedBase(base);
    } catch (error) {
      this.logger.error(`get transcribed base failed`);
      console.error(error);
    }
  }

  async getTranslatedAA({ rnaCodon }: CodonAminoAcidDto) {
    try {
      return await bioNode.getTranslatedAA(rnaCodon);
    } catch (error) {
      this.logger.error(`get translated aa failed`);
      console.error(error);
    }
  }
  async removeIntrons({ seq, exonsRanges }: RemoveIntronsDto) {
    try {
      return await bioNode.removeIntrons(seq, exonsRanges);
    } catch (error) {
      this.logger.error(`remove introns failed`);
      console.error(error);
    }
  }
}
