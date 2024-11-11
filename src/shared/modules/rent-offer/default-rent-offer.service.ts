import { inject, injectable } from 'inversify';
import { OfferService } from './rent-offer-service.interface.js';
import { Component } from '../../types/component.enum.js';
import { DocumentType, types } from '@typegoose/typegoose';
import { OfferEntity } from './rent-offer.entity.js';

@injectable()
export class DefaultOfferService implements OfferService {
  constructor(
    // @inject(Component.Logger) private readonly logger: Logger,
    @inject(Component.RentOfferModel) private readonly offerModel: types.ModelType<OfferEntity>
  ) {}

  // public async create(dto: CreateOfferDto): Promise<DocumentType<OfferEntity>> {
  //   const result = await this.offerModel.create(dto);
  //   this.logger.info(`New offer created: ${dto.name}`);

  //   return result;
  // }

  public async findById(offerId: string): Promise<DocumentType<OfferEntity> | null> {
    return this.offerModel.findById(offerId).exec();
  }
}