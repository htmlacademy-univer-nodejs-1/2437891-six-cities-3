import { Expose } from 'class-transformer';
import { AccommodationType, City, Convenience } from '../../../types/rent-offer.js';

export class OfferRdo {
  @Expose()
  public id: string;

  @Expose()
  public title: string;

  @Expose()
  public description: string;

  @Expose()
  public city: City;

  @Expose()
  public previewImage: string;

  @Expose()
  public images: string[];

  @Expose()
  public isPremium: boolean;

  // TODO: add setter
  public isFavorite: boolean;

  @Expose()
  public rating: number;

  @Expose()
  public type: AccommodationType;

  @Expose()
  public roomCount: number;

  @Expose()
  public guestCount: number;

  @Expose()
  public rentPrice: number;

  @Expose()
  public conveniences: Convenience[];

  @Expose()
  public authorId: string;

  @Expose()
  public coordinates: string;
}
