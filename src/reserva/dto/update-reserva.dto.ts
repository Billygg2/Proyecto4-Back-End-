import { IsNotEmpty, IsBoolean, IsNumber, IsEnum, IsDate } from 'class-validator';

export class UpdateReservaDto {
  @IsNotEmpty({ message: 'El campo fecha_reserva no puede estar vacío' })
  fecha_reserva?: Date;

  @IsNotEmpty({ message: 'El campo fecha_registro_reserva no puede estar vacío' })
  fecha_registro_reserva?: Date;

  @IsNotEmpty({ message: 'El campo estado no puede estar vacío' })
  @IsBoolean({ message: 'El campo estado debe ser un valor booleano' })
  estado?: boolean;
  
  @IsNotEmpty({ message: 'El campo tipo_usuario no puede estar vacío' })
  @IsNumber({}, { message: 'El campo tipo_usuario debe ser un número' })
  id_usuario?: number;

}