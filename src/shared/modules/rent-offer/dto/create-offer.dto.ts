import { AccommodationType, City, Convenience } from '../../../types/rent-offer.js';

export class CreateOfferDto {
  public title: string;
  public description: string;
  public city: City;
  public previewImage: string;
  public images: string[];
  public isPremium: boolean;
  public isFavorite: boolean;
  public rating: number;
  public type: AccommodationType;
  public roomCount: number;
  public guestCount: number;
  public rentPrice: number;
  public conveniences: Convenience[];
  public userId: string;
  public coordinates: string;
}
