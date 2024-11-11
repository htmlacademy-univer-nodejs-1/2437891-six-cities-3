import { DocumentType } from '@typegoose/typegoose';
import { OfferEntity } from './rent-offer.entity.js';

// TODO: add 'create'
export interface OfferService {
  // create(dto: CreateOfferDto): Promise<DocumentType<OfferEntity>>;
  findById(offerId: string): Promise<DocumentType<OfferEntity> | null>;
}
