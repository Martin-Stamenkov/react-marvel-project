export interface IComics {
  id: number;
  title: string;
  characters: {};
  creators: { items: [{ name: string; role: string }] };
  dates: [];
  description: string;
  thumbnail: { extension: string; path: string };
}
