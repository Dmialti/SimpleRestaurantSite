import { Module } from '@nestjs/common';
import { S3Controller } from './s3.controller';
import { S3Service } from './s3.service';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [ConfigModule, AuthModule],
  controllers: [S3Controller],
  providers: [S3Service],
})
export class S3Module {}
