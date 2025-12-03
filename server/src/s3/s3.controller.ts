import {
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
  UseGuards,
  Query,
  BadRequestException,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { S3Service } from './s3.service';
import { AuthGuard } from '../auth/auth.guard';

@Controller('upload')
export class S3Controller {
  constructor(private readonly s3Service: S3Service) {}

  @Post()
  @UseGuards(AuthGuard)
  @UseInterceptors(FileInterceptor('file'))
  async uploadFile(
    @UploadedFile() file: Express.Multer.File,
    @Query('folder') folder: string = 'misc',
  ) {
    if (!file) throw new BadRequestException('File have not been provided');

    const allowedFolders = ['menu', 'posts', 'layout'];
    if (!allowedFolders.includes(folder)) {
      throw new BadRequestException('Incorrect folder');
    }

    const url = await this.s3Service.uploadFile(file, folder);

    return { url };
  }
}
