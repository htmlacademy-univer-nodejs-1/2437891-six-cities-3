import { Expose } from 'class-transformer';
import { AccommodationType, City } from '../../../types/rent-offer.js';

export class OfferShortRdo {
  @Expose()
  public id: string;

  @Expose()
  public title: string;

  @Expose()
  public city: City;

  @Expose()
  public previewImage: string;

  @Expose()
  public isPremium: boolean;

  // TODO: add setter
  public isFavorite: boolean;

  @Expose()
  public rating: number;

  @Expose()
  public type: AccommodationType;

  @Expose()
  public rentPrice: number;
}
