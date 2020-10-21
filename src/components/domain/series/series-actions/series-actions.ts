import { Requests } from 'api/requests';
import { publicKey, ts, hasher } from 'api/constants';
import {
  FETCH_ALL_SERIES_REQUEST,
  FETCH_ALL_SERIES_SUCCESS,
  FETCH_ALL_SERIES_FAILURE,
  FETCH_SERIES_BY_ID_REQUEST,
  FETCH_SERIES_BY_ID_SUCCESS,
  FETCH_SERIES_BY_ID_FAILURE,
  INCREASE_SERIES_OFFSET,
  SET_SERIES_TO_NULL,
} from '../series-types/series-types';

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
export const updateSeriesOffset = (offset: number) => {
  return {
    type: INCREASE_SERIES_OFFSET,
    payload: offset + 20,
  };
};
export const setSeriesToNull = (series: any) => {
  return {
    type: SET_SERIES_TO_NULL,
    payload: series,
  };
};
