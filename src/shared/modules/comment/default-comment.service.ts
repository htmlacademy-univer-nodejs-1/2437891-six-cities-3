import { inject, injectable } from 'inversify';
import { CommentService } from './comment-service.interface.js';
import { Component } from '../../types/component.enum.js';
import { CommentEntity } from './comment.entity.js';
import { DocumentType, types } from '@typegoose/typegoose';
import { CreateCommentDto } from './dto/create-comment.dto.js';
import { OfferEntity } from '../rent-offer/rent-offer.entity.js';

@injectable()
export class DefaultCommentService implements CommentService {
  constructor(
    @inject(Component.CommentModel) private readonly commentModel: types.ModelType<CommentEntity>,
    @inject(Component.RentOfferModel) private readonly offerModel: types.ModelType<OfferEntity>
  ) {}

  public async create(dto: CreateCommentDto): Promise<DocumentType<CommentEntity>> {
    const comment = await this.commentModel.create(dto);
    await this.offerModel.updateOne(
      {_id: comment.offerId},
      {
        $inc: {commentsCount: 1, rating: dto.rating},
        $mul: {rating: 0.5}
      }
    ).exec();
    return comment.populate('userId');
  }

  public async findByOfferId(offerId: string): Promise<DocumentType<CommentEntity>[]> {
    return this.commentModel
      .find({offerId})
      .populate('userId');
  }
}
