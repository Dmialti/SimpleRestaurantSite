import { Module } from '@nestjs/common';
import { UserResolver } from './user.resolver';
import { UserService } from './user.service';
import { AuthModule } from '../auth/auth.module';
import { registerUserEnums } from './utils/user-enum.register';

registerUserEnums();

@Module({
  imports: [AuthModule],
  providers: [UserResolver, UserService],
  exports: [UserService],
})
export class UserModule {}
