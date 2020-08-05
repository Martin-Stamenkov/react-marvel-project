import {
  FETCH_ALL_CHARACTERS_SUCCESS,
  FETCH_ALL_CHARACTERS_FAILURE,
  FETCH_ALL_CHARACTERS_REQUEST,
  FETCH_CHARACTER_BY_ID_SUCCESS,
  FETCH_CHARACTER_BY_ID_FAILURE,
  FETCH_CHARACTER_BY_ID_REQUEST,
  INCREASE_OFFSET,
} from './types';
import { IAppState } from './store-interfaces';

const initialState: IAppState = {
  characters: null,
  loading: true,
  error: '',
  character: null,
  offset: 0,
};

export const rootReducer = (
  state = initialState,
  // eslint-disable-next-line
  action: { type: string; payload?: any }
): IAppState => {
  switch (action.type) {
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
    case FETCH_ALL_CHARACTERS_REQUEST:
      return {
        ...state,
        loading: true,
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
    case INCREASE_OFFSET:
      return {
        ...state,
        offset: action.payload,
      };
    default:
      return state;
  }
};
