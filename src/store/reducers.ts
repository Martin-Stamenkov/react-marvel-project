import {
  FETCH_ALL_CHARACTERS_SUCCESS,
  FETCH_ALL_CHARACTERS_FAILURE,
  FETCH_ALL_CHARACTERS_REQUEST,
  FETCH_CHARACTER_BY_ID_SUCCESS,
  FETCH_CHARACTER_BY_ID_FAILURE,
  FETCH_CHARACTER_BY_ID_REQUEST,
  INCREASE_OFFSET,
  SEARCH_CHARACTER_BY_NAME_REQUEST,
  SEARCH_CHARACTER_BY_NAME_SUCCESS,
  SEARCH_CHARACTER_BY_NAME_FAILURE,
  GET_CURRENT_USER,
  FETCH_ALL_COMICS_REQUEST,
  FETCH_ALL_COMICS_SUCCESS,
  FETCH_ALL_COMICS_FAILURE,
  SEARCH_COMICS_BY_TITLE_FAILURE,
  SEARCH_COMICS_BY_TITLE_REQUEST,
  SEARCH_COMICS_BY_TITLE_SUCCESS,
  FETCH_COMICS_BY_ID_REQUEST,
  FETCH_COMICS_BY_ID_SUCCESS,
  FETCH_COMICS_BY_ID_FAILURE,
  FETCH_ALL_SERIES_REQUEST,
  FETCH_ALL_SERIES_SUCCESS,
  FETCH_ALL_SERIES_FAILURE,
  FETCH_SERIES_BY_ID_REQUEST,
  FETCH_SERIES_BY_ID_SUCCESS,
  FETCH_SERIES_BY_ID_FAILURE,
  FETCH_ALL_EVENTS_REQUEST,
  FETCH_ALL_EVENTS_SUCCESS,
  FETCH_ALL_EVENTS_FAILURE,
  FETCH_EVENT_BY_ID_REQUEST,
  FETCH_EVENT_BY_ID_SUCCESS,
  FETCH_EVENT_BY_ID_FAILURE,
} from './types';
import { IAppState } from './store-interfaces';

const initialState: IAppState = {
  characters: null,
  loading: true,
  error: '',
  character: null,
  offset: 0,
  searchedCharacters: null,
  currentUser: null,
  comics: null,
  searchedComics: null,
  currentComics: null,
  series: null,
  currentSeries: null,
  events: null,
  event: null,
};

export const rootReducer = (
  state = initialState,
  action: { type: string; payload?: any }
): IAppState => {
  switch (action.type) {
    case FETCH_ALL_CHARACTERS_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case FETCH_ALL_CHARACTERS_SUCCESS:
      return {
        ...state,
        characters: action.payload,
        loading: false,
      };
    case FETCH_ALL_CHARACTERS_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case FETCH_ALL_SERIES_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case FETCH_ALL_SERIES_SUCCESS:
      return {
        ...state,
        series: action.payload,
        loading: false,
      };
    case FETCH_ALL_SERIES_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case FETCH_ALL_COMICS_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case FETCH_ALL_COMICS_SUCCESS:
      return {
        ...state,
        comics: action.payload,
        loading: false,
      };
    case FETCH_ALL_COMICS_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case FETCH_ALL_EVENTS_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case FETCH_ALL_EVENTS_SUCCESS:
      return {
        ...state,
        events: action.payload,
        loading: false,
      };
    case FETCH_ALL_EVENTS_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case FETCH_CHARACTER_BY_ID_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case FETCH_CHARACTER_BY_ID_SUCCESS:
      return {
        ...state,
        character: action.payload,
        loading: false,
      };
    case FETCH_CHARACTER_BY_ID_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case FETCH_SERIES_BY_ID_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case FETCH_SERIES_BY_ID_SUCCESS:
      return {
        ...state,
        currentSeries: action.payload,
        loading: false,
      };
    case FETCH_SERIES_BY_ID_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case FETCH_EVENT_BY_ID_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case FETCH_EVENT_BY_ID_SUCCESS:
      return {
        ...state,
        event: action.payload,
        loading: false,
      };
    case FETCH_EVENT_BY_ID_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case FETCH_COMICS_BY_ID_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case FETCH_COMICS_BY_ID_SUCCESS:
      return {
        ...state,
        currentComics: action.payload,
        loading: false,
      };
    case FETCH_COMICS_BY_ID_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case SEARCH_CHARACTER_BY_NAME_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case SEARCH_CHARACTER_BY_NAME_SUCCESS:
      return {
        ...state,
        searchedCharacters: action.payload,
        loading: false,
      };
    case SEARCH_CHARACTER_BY_NAME_FAILURE:
      return {
        ...state,
        error: action.payload,
        loading: false,
      };
    case SEARCH_COMICS_BY_TITLE_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case SEARCH_COMICS_BY_TITLE_SUCCESS:
      return {
        ...state,
        searchedComics: action.payload,
        loading: false,
      };
    case SEARCH_COMICS_BY_TITLE_FAILURE:
      return {
        ...state,
        error: action.payload,
        loading: false,
      };

    case GET_CURRENT_USER:
      return {
        ...state,
        currentUser: action.payload,
      };
    default:
      return state;
  }
};
