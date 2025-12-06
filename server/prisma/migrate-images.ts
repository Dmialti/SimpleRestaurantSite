import 'dotenv/config';
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';
import * as fs from 'fs';
import * as path from 'path';
import * as mime from 'mime-types';
import { PrismaPg } from '@prisma/adapter-pg';
import { PrismaClient } from './generated/prisma/client';

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL! });

const prisma = new PrismaClient({ adapter });

const s3Client = new S3Client({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
  },
});

const BUCKET_NAME = process.env.AWS_BUCKET_NAME!;

const CLIENT_PUBLIC_DIR = path.join(__dirname, '../../client/public');

async function uploadToS3(localPath: string, s3Key: string): Promise<string> {
  const fullPath = path.join(CLIENT_PUBLIC_DIR, localPath);

  if (!fs.existsSync(fullPath)) {
    console.error(`❌ File not found: ${fullPath}`);
    return localPath;
  }

  const fileContent = fs.readFileSync(fullPath);
  const contentType = mime.lookup(fullPath) || 'application/octet-stream';

  const cleanKey = s3Key.startsWith('/') ? s3Key.substring(1) : s3Key;

  await s3Client.send(
    new PutObjectCommand({
      Bucket: BUCKET_NAME,
      Key: cleanKey,
      Body: fileContent,
      ContentType: contentType,
    }),
  );

  const region = process.env.AWS_REGION;
  const url = `https://${BUCKET_NAME}.s3.${region}.amazonaws.com/${cleanKey}`;

  console.log(`✅ Loaded: ${localPath} -> ${url}`);
  return url;
}

export async function migrateImages() {
  console.log('Img migration started.');

  const dishes = await prisma.dish.findMany();
  console.log(`Found ${dishes.length} dishes.`);

  for (const dish of dishes) {
    if (dish.imageSrc && !dish.imageSrc.startsWith('http')) {
      const newUrl = await uploadToS3(
        dish.imageSrc,
        `menu/${path.basename(dish.imageSrc)}`,
      );

      if (newUrl !== dish.imageSrc) {
        await prisma.dish.update({
          where: { id: dish.id },
          data: { imageSrc: newUrl },
        });
      }
    }
  }

  const articles = await prisma.article.findMany();
  console.log(`Found ${articles.length} articles.`);

  for (const article of articles) {
    if (article.imageSrc && !article.imageSrc.startsWith('http')) {
      const newUrl = await uploadToS3(
        article.imageSrc,
        `blog/${path.basename(article.imageSrc)}`,
      );

      if (newUrl !== article.imageSrc) {
        await prisma.article.update({
          where: { id: article.id },
          data: { imageSrc: newUrl },
        });
      }
    }
  }

  console.log('Migration finished successfully!');
}
