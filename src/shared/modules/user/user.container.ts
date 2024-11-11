import { Container } from 'inversify';
import { Component } from '../../types/component.enum.js';
import { DefaultUserService } from './default-user.service.js';
import { types } from '@typegoose/typegoose';
import { UserEntity, UserModel } from './user.entity.js';
import { UserService } from './user-service.interface.js';

export function createUserContainer() {
  const userContainer = new Container();
  userContainer.bind<UserService>(Component.UserService).to(DefaultUserService).inSingletonScope();
  userContainer.bind<types.ModelType<UserEntity>>(Component.UserModel).toConstantValue(UserModel);
  return userContainer;
}