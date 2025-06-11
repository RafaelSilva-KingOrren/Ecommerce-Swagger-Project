import { IsEmail, IsString, MaxLength, MinLength } from 'class-validator';

export class authDTO {
  @IsEmail(undefined, { message: 'El correo electrónico no es válido' })
  email: string;

  @IsString()
  @MinLength(6, { message: 'La contraseña debe tener al menos 6 caracteres' })
  password: string;
}
