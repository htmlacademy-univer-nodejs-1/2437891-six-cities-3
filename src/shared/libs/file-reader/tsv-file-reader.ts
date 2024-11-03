import { AccommodationType, City, Convenience, RentOffer } from "../../types/rent-offer.js";
import { User } from "../../types/user.js";
import { FileReader } from "./file-reader.interface.js";
import { readFileSync } from 'node:fs';

export class TSVFileReader implements FileReader {
  private rawData = '';

  constructor(
    private readonly filename: string
  ) { }

  public read(): void {
    this.rawData = readFileSync(this.filename, { encoding: 'utf-8' });
  }

  public toArray(): RentOffer[] {
    if (!this.rawData) {
      throw new Error('File was not read');
    }

    return this.rawData
      .split('\n')
      .filter((row) => row.trim().length > 0)
      .map((line) => line.split('\t'))
      .map(([title, description, date, city, previewImage, images, isPremium, isFavorite,
        rating, type, roomCount, guestCount, rentPrice, conveniences, name, email, avatarPath, commentCount, coordinates]
      ) => ({
        title,
        description,
        date: new Date(date),
        city: city as City,
        previewImage,
        images: images.split(' '),
        isPremium: Boolean(isPremium),
        isFavorite: Boolean(isFavorite),
        rating: Number.parseInt(rating, 10),
        type: type as AccommodationType,
        roomCount: Number.parseInt(roomCount, 10),
        guestCount: Number.parseInt(guestCount, 10),
        rentPrice: Number.parseInt(rentPrice, 10),
        conveniences: conveniences.split(' ').map((convenience) => convenience as Convenience),
        author: { name, email, avatarPath } as User,
        commentCount: Number.parseInt(commentCount, 10),
        coordinates
      }));
  }
}