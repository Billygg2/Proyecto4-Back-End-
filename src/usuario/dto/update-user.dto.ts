import { IsString, IsEmail, IsNotEmpty, MinLength, IsBoolean, IsNumber, MaxLength } from 'class-validator';

export class UpdateUsuarioDto {
    @IsString({ message: 'El campo nombres debe ser una cadena de texto' })
    nombres?: string;

    @IsString({ message: 'El campo apellidos debe ser una cadena de texto' })
    apellidos?: string;

    @MinLength(6, { message: 'La contraseña debe tener al menos 6 caracteres' })
    @MaxLength(6, { message: 'La contraseña debe tener al menos 6 caracteres' })
    contrasenia?: string;

    @IsEmail({}, { message: 'El formato del correo electrónico no es válido' })
    correo?: string;

    @MaxLength(12, { message: 'La cedula debe tener al menos 12 caracteres' })
    @MinLength(12, { message: 'La cedula debe tener al menos 12 caracteres' })
    @IsString({ message: 'El campo identificación debe ser una cadena de texto' })
    identificacion?: string;

    @IsBoolean({ message: 'El campo estado debe ser un valor booleano' })
    estado?: boolean;

    @IsNumber({}, { message: 'El campo tipo_usuario debe ser un número' })
    tipo_usuario?: number;
}