import { inject, injectable } from 'inversify';
import { OfferService } from './rent-offer-service.interface.js';
import { Component } from '../../types/component.enum.js';
import { DocumentType, types } from '@typegoose/typegoose';
import { OfferEntity } from './rent-offer.entity.js';
import { Logger } from '../../libs/logger/logger.interface.js';
import { CreateOfferDto } from './dto/create-offer.dto.js';
import { City } from '../../types/rent-offer.js';
import { UpdateOfferDto } from './dto/update-offer.dto.js';
import { SortType } from '../../types/sort-type.enum.js';

@injectable()
export class DefaultOfferService implements OfferService {
  constructor(
    @inject(Component.Logger) private readonly logger: Logger,
    @inject(Component.RentOfferModel) private readonly offerModel: types.ModelType<OfferEntity>
  ) {}

  public async exists(documentId: string): Promise<boolean> {
    const offer = await this.offerModel.findById(documentId).exec();
    return offer !== null;
  }

  public async update(dto: UpdateOfferDto): Promise<DocumentType<OfferEntity> | null> {
    return this.offerModel.findByIdAndUpdate(dto.id, dto, {new: true}).exec();
  }

  public async delete(id: string): Promise<void> {
    await this.offerModel.findByIdAndDelete(id).exec();
    this.logger.info(`Offer ${id} deleted`);
  }

  public async findAll(count: number): Promise<DocumentType<OfferEntity>[]> {
    return this.offerModel
      .find()
      .sort({date: SortType.Down})
      .populate('author')
      .limit(count)
      .exec();
  }

  public async findPremium(city: City): Promise<DocumentType<OfferEntity>[]> {
    return this.offerModel
      .find({city, isPremium: true})
      .limit(3)
      .exec();
  }

  public async create(dto: CreateOfferDto): Promise<DocumentType<OfferEntity>> {
    const result = await this.offerModel.create(dto);
    this.logger.info(`New offer created: ${dto.title}`);
    return result;
  }

  public async findById(offerId: string): Promise<DocumentType<OfferEntity> | null> {
    return this.offerModel.findById(offerId).exec();
  }

  public async incCommentCount(offerId: string): Promise<void> {
    await this.offerModel.updateOne({id: offerId}, {$inc: {commentsCount: 1}}).exec();
  }
}
