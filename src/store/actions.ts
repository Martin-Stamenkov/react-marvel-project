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
  FETCH_ALL_COMICS_REQUEST,
  FETCH_ALL_COMICS_SUCCESS,
  FETCH_ALL_COMICS_FAILURE,
  SEARCH_COMICS_BY_TITLE_REQUEST,
  SEARCH_COMICS_BY_TITLE_SUCCESS,
  SEARCH_COMICS_BY_TITLE_FAILURE,
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
  SET_ITEMS_TO_NULL,
  INCREASE_CHARACTERS_OFFSET,
  INCREASE_COMICS_OFFSET,
  INCREASE_SERIES_OFFSET,
  INCREASE_EVENTS_OFFSET,
  SET_FAVORITE_CHARACTERS,
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
export const fetchAllComicsRequest = () => {
  return {
    type: FETCH_ALL_COMICS_REQUEST,
  };
};
export const fetchAllComicsSuccess = (comics: any) => {
  return {
    type: FETCH_ALL_COMICS_SUCCESS,
    payload: comics,
  };
};
export const fetchAllComicsFailure = (error: string) => {
  return {
    type: FETCH_ALL_COMICS_FAILURE,
    payload: error,
  };
};
export const fetchAllComics = (offset: number) => {
  return (dispatch: any) => {
    dispatch(fetchAllComicsRequest());
    Requests.getAllComics(offset, publicKey, ts, hasher)
      .then((response) => {
        dispatch(fetchAllComicsSuccess(response.data.data));
        dispatch(updateComicsOffset(response.data.data.offset));
      })
      .catch((error) => {
        console.log(error);
        if (error.message) {
          dispatch(fetchAllComicsFailure(error));
        } else {
          console.log(error);
        }
      });
  };
};
export const fetchAllSeriesRequest = () => {
  return {
    type: FETCH_ALL_SERIES_REQUEST,
  };
};
export const fetchAllSeriesSuccess = (series: any) => {
  return {
    type: FETCH_ALL_SERIES_SUCCESS,
    payload: series,
  };
};
export const fetchAllSeriesFailure = (error: string) => {
  return {
    type: FETCH_ALL_SERIES_FAILURE,
    payload: error,
  };
};
export const fetchAllSeries = (offset: number) => {
  return (dispatch: any) => {
    dispatch(fetchAllSeriesRequest());
    Requests.getAllSeries(offset, publicKey, ts, hasher)
      .then((response) => {
        dispatch(fetchAllSeriesSuccess(response.data.data));
        dispatch(updateSeriesOffset(response.data.data.offset));
      })
      .catch((error) => {
        console.log(error);
        if (error.message) {
          dispatch(fetchAllSeriesFailure(error));
        } else {
          console.log(error);
        }
      });
  };
};
export const fetchAllEventsRequest = () => {
  return {
    type: FETCH_ALL_EVENTS_REQUEST,
  };
};
export const fetchAllEventsSuccess = (Events: any) => {
  return {
    type: FETCH_ALL_EVENTS_SUCCESS,
    payload: Events,
  };
};
export const fetchAllEventsFailure = (error: string) => {
  return {
    type: FETCH_ALL_EVENTS_FAILURE,
    payload: error,
  };
};
export const fetchAllEvents = (offset: number) => {
  return (dispatch: any) => {
    dispatch(fetchAllEventsRequest());
    Requests.getAllEvents(offset, publicKey, ts, hasher)
      .then((response) => {
        dispatch(fetchAllEventsSuccess(response.data.data));
        dispatch(updateEventsOffset(response.data.data.offset));
      })
      .catch((error) => {
        console.log(error);
        if (error.message) {
          dispatch(fetchAllEventsFailure(error));
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
export const searchComicsByTitleRequest = () => {
  return {
    type: SEARCH_COMICS_BY_TITLE_REQUEST,
  };
};
export const searchComicsByTitleSuccess = (comics: any) => {
  return {
    type: SEARCH_COMICS_BY_TITLE_SUCCESS,
    payload: comics,
  };
};
export const searchComicsByTitleFailure = (error: string) => {
  return {
    type: SEARCH_COMICS_BY_TITLE_FAILURE,
    payload: error,
  };
};
export const searchComicsByTitle = (title: string) => {
  return (dispatch: any) => {
    dispatch(searchComicsByTitleRequest());
    Requests.searchComicsByTitle(title, publicKey, ts, hasher)
      .then((response) => {
        dispatch(searchComicsByTitleSuccess(response.data));
        history.push('/comics-by-title');
      })
      .catch((error) => {
        if (error.message) {
          dispatch(searchComicsByTitleFailure(error));
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
export const fetchComicsByIdRequest = () => {
  return {
    type: FETCH_COMICS_BY_ID_REQUEST,
  };
};

export const fetchComicsByIdSuccess = (currentComics: any) => {
  return {
    type: FETCH_COMICS_BY_ID_SUCCESS,
    payload: currentComics,
  };
};

export const fetchComicsByIdFailure = (error: string) => {
  return {
    type: FETCH_COMICS_BY_ID_FAILURE,
    payload: error,
  };
};

export const fetchComicsById = (id: number) => {
  return (dispatch: any) => {
    dispatch(fetchComicsByIdRequest());
    Requests.getComicsById(id, publicKey, ts, hasher)
      .then((response) => {
        fetchComicsByIdSuccess(response.data.data.results[0]);
      })
      .catch((error) => {
        if (error.message) {
          dispatch(fetchComicsByIdFailure(error));
        } else {
          console.log(error);
        }
      });
  };
};
export const fetchSeriesByIdRequest = () => {
  return {
    type: FETCH_SERIES_BY_ID_REQUEST,
  };
};

export const fetchSeriesByIdSuccess = (currentSeries: any) => {
  return {
    type: FETCH_SERIES_BY_ID_SUCCESS,
    payload: currentSeries,
  };
};

export const fetchSeriesByIdFailure = (error: string) => {
  return {
    type: FETCH_SERIES_BY_ID_FAILURE,
    payload: error,
  };
};

export const fetchSeriesById = (id: number) => {
  return (dispatch: any) => {
    dispatch(fetchSeriesByIdRequest());
    Requests.getSeriesById(id, publicKey, ts, hasher)
      .then((response) => {
        fetchSeriesByIdSuccess(response.data.data.results[0]);
      })
      .catch((error) => {
        if (error.message) {
          dispatch(fetchSeriesByIdFailure(error));
        } else {
          console.log(error);
        }
      });
  };
};
export const fetchEventByIdRequest = () => {
  return {
    type: FETCH_EVENT_BY_ID_REQUEST,
  };
};

export const fetchEventByIdSuccess = (event: any) => {
  return {
    type: FETCH_EVENT_BY_ID_SUCCESS,
    payload: event,
  };
};

export const fetchEventByIdFailure = (error: string) => {
  return {
    type: FETCH_EVENT_BY_ID_FAILURE,
    payload: error,
  };
};

export const fetchEventById = (id: number) => {
  return (dispatch: any) => {
    dispatch(fetchEventByIdRequest());
    Requests.getEventById(id, publicKey, ts, hasher)
      .then((response) => {
        fetchEventByIdSuccess(response.data.data.results[0]);
      })
      .catch((error) => {
        if (error.message) {
          dispatch(fetchEventByIdFailure(error));
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

export const updateCharactersOffset = (offset: number) => {
  return {
    type: INCREASE_CHARACTERS_OFFSET,
    payload: offset + 20,
  };
};
export const updateComicsOffset = (offset: number) => {
  return {
    type: INCREASE_COMICS_OFFSET,
    payload: offset + 20,
  };
};

export const updateSeriesOffset = (offset: number) => {
  return {
    type: INCREASE_SERIES_OFFSET,
    payload: offset + 20,
  };
};
export const updateEventsOffset = (offset: number) => {
  return {
    type: INCREASE_EVENTS_OFFSET,
    payload: offset + 20,
  };
};
export const setToNull = (items: any) => {
  return {
    type: SET_ITEMS_TO_NULL,
    payload: items,
  };
};
export const setFavoriteCharacters = (characters: any) => {
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
