import {
  FETCH_ALL_EVENTS_FAILURE,
  FETCH_ALL_EVENTS_REQUEST,
  FETCH_ALL_EVENTS_SUCCESS,
  FETCH_EVENT_BY_ID_FAILURE,
  FETCH_EVENT_BY_ID_REQUEST,
  FETCH_EVENT_BY_ID_SUCCESS,
  INCREASE_EVENTS_OFFSET,
  SET_EVENTS_TO_NULL,
} from '../events-types/events-types';

const initialState = {
  loading: true,
  error: '',
  offset: 0,
  events: {} || null,
  event: null,
};
export const eventsReducer = (
  state = initialState,
  action: { type: string; payload: any }
) => {
  switch (action.type) {
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
    case INCREASE_EVENTS_OFFSET:
      return {
        ...state,
        events: {
          ...state.events,
          offset: action.payload,
        },
      };
    case SET_EVENTS_TO_NULL:
      return {
        ...state,
        events: null,
      };
    default:
      return state;
  }
};
