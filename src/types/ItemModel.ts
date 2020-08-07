export type ItemModel = {
  id: number;
  name: string;
  description: string;
  thumbnail: { path: string; extension: string };
  addToFavorites?: boolean;
  details?: string;
};
