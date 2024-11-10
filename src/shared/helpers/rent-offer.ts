import { AccommodationType, City, Convenience, RentOffer } from '../types/rent-offer.js';
import { User, UserType } from '../types/user.js';

export function createOffer(offerData: string): RentOffer {
  const [
    title,
    description,
    date,
    city,
    previewImage,
    images,
    isPremium,
    isFavorites,
    rating,
    type,
    roomsCount,
    guestsCount,
    rentPrice,
    conveniences,
    name,
    email,
    avatarPath,
    password,
    userType,
    commentsCount,
    coordinates
  ] = offerData.replace('\n', '').split('\t');

  const user = {
    name,
    email,
    avatarPath,
    password,
    userType: UserType[userType as 'Common' | 'Pro'],
  };

  return {
    title,
    description,
    date: new Date(date),
    city: city as City,
    previewImage,
    images: images.split(';'),
    isPremium: isPremium !== 'false',
    isFavorite: isFavorites !== 'false',
    rating: Number.parseInt(rating, 10),
    type: AccommodationType[type as 'Apartment' | 'House' | 'Room' | 'Hotel'],
    roomCount: Number.parseInt(roomsCount, 10),
    guestCount: Number.parseInt(guestsCount, 10),
    rentPrice: Number.parseInt(rentPrice, 10),
    conveniences: conveniences.split(';').map((c) => c as Convenience),
    author: user as User,
    commentCount: Number.parseInt(commentsCount, 10),
    coordinates
  };
}
