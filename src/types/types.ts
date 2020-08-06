export type ItemModel = {
  id: number;
  avatar: string;
  name: string;
  description?: string;
  thumbnail?: { path: string; extension: string };
  addToFavorites?: boolean;
  details?: string;
};

export interface ICharacters {
  count: number;
  limit: number;
  offset: number;
  results: [];
  total: number;
}

export interface ICard {
  comics: object;
  description: string;
  events: object;
  id: number;
  modified: string;
  name: string;
  resourceURI: string;
  series: object;
  stories: object;
  thumbnail: object;
  urls: object;
  addToFavorites?: boolean;
}
