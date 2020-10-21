import Faker from 'faker';

export const createItems = (numOfItems: number) => {
  const items = [];

  for (let i = 1; i <= numOfItems; i++) {
    items.push({
      id: i,
      thumbnail: Faker.image.avatar(),
      name: Faker.name.firstName(),
      description: Faker.lorem.lines(5),
    });
  }
  return items;
};
