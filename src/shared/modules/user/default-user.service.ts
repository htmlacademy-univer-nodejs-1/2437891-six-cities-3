import { inject, injectable } from 'inversify';
import { UserService } from './user-service.interface.js';
import { Component } from '../../types/component.enum.js';
import { DocumentType, types } from '@typegoose/typegoose';
import { UserEntity } from './user.entity.js';
import { Logger } from '../../libs/logger/logger.interface.js';
import { CreateUserDto } from './dto/create-user.dto.js';
import { OfferEntity } from '../rent-offer/rent-offer.entity.js';

@injectable()
export class DefaultUserService implements UserService {
  constructor(
    @inject(Component.Logger) private readonly logger: Logger,
    @inject(Component.UserModel) private readonly userModel: types.ModelType<UserEntity>,
    @inject(Component.RentOfferModel) private readonly offerModel: types.ModelType<OfferEntity>
  ) {}

  public async findFavoriteOffers(userId: string): Promise<DocumentType<OfferEntity>[]> {
    const user = await this.userModel
      .findById(userId)
      .populate('favoriteOffers')
      .exec();
    const offers = user?.favoriteOffers;

    if (!offers) {
      return [];
    }

    return await this.offerModel
      .find({_id: { $in: offers }})
      .populate('author')
      .exec();
  }

  public async addOfferToFavorite(userId: string, offerId: string): Promise<void> {
    await this.userModel.updateOne(
      {_id: userId},
      { $addToSet: { favoriteOffers: offerId } }
    ).exec();
  }

  public async deleteOfferFromFavorite(userId: string, offerId: string): Promise<void> {
    await this.userModel.updateOne(
      {_id: userId},
      { $pull: { favoriteOffers: offerId } }
    ).exec();
  }

  public async create(dto: CreateUserDto, salt: string): Promise<DocumentType<UserEntity>> {
    const user = new UserEntity(dto);
    user.setPassword(dto.password, salt);

    const result = await this.userModel.create(user);
    this.logger.info(`New user created: ${user.email}`);

    return result;
  }

  public async findByEmail(email: string): Promise<DocumentType<UserEntity> | null> {
    return this.userModel.findOne({email});
  }
}
