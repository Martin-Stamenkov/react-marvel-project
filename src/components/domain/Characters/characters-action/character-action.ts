import {
  IHero,
  ICharacters,
} from 'components/domain/characters/character-inferfaces/character-interfaces';
import { Requests } from 'api/requests';
import {
  SEARCH_CHARACTER_BY_NAME_REQUEST,
  SEARCH_CHARACTER_BY_NAME_SUCCESS,
  SEARCH_CHARACTER_BY_NAME_FAILURE,
  FETCH_ALL_CHARACTERS_REQUEST,
  FETCH_ALL_CHARACTERS_SUCCESS,
  FETCH_ALL_CHARACTERS_FAILURE,
  FETCH_CHARACTER_BY_ID_FAILURE,
  FETCH_CHARACTER_BY_ID_REQUEST,
  FETCH_CHARACTER_BY_ID_SUCCESS,
  INCREASE_CHARACTERS_OFFSET,
  SET_FAVORITE_CHARACTERS,
  REMOVE_FROM_FAVORITES,
  SET_FAVORITES_TO_NULL,
  SET_CHARACTERS_TO_NULL,
} from 'components/domain/characters/characters-types/characters-types';
import { publicKey, ts, hasher } from 'api/constants';

export const fetchAllCharactersRequest = () => {
  return {
    type: FETCH_ALL_CHARACTERS_REQUEST,
  };
};
export const fetchAllCharactersSuccess = (characters: ICharacters) => {
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
  return (dispatch: any) => {
    dispatch(fetchAllCharactersRequest());
    Requests.getAllCharacters(offset, publicKey, ts, hasher)
      .then((response) => {
        const heroes = response.data.data;
        dispatch(fetchAllCharactersSuccess(heroes));
        dispatch(updateCharactersOffset(response.data.data.offset));
      })
      .catch((error) => {
        console.log(error);
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

export const fetchCharacterByIdRequest = () => {
  return {
    type: FETCH_CHARACTER_BY_ID_REQUEST,
  };
};

export const fetchCharacterByIdSuccess = (character: IHero) => {
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
    console.log(dispatch);
    dispatch(fetchCharacterByIdRequest());
    Requests.getCharacterById(id, publicKey, ts, hasher)
      .then((response) => {
        fetchCharacterByIdSuccess(response.data.data.results[0]);
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

export const searchCharactersByName = (name: string) => {
  return (dispatch: any) => {
    dispatch(searchCharacterByNameRequest());
    Requests.searchCharacterByName(name, publicKey, ts, hasher)
      .then((response) => {
        dispatch(searchCharacterByNameSuccess(response.data));
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

export const setFavoriteCharacters = (characters: ICharacters) => {
  return {
    type: SET_FAVORITE_CHARACTERS,
    payload: characters,
  };
};
export const setFavoriteCharactersSuccess = () => {
  const favorites = JSON.parse(localStorage.getItem('favoriteChars') || '[]');
  return (dispatch: any) => {
    favorites.forEach((favoriteId: number) => {
      Requests.getCharacterById(favoriteId, publicKey, ts, hasher)
        .then((response) => {
          dispatch(setFavoriteCharacters(response.data.data.results));
        })
        .catch((error) => {
          console.log(error);
        });
    });
  };
};

export const removeFavoriteCharacters = (characterId: number) => {
  return {
    type: REMOVE_FROM_FAVORITES,
    payload: characterId,
  };
};
export const setFavoritesToNull = (characters: ICharacters) => {
  return {
    type: SET_FAVORITES_TO_NULL,
    payload: characters,
  };
};

export const updateCharactersOffset = (offset: number) => {
  return {
    type: INCREASE_CHARACTERS_OFFSET,
    payload: offset + 20,
  };
};
export const setCharactersToNull = (characters: ICharacters) => {
  return {
    type: SET_CHARACTERS_TO_NULL,
    payload: characters,
  };
};
