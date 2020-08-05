import Faker from 'faker';
import { ItemModel } from '../types/types';

export const createItems = (numOfItems: number) => {
  const items: ItemModel[] = [];

  for (let i = 1; i <= numOfItems; i++) {
    items.push({
      id: i,
      avatar: Faker.image.avatar(),
      name: Faker.name.firstName(),
      description: Faker.lorem.lines(5),
    });
  }
  return items;
};
