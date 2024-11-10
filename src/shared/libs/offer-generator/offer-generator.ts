import dayjs from 'dayjs';
import { generateRandomValue, getRandomItem, getRandomItems } from '../../helpers/common.js';
import { MockServerData } from '../../types/mock-server-data.type.js';
import { OfferGenerator } from './offer-generator.interface.js';
import { AccommodationType } from '../../types/rent-offer.js';

export class TSVOfferGenerator implements OfferGenerator {
  constructor(private readonly mockData: MockServerData) { }

  public generate(): string {
    const title = getRandomItem<string>(this.mockData.titles);
    const description = getRandomItem<string>(this.mockData.descriptions);
    const city = getRandomItem<string>(this.mockData.cities);
    const previewImage = getRandomItem<string>(this.mockData.previewImages);
    const images = getRandomItems(this.mockData.images);
    const conveniences = getRandomItem<string>(this.mockData.conveniences);
    const author = getRandomItem<string>(this.mockData.users);
    const coordinates = getRandomItem<string>(this.mockData.coordinates);
    const isPremium = generateRandomValue(0, 1);
    const isFavorite = generateRandomValue(0, 1);
    const rating = generateRandomValue(1, 5);
    const type = getRandomItem([AccommodationType.Apartment, AccommodationType.Hotel,
      AccommodationType.House, AccommodationType.Room]);
    const roomCount = generateRandomValue(1, 8);
    const guestCount = generateRandomValue(1, 10);
    const rentPrice = generateRandomValue(100, 100000);
    const commentsCount = generateRandomValue(1, 10);
    const date = dayjs()
      .subtract(generateRandomValue(1, 7), 'day')
      .toISOString();

    const [name, email, password, userType, avatar] = author.split(' ');

    return [
      title, description, date, city,
      previewImage, images, isPremium, isFavorite, rating, type,
      roomCount, guestCount, rentPrice, conveniences,
      name, email, password, userType, avatar, commentsCount, coordinates
    ].join('\t');
  }
}
