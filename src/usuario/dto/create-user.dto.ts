import { IsString, IsEmail, IsNotEmpty, MinLength, IsBoolean, IsNumber, MaxLength } from 'class-validator';

export class CreateUsuarioDto {
  @IsNotEmpty({ message: 'El campo nombres no puede estar vacío' })
  @IsString({ message: 'El campo nombres debe ser una cadena de texto' })
  nombres: string;

  @IsNotEmpty({ message: 'El campo apellidos no puede estar vacío' })
  @IsString({ message: 'El campo apellidos debe ser una cadena de texto' })
  apellidos: string;
  
  @IsNotEmpty({ message: 'El campo contraseña no puede estar vacío' })
  @MinLength(6, { message: 'La contraseña debe tener al menos 6 caracteres' })
  @MaxLength(6, { message: 'La contraseña debe tener al menos 6 caracteres' })
  contrasenia: string;

  @IsNotEmpty({ message: 'El campo correo no puede estar vacío' })
  @IsEmail({}, { message: 'El formato del correo electrónico no es válido' })
  correo: string;

  @IsNotEmpty({ message: 'El campo identificación no puede estar vacío' })
  @IsString({ message: 'El campo identificación debe ser una cadena de texto' })
  @MaxLength(12, { message: 'La cedula debe tener al menos 12 caracteres' })
  @MinLength(12, { message: 'La cedula debe tener al menos 12 caracteres' })
  identificacion: string;

  @IsNotEmpty({ message: 'El campo estado no puede estar vacío' })
  @IsBoolean({ message: 'El campo estado debe ser un valor booleano' })
  estado: boolean;

  @IsNotEmpty({ message: 'El campo tipo_usuario no puede estar vacío' })
  @IsNumber({}, { message: 'El campo tipo_usuario debe ser un número' })
  tipo_usuario: number;
}