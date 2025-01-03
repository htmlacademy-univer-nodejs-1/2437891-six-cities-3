import { ArrayMaxSize, ArrayMinSize, IsArray, IsBoolean, IsEnum, IsInt, IsMongoId, IsNumber, Length, Max, Min } from 'class-validator';
import { AccommodationType, City, Convenience } from '../../../types/rent-offer.js';

export class CreateOfferDto {
  @Length(10, 100)
  public title: string;

  @Length(20, 1024)
  public description: string;

  @IsEnum(City)
  public city: City;

  public previewImage: string;

  @IsArray()
  @ArrayMinSize(6)
  @ArrayMaxSize(6)
  public images: string[];

  @IsBoolean()
  public isPremium: boolean;

  @IsBoolean()
  public isFavorite: boolean;

  @IsNumber()
  @Min(1)
  @Max(5)
  public rating: number;

  @IsEnum(AccommodationType)
  public type: AccommodationType;

  @IsInt()
  @Min(1)
  @Max(8)
  public roomCount: number;

  @IsInt()
  @Min(1)
  @Max(10)
  public guestCount: number;

  @IsInt()
  @Min(100)
  @Max(100000)
  public rentPrice: number;

  @IsArray()
  @IsEnum(Convenience, {each: true})
  public conveniences: Convenience[];

  @IsMongoId()
  public userId: string;

  public coordinates: string;
}
