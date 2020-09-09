export interface IAppState {
  error: string;
  loading: boolean | null;
  offset: number;
  character: object | null;
  characters: any;
  searchedCharacters: [] | null;
  searchedComics: [] | null;
  currentUser: {} | null;
  comics: [] | null;
  series: [] | null;
  events: [] | null;
  currentComics: object | null;
  currentSeries: object | null;
  event: object | null;
}
