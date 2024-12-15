import { DocumentType } from '@typegoose/typegoose';
import { UserEntity } from './user.entity.js';
import { CreateUserDto } from './dto/create-user.dto.js';
import { OfferEntity } from '../rent-offer/rent-offer.entity.js';

export interface UserService {
  create(dto: CreateUserDto, salt: string): Promise<DocumentType<UserEntity>>;
  findByEmail(email: string): Promise<DocumentType<UserEntity> | null>;
  findFavoriteOffers(userId: string): Promise<DocumentType<OfferEntity>[]>;
  addOfferToFavorite(userId: string, offerId: string): Promise<void>;
  deleteOfferFromFavorite(userId: string, offerId: string): Promise<void>;
}
