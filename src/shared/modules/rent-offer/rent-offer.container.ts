import { Container } from 'inversify';
import { OfferService } from './rent-offer-service.interface.js';
import { types } from '@typegoose/typegoose';
import { OfferEntity, OfferModel } from './rent-offer.entity.js';
import { Component } from '../../types/component.enum.js';
import { DefaultOfferService } from './default-rent-offer.service.js';
import { Controller } from '../../libs/rest/controller/controller.interface.js';
import { OfferController } from './rent-offer.controller.js';

export function createOfferContainer() {
  const offerContainer = new Container();

  offerContainer.bind<OfferService>(Component.RentOfferService)
    .to(DefaultOfferService)
    .inSingletonScope();

  offerContainer.bind<types.ModelType<OfferEntity>>(Component.RentOfferModel)
    .toConstantValue(OfferModel);

  offerContainer.bind<Controller>(Component.OfferController)
    .to(OfferController)
    .inSingletonScope();

  return offerContainer;
}
