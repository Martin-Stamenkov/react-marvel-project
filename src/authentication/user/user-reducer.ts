import { GET_CURRENT_USER } from './user-types';

const initialState = {
  loading: true,
  error: '',
  offset: 0,
  currentUser: null,
};
export const userReducer = (
  state = initialState,
  action: { type: string; payload: any }
) => {
  switch (action.type) {
    case GET_CURRENT_USER:
      return {
        ...state,
        currentUser: action.payload,
      };
    default:
      return state;
  }
};
