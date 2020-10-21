import {
  FETCH_ALL_CHARACTERS_FAILURE,
  FETCH_ALL_CHARACTERS_REQUEST,
  FETCH_ALL_CHARACTERS_SUCCESS,
  FETCH_CHARACTER_BY_ID_FAILURE,
  FETCH_CHARACTER_BY_ID_REQUEST,
  FETCH_CHARACTER_BY_ID_SUCCESS,
  INCREASE_CHARACTERS_OFFSET,
  REMOVE_FROM_FAVORITES,
  SEARCH_CHARACTER_BY_NAME_FAILURE,
  SEARCH_CHARACTER_BY_NAME_REQUEST,
  SEARCH_CHARACTER_BY_NAME_SUCCESS,
  SET_CHARACTERS_TO_NULL,
  SET_FAVORITE_CHARACTERS,
} from '../characters-types/characters-types';

const initialState = {
  characters: {} || null,
  loading: true,
  error: '',
  character: null,
  offset: 0,
  searchedCharacters: null,
  favoriteCharacters: [],
};
export const charactersReducer = (
  state = initialState,
  action: { type: string; payload: any }
) => {
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
    case INCREASE_CHARACTERS_OFFSET:
      return {
        ...state,
        characters: {
          ...state.characters,
          offset: action.payload,
        },
      };
    case REMOVE_FROM_FAVORITES:
      return {
        ...state,
        favoriteCharacters: state.favoriteCharacters?.filter(
          (character: any) => action.payload !== character.id
        ),
      };
    case SET_FAVORITE_CHARACTERS:
      return {
        ...state,
        favoriteCharacters: state.favoriteCharacters
          ?.concat(action.payload)
          .filter(
            (character: any | never, i: number, arr: never[]) =>
              arr.findIndex((x: any) => x.id === character.id) === i
          ),
      };
    case SET_CHARACTERS_TO_NULL:
      return {
        ...state,
        characters: null,
      };
    default:
      return state;
  }
};
