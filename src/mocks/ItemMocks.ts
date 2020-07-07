import { ItemModel } from "../types/ItemModel";
import * as Faker from 'faker';

export const createItems = (numOfItems: number) => {
    const items: ItemModel[] = [];

    for (let i = 1; i <= numOfItems; i++) {
        items.push({
            id: i,
            name: Faker.name.firstName(),
            content: Faker.lorem.lines(10), 
        })
    }
    return items
} 