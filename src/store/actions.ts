import { ICharacters, ICard } from 'types/types';
import { history } from 'app/App';
import {
  FETCH_ALL_CHARACTERS_FAILURE,
  FETCH_ALL_CHARACTERS_REQUEST,
  FETCH_ALL_CHARACTERS_SUCCESS,
  FETCH_CHARACTER_BY_ID_REQUEST,
  FETCH_CHARACTER_BY_ID_SUCCESS,
  FETCH_CHARACTER_BY_ID_FAILURE,
  SEARCH_CHARACTER_BY_NAME_REQUEST,
  SEARCH_CHARACTER_BY_NAME_SUCCESS,
  SEARCH_CHARACTER_BY_NAME_FAILURE,
  GET_CURRENT_USER,
} from './types';
import { Requests } from '../api/requests';
import { publicKey, ts, hasher } from '../api/constants';

export const fetchAllCharactersRequest = () => {
  return {
    type: FETCH_ALL_CHARACTERS_REQUEST,
  };
};
export const fetchAllCharactersSuccess = (characters: any) => {
  return {
    type: FETCH_ALL_CHARACTERS_SUCCESS,
    payload: characters,
  };
};
export const fetchAllCharactersFailure = (error: string) => {
  return {
    type: FETCH_ALL_CHARACTERS_FAILURE,
    payload: error,
  };
};
export const fetchAllCharacters = (offset: number) => {
  // eslint-disable-next-line
  return (dispatch: any) => {
    dispatch(fetchAllCharactersRequest());
    Requests.getAllCharacters(offset, publicKey, ts, hasher)
      .then((response) => {
        //dispatch(increaseOffsetValue(response.data.data.offset));
        dispatch(fetchAllCharactersSuccess(response.data));
      })
      .catch((error) => {
        if (error.message) {
          dispatch(fetchAllCharactersFailure(error));
        } else {
          console.log(error);
        }
      });
  };
};
export const searchCharacterByNameRequest = () => {
  return {
    type: SEARCH_CHARACTER_BY_NAME_REQUEST,
  };
};
export const searchCharacterByNameSuccess = (characters: ICharacters) => {
  return {
    type: SEARCH_CHARACTER_BY_NAME_SUCCESS,
    payload: characters,
  };
};
export const searchCharacterByNameFailure = (error: string) => {
  return {
    type: SEARCH_CHARACTER_BY_NAME_FAILURE,
    payload: error,
  };
};

export const searchCharactersByName = (name: string) => {
  return (dispatch: any) => {
    dispatch(searchCharacterByNameRequest());
    Requests.searchCharacterByName(name, publicKey, ts, hasher)
      .then((response) => {
        dispatch(searchCharacterByNameSuccess(response.data));
        history.push('/characters-by-name');
      })
      .catch((error) => {
        if (error.message) {
          dispatch(searchCharacterByNameFailure(error));
        } else {
          console.log(error);
        }
      });
  };
};

export const fetchCharacterByIdRequest = () => {
  return {
    type: FETCH_CHARACTER_BY_ID_REQUEST,
  };
};

export const fetchCharacterByIdSuccess = (character: ICard) => {
  return {
    type: FETCH_CHARACTER_BY_ID_SUCCESS,
    payload: character,
  };
};

export const fetchCharacterByIdFailure = (error: string) => {
  return {
    type: FETCH_CHARACTER_BY_ID_FAILURE,
    payload: error,
  };
};

export const fetchCharacterById = (id: number) => {
  return (dispatch: any) => {
    dispatch(fetchCharacterByIdRequest());
    Requests.getCharacterById(id, publicKey, ts, hasher)
      .then((response) => {
        fetchCharacterByIdSuccess(response.data.data.results[0]);
        history.push('/details');
      })
      .catch((error) => {
        if (error.message) {
          dispatch(fetchCharacterByIdFailure(error));
        } else {
          console.log(error);
        }
      });
  };
};
const getCurrentUser = (user: any) => {
  return {
    type: GET_CURRENT_USER,
    payload: user,
  };
};

export const getUser = (user: any) => {
  return (dispatch: any) => {
    dispatch(getCurrentUser(user));
  };
};
