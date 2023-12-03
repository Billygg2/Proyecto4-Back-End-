import { Controller, Get, Post, Body, Param, Delete, Put, Patch, UsePipes, ValidationPipe } from '@nestjs/common';
import { ReservaService } from './reserva.service';
import { CreateReservaDto } from './dto/create-reserva.dto';
import { UpdateReservaDto } from './dto/update-reserva.dto';
import { ReservaEntity } from './reserva.entity';
import { UsuarioEntity } from 'src/usuario/usuario.entity';

@Controller('reserva')
export class ReservaController {
  constructor(private readonly reservaService: ReservaService) { }

  @Get()
  async getReservaList(): Promise<ReservaEntity[]> {
    return this.reservaService.getReservaList();
  }

  @Post()
  @UsePipes(new ValidationPipe)
  createReserva(@Body() nuevaReserva: CreateReservaDto, @Body() us: UsuarioEntity): Promise<any> {
      return this.reservaService.createReserva(nuevaReserva, us)
  }

  @Get(':id')
  async getReservaById(@Param('id') id_reserva: number): Promise<ReservaEntity> {
    return this.reservaService.getReservaById(id_reserva);
  }

  @Delete(':id_reserva')
  deleteReserva(@Param('id_reserva') id: number) {
    return this.reservaService.deleteReserva(id)
  }

  @Patch(':id_reserva')
  @UsePipes(new ValidationPipe({ skipMissingProperties: true }))
  updateReserva(@Param('id_reserva') id: number, @Body() reserva: UpdateReservaDto) {
    return this.reservaService.updateReserva(id, reserva)
  }
}