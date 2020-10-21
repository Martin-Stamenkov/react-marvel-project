export interface ICharacters {
  count: number;
  limit: number;
  offset: number;
  results: [];
  total: number;
}

export interface IHero {
  comics?: object;
  id: number;
  events?: object;
  resourceURI?: string;
  series?: object;
  stories?: object;
  thumbnail: {
    extension: string;
    path: string;
  };
  name: string;
  description: string;
  urls?: object;
}

export interface IDetails {
  id: number;
  thumbnail: {
    extension: string;
    path: string;
  };
  title: string;
  description: string;
  modified: string;
}
