import { Requests } from 'api/requests';
import { publicKey, ts, hasher } from 'api/constants';
import {
  FETCH_ALL_EVENTS_REQUEST,
  FETCH_ALL_EVENTS_SUCCESS,
  FETCH_ALL_EVENTS_FAILURE,
  FETCH_EVENT_BY_ID_FAILURE,
  FETCH_EVENT_BY_ID_REQUEST,
  FETCH_EVENT_BY_ID_SUCCESS,
  INCREASE_EVENTS_OFFSET,
  SET_EVENTS_TO_NULL,
} from '../events-types/events-types';

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

export const updateEventsOffset = (offset: number) => {
  return {
    type: INCREASE_EVENTS_OFFSET,
    payload: offset + 20,
  };
};
export const setEventsToNull = (offset: number) => {
  return {
    type: SET_EVENTS_TO_NULL,
    payload: offset + 20,
  };
};
