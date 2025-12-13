import {
  Injectable,
  ForbiddenException,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import * as bcrypt from 'bcrypt';
import { CreateUserInput } from './dto/createUser.input';
import { Role } from '../../prisma/generated/prisma/client';
import { UpdateUserInput } from './dto/updateUser.input';
import { User } from './entities/user.entity';

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}

  async getUsers() {
    return this.prisma.user.findMany({
      orderBy: { id: 'asc' },
    });
  }

  async getUserById(id: number) {
    const user = await this.prisma.user.findUnique({
      where: { id },
    });

    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }

    return user;
  }

  private canManageRole(currentUser: User, targetRole: string): boolean {
    if (currentUser.role === Role.SUPER_ADMIN) {
      return true;
    }

    if (currentUser.role === Role.ADMIN) {
      return targetRole === Role.MANAGER;
    }

    return false;
  }

  async create(input: CreateUserInput, currentUser: User) {
    const roleToCreate = input.role || Role.MANAGER;

    if (roleToCreate === 'SUPER_ADMIN') {
      throw new ForbiddenException(`You cannot create SUPER_ADMIN`);
    }

    if (!this.canManageRole(currentUser, roleToCreate)) {
      throw new ForbiddenException(
        `You do not have permission to create a user with role ${roleToCreate}`,
      );
    }

    const hashedPassword = await bcrypt.hash(input.password, 10);

    return this.prisma.user.create({
      data: { ...input, role: roleToCreate, password: hashedPassword },
    });
  }

  async update(id: number, input: UpdateUserInput, currentUser: User) {
    const targetUser = await this.prisma.user.findUnique({ where: { id } });
    if (!targetUser) throw new NotFoundException('User not found');

    if (targetUser.role === Role.SUPER_ADMIN) {
      throw new ForbiddenException('You cannot edit a Super Admin');
    }

    if (
      targetUser.role === Role.ADMIN &&
      currentUser.role !== Role.SUPER_ADMIN
    ) {
      throw new ForbiddenException('Only Super Admin can edit Admins');
    }

    if (input.role) {
      if (!this.canManageRole(currentUser, input.role)) {
        throw new ForbiddenException(
          `You cannot promote a user to ${input.role}`,
        );
      }
    }

    const { password, ...rest } = input;

    const hashedPassword = password
      ? await bcrypt.hash(password, 10)
      : undefined;

    return this.prisma.user.update({
      where: { id },
      data: {
        ...rest,
        ...(hashedPassword && { password: hashedPassword }),
      },
    });
  }

  async deleteUserById(id: number, currentUser: User) {
    const targetUser = await this.prisma.user.findUnique({ where: { id } });
    if (!targetUser) throw new NotFoundException('User not found');

    if (targetUser.role === Role.SUPER_ADMIN) {
      throw new ForbiddenException('SUPER_ADMIN cannot be deleted via API');
    }

    if (!this.canManageRole(currentUser, targetUser.role)) {
      throw new ForbiddenException(
        `You do not have permission to delete a user with role ${targetUser.role}`,
      );
    }

    return this.prisma.user.delete({ where: { id } });
  }

  async deleteUsers(ids: number[], currentUser: User) {
    const usersToDelete = await this.prisma.user.findMany({
      where: {
        id: { in: ids },
      },
    });

    if (usersToDelete.length === 0) {
      return { count: 0 };
    }

    for (const user of usersToDelete) {
      if (user.role === Role.SUPER_ADMIN) {
        throw new ForbiddenException(
          `Cannot delete user ${user.email} because they are a SUPER_ADMIN`,
        );
      }

      if (!this.canManageRole(currentUser, user.role)) {
        throw new ForbiddenException(
          `You do not have permission to delete user ${user.email} with role ${user.role}`,
        );
      }
    }

    return this.prisma.user.deleteMany({
      where: {
        id: { in: ids },
      },
    });
  }
}
