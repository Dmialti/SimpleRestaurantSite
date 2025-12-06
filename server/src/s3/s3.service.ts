import { Injectable } from '@nestjs/common';
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class S3Service {
  private s3Client: S3Client;
  private bucketName: string;
  private region: string;
  constructor(private configService: ConfigService) {
    this.bucketName = this.configService.getOrThrow('AWS_BUCKET_NAME');
    this.region = this.configService.getOrThrow('AWS_REGION');

    this.s3Client = new S3Client({
      region: this.region,
      credentials: {
        accessKeyId: this.configService.getOrThrow('AWS_ACCESS_KEY_ID'),
        secretAccessKey: this.configService.getOrThrow('AWS_SECRET_ACCESS_KEY'),
      },
    });
  }

  async uploadFile(file: Express.Multer.File, path: string) {
    const uniqueKey = `${path}/${Date.now()}-${file.originalname.replace(/\s/g, '-')}`;

    await this.s3Client.send(
      new PutObjectCommand({
        Bucket: this.bucketName,
        Key: uniqueKey,
        Body: file.buffer,
        ContentType: file.mimetype,
        CacheControl: 'public, max-age=31536000, immutable',
      }),
    );

    return `https://${this.bucketName}.s3.${this.region}.amazonaws.com/${uniqueKey}`;
  }
}
