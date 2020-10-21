import {
  FETCH_ALL_SERIES_FAILURE,
  FETCH_ALL_SERIES_REQUEST,
  FETCH_ALL_SERIES_SUCCESS,
  FETCH_SERIES_BY_ID_FAILURE,
  FETCH_SERIES_BY_ID_REQUEST,
  FETCH_SERIES_BY_ID_SUCCESS,
  INCREASE_SERIES_OFFSET,
  SET_SERIES_TO_NULL,
} from '../series-types/series-types';

const initialState = {
  loading: true,
  error: '',
  offset: 0,
  series: {} || null,
  currentSeries: null,
};
export const seriesReducer = (
  state = initialState,
  action: { type: string; payload: any }
) => {
  switch (action.type) {
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
    case INCREASE_SERIES_OFFSET:
      return {
        ...state,
        series: {
          ...state.series,
          offset: action.payload,
        },
      };
    case SET_SERIES_TO_NULL:
      return {
        ...state,
        series: null,
      };
    default:
      return state;
  }
};
