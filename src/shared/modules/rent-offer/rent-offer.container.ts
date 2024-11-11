import { Container } from 'inversify';
import { OfferService } from './rent-offer-service.interface.js';
import { types } from '@typegoose/typegoose';
import { OfferEntity, OfferModel } from './rent-offer.entity.js';
import { Component } from '../../types/component.enum.js';
import { DefaultOfferService } from './default-rent-offer.service.js';

export function createOfferContainer() {
  const offerContainer = new Container();

  offerContainer.bind<OfferService>(Component.RentOfferService).to(DefaultOfferService);
  offerContainer.bind<types.ModelType<OfferEntity>>(Component.RentOfferModel).toConstantValue(OfferModel);

  return offerContainer;
}
