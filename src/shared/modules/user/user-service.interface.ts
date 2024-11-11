import { DocumentType } from '@typegoose/typegoose';
import { UserEntity } from './user.entity.js';

// TODO: add other methods
export interface UserService {
  // create(dto: CreateUserDto, salt: string): Promise<DocumentType<UserEntity>>;
  findByEmail(email: string): Promise<DocumentType<UserEntity> | null>;
  // findOrCreate(dto: CreateUserDto, salt: string): Promise<DocumentType<UserEntity>>;
  // findById(userId: string): Promise<DocumentType<UserEntity> | null>;
}
