import { IsNotEmpty, IsBoolean, IsNumber, IsEnum, IsDate } from 'class-validator';

export class CreateReservaDto {
  @IsNotEmpty({ message: 'El campo fecha_reserva no puede estar vacío' })
  fecha_reserva: Date;

  @IsNotEmpty({ message: 'El campo fecha_registro_reserva no puede estar vacío' })
  fecha_registro_reserva: Date;

  @IsNotEmpty({ message: 'El campo estado no puede estar vacío' })
  @IsBoolean({ message: 'El campo estado debe ser un valor booleano' })
  estado: boolean;

  @IsNotEmpty({ message: 'El campo id_usuario no puede estar vacío' })
  @IsNumber({}, { message: 'El campo id_usuario debe ser un número' })
  id_usuario: number;

}