import {
  IsEmail,
  IsString,
  MaxLength,
  MinLength,
  IsNumber,
  Matches,
  Length,
  IsNotEmpty,
  IsEmpty,
} from 'class-validator';

export class UserRegisterDTO {
  @IsString({ message: 'El nombre debe ser una cadena de texto' })
  @MinLength(3, { message: 'El nombre debe tener al menos 3 caracteres' })
  @MaxLength(80, { message: 'El nombre debe tener como máximo 50 caracteres' })
  name: string;

  @IsNotEmpty()
  @IsEmail(undefined, { message: 'El correo electrónico no es válido' })
  email: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(8, { message: 'La contraseña debe tener al menos 8 caracteres' })
  @MaxLength(15, {
    message: 'La contraseña debe tener como máximo 20 caracteres',
  })
  @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*]).+$/, {
    message:
      'La contraseña debe tener al menos una letra minúscula, una mayúscula, un número y un carácter especial (!@#$%^&*).',
  })
  password: string;

  @Length(3, 80, {
    message:
      'La dirección debe tener una longitud mínima de 3 caracteres y no superar los 80 caracteres.',
  })
  address: string;

  @IsNotEmpty()
  @IsNumber({}, { message: 'El teléfono debe ser un número' })
  phone: number;

  @IsNotEmpty()
  @MinLength(5, { message: 'El país debe tener al menos 2 caracteres' })
  @MaxLength(20, { message: 'El país debe tener como máximo 20 caracteres' })
  @IsString({ message: 'El país debe ser una cadena de texto' })
  country: string;

  @IsNotEmpty()
  @MinLength(5, { message: 'La ciudad debe tener al menos 2 caracteres' })
  @MaxLength(20, { message: 'La ciudad debe tener como máximo 20 caracteres' })
  @IsString({ message: 'La ciudad debe ser una cadena de texto' })
  city: string;

  @IsEmpty()
  isAdmin: null;
}

export class UserLoginDTO {
  @IsNotEmpty()
  @IsEmail(undefined, { message: 'El correo electrónico no es válido' })
  email: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(8, { message: 'La contraseña debe tener al menos 8 caracteres' })
  @MaxLength(15, {
    message: 'La contraseña debe tener como máximo 20 caracteres',
  })
  @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*]).+$/, {
    message:
      'La contraseña debe tener al menos una letra minúscula, una mayúscula, un número y un carácter especial (!@#$%^&*).',
  })
  password: string;
}
