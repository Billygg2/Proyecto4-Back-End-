import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ReservaEntity } from './reserva.entity';
import { CreateReservaDto } from './dto/create-reserva.dto';
import { UpdateReservaDto } from './dto/update-reserva.dto';
import { MessageDto } from 'src/common/message.dto';
import { UsuarioEntity } from 'src/usuario/usuario.entity';
import { CreateUsuarioDto } from 'src/usuario/dto/create-user.dto';

@Injectable()
export class ReservaService {
  constructor(
    @InjectRepository(ReservaEntity)
    private readonly reservaRepository: Repository<ReservaEntity>,
    @InjectRepository(UsuarioEntity)
    private readonly usuarioRepository: Repository<UsuarioEntity>,
  ) { }

  async getReservaList(): Promise<ReservaEntity[]> {
    const reservas = await this.reservaRepository.find();
    if (!reservas.length) {
      throw new NotFoundException('No existe un listado de reservas');
    }
    return reservas;
  }

  async createReserva(reserva: CreateReservaDto, us: UsuarioEntity): Promise<any> {
    const { fecha_reserva } = reserva;
    const exists = await this.reservaRepository.findOne({
      where: [{ fecha_reserva: fecha_reserva }],
    });
    if (exists)
      throw new BadRequestException(new MessageDto('Reserva ya registrado'));
      const { id_usuario } = us;
      const user = await this.usuarioRepository.findOne({
        where: { id_usuario: id_usuario },
      });
      
      if (!user) {
        throw new BadRequestException('El usuario no existe');
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
        id_reserva
      }
    })
  }

  async deleteReserva(id_reserva: number) {
    return this.reservaRepository.delete({ id_reserva })
  }

  async updateReserva(id_reserva: number, reserva: UpdateReservaDto) {
    this.reservaRepository.update({ id_reserva }, reserva)
  }
}