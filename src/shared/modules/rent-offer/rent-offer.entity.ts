import { defaultClasses, getModelForClass, modelOptions, prop, Ref } from '@typegoose/typegoose';
import { AccommodationType, City, Convenience, RentOffer } from '../../types/rent-offer.js';
import dayjs from 'dayjs';
import { UserEntity } from '../user/user.entity.js';

// eslint-disable-next-line @typescript-eslint/no-unsafe-declaration-merging
export interface OfferEntity extends defaultClasses.Base {}

// TODO: actualize model
@modelOptions({
  schemaOptions: {
    collection: 'offers',
    timestamps: true,
  }
})

// eslint-disable-next-line @typescript-eslint/no-unsafe-declaration-merging
export class OfferEntity extends defaultClasses.TimeStamps {
  @prop({
    required: true,
    type: String,
    minlength: [10, 'Min length for name is 10'],
    maxlength: [100, 'Max length for name is 100'],})
  public title = '';

  @prop({
    required: true,
    type: String,
    minlength: [20, 'Min length for descripton is 10'],
    maxlength: [1024, 'Max length for description is 1024'],})
  public description = '';

  @prop({
    type: Date,
    required: true,
  })
  public date = dayjs().toDate();

  @prop({
    required: true,
    enum: City,
    type: String,
  })
  public city = '';

  @prop({
    type: String,
    required: true,
  })
  public previewImage = '';

  @prop({
    type: [String],
    required: true,
    validate: {
      validator: (v: string[]) => v.length === 6,
      message: 'Offer must have exactly 6 photos exclude preview'
    }
  })
  public images!: string[];

  @prop({
    type: Boolean,
    required: true,
  })
  public isPremium = false;

  @prop({
    type: Boolean,
    required: true,
  })
  public isFavorite = false;

  @prop({
    type: Number,
    required: true,
    min: 1,
    max: 5,
  })
  public rating!: number;

  @prop({
    type: String,
    enum: AccommodationType,
    required: true,
  })
  public type!: AccommodationType;

  @prop({
    type: Number,
    required: true,
    min: 1,
    max: 8,
  })
  public roomCount!: number;

  @prop({
    type: Number,
    required: true,
    min: 1,
    max: 10,
  })
  public guestCount!: number;

  @prop({
    type: Number,
    required: true,
    min: 100,
    max: 100000,
  })
  public rentPrice!: number;

  @prop({
    type: () => String,
    enum: Convenience,
    required: true,
  })
  public conveniences!: Convenience[];

  @prop({
    ref: UserEntity,
    required: true,
  })
  public userId!: Ref<UserEntity>;

  @prop({
    type: Number,
    required: true,
  })
  public commentsCount = 0;

  @prop({
    required: true,
    type: String,
  })
  public coordinates!: string;

  constructor(offerData: RentOffer) {
    super();
    this.title = offerData.title;
    this.description = offerData.description;
    this.date = offerData.date;
    this.city = offerData.city;
    this.previewImage = offerData.previewImage;
    this.images = offerData.images;
    this.isPremium = offerData.isPremium;
    this.isFavorite = offerData.isFavorite;
    this.rating = offerData.rating;
    this.type = offerData.type;
    this.roomCount = offerData.roomCount;
    this.guestCount = offerData.guestCount;
    this.rentPrice = offerData.rentPrice;
    this.conveniences = offerData.conveniences;
    this.coordinates = offerData.coordinates;
  }
}

export const OfferModel = getModelForClass(OfferEntity);
