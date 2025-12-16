import 'dotenv/config';
import { defineConfig } from 'prisma/config';

const dbUrl =
  process.env.DATABASE_URL || 'postgresql://dummy:dummy@localhost:5432/dummy';

export default defineConfig({
  schema: 'prisma/schema',
  migrations: {
    path: 'prisma/migrations',
    seed: 'tsx prisma/seed.ts',
  },
  datasource: {
    url: dbUrl,
  },
});
