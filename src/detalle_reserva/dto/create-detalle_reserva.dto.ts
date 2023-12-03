import { IsNotEmpty, IsBoolean, IsNumber, IsEnum, IsDate } from 'class-validator';
import { MesaEntity } from 'src/mesa/mesa.entity';
import { ReservaEntity } from 'src/reserva/reserva.entity';

export class CreateDetalleReserva {

  @IsNotEmpty({ message: 'El campo tipo_usuario no puede estar vacío' })
  @IsNumber({}, { message: 'El campo tipo_usuario debe ser un número' })
  costo_total: number;

  @IsNotEmpty({ message: 'El campo reservaId no puede estar vacío' })
  reserva: ReservaEntity;

  @IsNotEmpty({ message: 'El campo reservaId no puede estar vacío' })
  mesa: MesaEntity;

}