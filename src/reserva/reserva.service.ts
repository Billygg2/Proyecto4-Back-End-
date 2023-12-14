/* eslint-disable prettier/prettier */
import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ReservaEntity } from './reserva.entity';
import { CreateReservaDto } from './dto/create-reserva.dto';
import { UpdateReservaDto } from './dto/update-reserva.dto';
import { MessageDto } from 'src/common/message.dto';
import { UsuarioEntity } from 'src/usuario/usuario.entity';

@Injectable()
export class ReservaService {
  constructor(
    @InjectRepository(ReservaEntity)
    private readonly reservaRepository: Repository<ReservaEntity>,
    @InjectRepository(UsuarioEntity)
    private readonly usuarioRepository: Repository<UsuarioEntity>,
  ) {}

  async getReservaList(): Promise<ReservaEntity[]> {
    const reservas = await this.reservaRepository.find();
    if (!reservas.length) {
      throw new NotFoundException('No existe un listado de reservas');
    }
    return reservas;
  }

  async createReserva(reserva: CreateReservaDto): Promise<any> {
    const { fecha_reserva } = reserva;
    const exists = await this.reservaRepository.findOne({
      where: [{ fecha_reserva: fecha_reserva }],
    });

    if (exists) {
      throw new BadRequestException(new MessageDto('Reserva ya registrado'));
    }
    const usuario_id = reserva.id_usuario;
    const user = await this.usuarioRepository.findOne({
      where: { id_usuario: usuario_id },
    });

    if (!user) {
      throw new BadRequestException('El usuario no existe');
    }

    const queryRunner =
      this.reservaRepository.manager.connection.createQueryRunner();

    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      const usuario = await this.usuarioRepository.findOne({
        where: { id_usuario: usuario_id },
      });

      if (!usuario || usuario.saldo < reserva.costo_total) {
        throw new Error('Saldo insuficiente');
      }

      usuario.saldo -= reserva.costo_total;
      await queryRunner.manager.save(usuario);

      const newReserva = this.reservaRepository.create(reserva);
      await queryRunner.manager.save(newReserva);

      await queryRunner.commitTransaction();
    } catch (err) {
      await queryRunner.rollbackTransaction();
    } finally {
      await queryRunner.release();
    }

    const nuevaReserva = new ReservaEntity();
    nuevaReserva.fecha_reserva = fecha_reserva;
    nuevaReserva.usuario = user;

    await this.reservaRepository.save(nuevaReserva);

    return 'Reserva creada exitosamente';
  }

  async getReservaById(id_reserva: number) {
    return await this.reservaRepository.findOne({
      where: {
        id_reserva,
      },
    });
  }

  async deleteReserva(id_reserva: number) {
    return this.reservaRepository.delete({ id_reserva });
  }

  async updateReserva(id_reserva: number, reserva: UpdateReservaDto) {
    this.reservaRepository.update({ id_reserva }, reserva);
  }
}
