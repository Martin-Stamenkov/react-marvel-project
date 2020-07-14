import { ItemModel } from '../types/ItemModel';
import Faker from 'faker';

export const createItems = (numOfItems: number) => {
  const items: any = [];

  for (let i = 1; i <= numOfItems; i++) {
    items.push({
      id: i,
      avatar: Faker.image.avatar(),
      name: Faker.name.firstName(),
      content: Faker.lorem.lines(5),
    });
  }
  return items;
};
