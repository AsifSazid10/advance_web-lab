
import {
  IsEmail,
  Matches,
  IsNotEmpty,
  MinLength,
  IsIn,
  IsNumberString,
  IsMimeType,
  IsOptional,
} from 'class-validator';

export class CreateOperatorDto {
  @IsEmail({}, { message: 'Invalid email format' })
  @Matches(/^[a-zA-Z0-9._%+-]+@aiub\.edu$/, {
    message: 'Email must be an aiub.edu address',
  })
  email: string;

  @IsNotEmpty({ message: 'Password is required' })
  @MinLength(6, { message: 'Password must be at least 6 characters long' })
  @Matches(/[A-Z]/, {
    message: 'Password must contain at least one uppercase letter',
  })
  password: string;

  @IsIn(['male', 'female'], {
    message: 'Gender must be either male or female',
  })
  gender: string;

    @IsOptional()
    @IsMimeType({ message: 'Profile Pic image must be a valid image file' })
    profileImage?: any;
  @IsNumberString({}, { message: 'Invalid Number' })
  phone: string;
}
