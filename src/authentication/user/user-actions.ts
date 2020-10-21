import { GET_CURRENT_USER } from './user-types';

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
