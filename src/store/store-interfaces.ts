export interface IAppState {
  error: string;
  loading: boolean | null;
  offset: number | undefined;
  character: object | null;
  characters: [] | null;
}