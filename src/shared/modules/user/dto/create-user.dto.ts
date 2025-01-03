import { UserType } from '../../../types/user.js';

export class CreateUserDto {
  public avatarPath?: string;
  public name: string;
  public email: string;
  public type: UserType;
  public password: string;
}
