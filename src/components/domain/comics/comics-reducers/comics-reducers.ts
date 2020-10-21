import {
  FETCH_ALL_COMICS_FAILURE,
  FETCH_ALL_COMICS_REQUEST,
  FETCH_ALL_COMICS_SUCCESS,
  FETCH_COMICS_BY_ID_FAILURE,
  FETCH_COMICS_BY_ID_REQUEST,
  FETCH_COMICS_BY_ID_SUCCESS,
  INCREASE_COMICS_OFFSET,
  SET_COMICS_TO_NULL,
} from '../comics-types/comics-types';

const initialState = {
  loading: true,
  error: '',
  offset: 0,
  comics: {} || null,
  currentComics: null,
};
export const comicsReducer = (
  state = initialState,
  action: { type: string; payload: any }
) => {
  switch (action.type) {
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
    case INCREASE_COMICS_OFFSET:
      return {
        ...state,
        comics: {
          ...state.comics,
          offset: action.payload,
        },
      };
    case SET_COMICS_TO_NULL:
      return {
        ...state,
        comics: null,
      };
    default:
      return state;
  }
};
