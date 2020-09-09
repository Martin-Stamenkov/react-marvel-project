export interface IAppState {
  error: string;
  loading: boolean | null;
  offset: number;
  character: object | null;
  characters: any;
  searchedCharacters: [] | null;
  searchedComics: [] | null;
  currentUser: {} | null;
  comics: any;
  series: any;
  events: any;
  currentComics: object | null;
  currentSeries: object | null;
  event: object | null;
}
