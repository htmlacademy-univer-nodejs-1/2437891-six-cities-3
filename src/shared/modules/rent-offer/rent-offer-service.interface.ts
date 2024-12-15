import { DocumentType } from '@typegoose/typegoose';
import { OfferEntity } from './rent-offer.entity.js';
import { CreateOfferDto } from './dto/create-offer.dto.js';
import { UpdateOfferDto } from './dto/update-offer.dto.js';
import { City } from '../../types/rent-offer.js';

export interface OfferService {
  create(dto: CreateOfferDto): Promise<DocumentType<OfferEntity>>;
  update(dto: UpdateOfferDto): Promise<DocumentType<OfferEntity> | null>;
  delete(id: string): Promise<void>;
  findById(offerId: string): Promise<DocumentType<OfferEntity> | null>;
  findAll(count: number): Promise<DocumentType<OfferEntity>[]>;
  findPremium(city: City): Promise<DocumentType<OfferEntity>[]>;
}
