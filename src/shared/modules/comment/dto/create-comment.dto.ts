import { IsMongoId, IsNumber, IsString, Length, Max, Min } from 'class-validator';

export class CreateCommentDto {
  @IsString()
  @Length(5, 1024)
  public text: string;

  @IsNumber()
  @Min(1)
  @Max(5)
  public rating: number;

  @IsMongoId()
  public offerId: string;

  @IsMongoId()
  public userId: string;
}
