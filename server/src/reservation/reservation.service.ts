import { Injectable } from '@nestjs/common';
import { CreateReservationInput } from './dto/create-reservation.input';
import { UpdateReservationStatusInput } from './dto/update-reservation-status.input';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class ReservationService {
  constructor(private prisma: PrismaService) {}

  async getAll() {
    return this.prisma.reservation.findMany();
  }

  async create(data: CreateReservationInput) {
    return this.prisma.reservation.create({ data: data });
  }

  async updateReservationStatus(data: UpdateReservationStatusInput) {
    return this.prisma.reservation.update({
      where: { id: data.id },
      data: { status: data.status },
    });
  }
}
