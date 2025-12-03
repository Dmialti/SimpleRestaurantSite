import {
  ConflictException,
  ForbiddenException,
  Injectable,
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AuthInput } from './dto/auth.input';
import { PrismaService } from 'src/prisma/prisma.service';
import * as bcrypt from 'bcrypt';
import { JwtPayload } from './types/jwtPayload.type';
import { CreateUserInput } from './dto/createUser.input';
import { PrismaClientKnownRequestError } from 'prisma/generated/prisma/internal/prismaNamespace';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
  ) {}

  async signUp(dto: CreateUserInput) {
    const hashedPassword = await bcrypt.hash(dto.password, 10);
    try {
      await this.prisma.user.create({
        data: { email: dto.email, password: hashedPassword, role: dto.role },
      });
    } catch (error) {
      if (
        error instanceof PrismaClientKnownRequestError &&
        error.code === 'P2002'
      ) {
        throw new ConflictException('User with this email already exists');
      }
      console.error('Registration error:', error);
      throw new InternalServerErrorException(
        'Error occured while creating new user',
      );
    }
  }

  async logIn(dto: AuthInput) {
    const user = await this.prisma.user.findUnique({
      where: { email: dto.email },
    });

    if (!user) throw new UnauthorizedException('Incorrect login or password');

    if (!(await bcrypt.compare(dto.password, user.password))) {
      throw new UnauthorizedException('Incorrect login or password');
    }

    const tokens = await this.generateTokens({
      email: user.email,
      role: user.role,
      sub: user.id,
    });

    await this.updateRefreshTokenHash(user.id, tokens.refreshToken);

    return tokens;
  }

  async logOut(userId: number) {
    await this.prisma.user.updateMany({
      where: { id: userId, hashedRefreshToken: { not: null } },
      data: { hashedRefreshToken: null },
    });
    return true;
  }

  async generateTokens(user: JwtPayload) {
    const payload: JwtPayload = user;

    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(payload, {
        secret: process.env.JWT_ACCESS_SECRET,
        expiresIn: '15m',
      }),
      this.jwtService.signAsync(payload, {
        secret: process.env.JWT_REFRESH_SECRET,
        expiresIn: '7d',
      }),
    ]);

    return { accessToken, refreshToken };
  }

  async refreshTokens(refreshToken: string) {
    if (!refreshToken)
      throw new UnauthorizedException('No refresh token provided');

    let payload: JwtPayload;
    try {
      payload = await this.jwtService.verifyAsync<JwtPayload>(refreshToken, {
        secret: process.env.JWT_REFRESH_SECRET,
      });
    } catch {
      throw new ForbiddenException('Refresh token invalid or expired');
    }

    const user = await this.prisma.user.findUnique({
      where: { id: payload.sub },
    });
    if (!user || !user.hashedRefreshToken)
      throw new ForbiddenException('Access Denied');

    const refreshTokenMatches = await bcrypt.compare(
      refreshToken,
      user.hashedRefreshToken,
    );
    if (!refreshTokenMatches) {
      await this.prisma.user.update({
        where: { id: payload.sub },
        data: { hashedRefreshToken: null },
      });
      throw new ForbiddenException('Access Denied');
    }

    const cleanToken: JwtPayload = {
      email: payload.email,
      role: payload.role,
      sub: payload.sub,
    };
    const newTokens = await this.generateTokens(cleanToken);

    await this.updateRefreshTokenHash(user.id, newTokens.refreshToken);

    return newTokens;
  }

  async updateRefreshTokenHash(userId: number, refreshToken: string) {
    const hash = await bcrypt.hash(refreshToken, 10);
    await this.prisma.user.update({
      where: { id: userId },
      data: { hashedRefreshToken: hash },
    });
  }
}
