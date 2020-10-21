import { Requests } from 'api/requests';
import { publicKey, ts, hasher } from 'api/constants';
import {
  FETCH_ALL_COMICS_REQUEST,
  FETCH_ALL_COMICS_SUCCESS,
  FETCH_ALL_COMICS_FAILURE,
  FETCH_COMICS_BY_ID_REQUEST,
  FETCH_COMICS_BY_ID_SUCCESS,
  FETCH_COMICS_BY_ID_FAILURE,
  INCREASE_COMICS_OFFSET,
  SET_COMICS_TO_NULL,
} from '../comics-types/comics-types';
import { IComics } from '../comics-interfaces/comics-interfaces';

export const fetchAllComicsRequest = () => {
  return {
    type: FETCH_ALL_COMICS_REQUEST,
  };
};
export const fetchAllComicsSuccess = (comics: IComics) => {
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
export const fetchComicsByIdRequest = () => {
  return {
    type: FETCH_COMICS_BY_ID_REQUEST,
  };
};

export const fetchComicsByIdSuccess = (currentComics: IComics) => {
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
        console.log(response);
        return fetchComicsByIdSuccess(response.data.data.results[0]);
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
export const updateComicsOffset = (offset: number) => {
  return {
    type: INCREASE_COMICS_OFFSET,
    payload: offset + 20,
  };
};
export const setComicsToNull = (comics: IComics) => {
  return {
    type: SET_COMICS_TO_NULL,
    payload: comics,
  };
};
