import { IsEmail, IsEnum, IsString, Length } from 'class-validator';
import { UserType } from '../../../types/user.js';

export class CreateUserDto {

  @IsString()
  public avatarPath?: string;

  @IsString()
  @Length(1, 15)
  public name: string;

  @IsEmail()
  public email: string;

  @IsEnum(UserType)
  public type: UserType;

  @IsString()
  @Length(6, 12)
  public password: string;
}
