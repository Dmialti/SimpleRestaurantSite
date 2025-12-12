import {
  Controller,
  Post,
  UseGuards,
  Query,
  BadRequestException,
  Req,
} from '@nestjs/common';
import type { FastifyRequest } from 'fastify';
import { S3Service } from './s3.service';
import { AuthGuard } from '../auth/auth.guard';

@Controller('upload')
export class S3Controller {
  constructor(private readonly s3Service: S3Service) {}

  @Post()
  @UseGuards(AuthGuard)
  async uploadFile(
    @Req() req: FastifyRequest,
    @Query('folder') folder: string = 'misc',
  ) {
    const data = await req.file();

    if (!data) {
      throw new BadRequestException('File not provided');
    }

    const url = await this.s3Service.uploadFile(data, folder);

    return { url };
  }
}
