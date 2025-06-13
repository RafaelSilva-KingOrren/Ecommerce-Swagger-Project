import { IsEmail, IsString, MaxLength, MinLength, IsNumber } from 'class-validator';
import { Transform } from 'class-transformer';

export class UserRegisterDTO {
  id?: string;
  @IsString({ message: 'El nombre debe ser una cadena de texto' })
  @MinLength(3, { message: 'El nombre debe tener al menos 3 caracteres' })
  @MaxLength(50, { message: 'El nombre debe tener como máximo 50 caracteres' })
  name: string;

  @IsEmail(undefined, { message: 'El correo electrónico no es válido' })
  email: string;

  @IsString()
  @MinLength(6, { message: 'La contraseña debe tener al menos 6 caracteres' })
  password: string;

  @IsString({ message: 'La dirección debe ser una cadena de texto' })
  address: string;

  @IsString({ message: 'El teléfono debe ser una cadena de texto' })
  phone: number;

  @IsString({ message: 'El país debe ser una cadena de texto' })
  country: string;

  @IsString({ message: 'La ciudad debe ser una cadena de texto' })
  city: string;
}
