import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AuthService } from './auth.service';
import { AuthResolver } from './auth.resolver';
import { AuthGuard } from './auth.guard';

@Module({
  imports: [JwtModule.register({})],
  providers: [AuthService, AuthResolver, AuthGuard],
  exports: [AuthService, AuthGuard],
})
export class AuthModule {}
