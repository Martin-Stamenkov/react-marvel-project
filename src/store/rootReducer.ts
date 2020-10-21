import { combineReducers } from 'redux';
import { userReducer } from '../authentication/user/user-reducer';
import { charactersReducer } from '../components/domain/characters/characters-reducers/characters-reducers';
import { comicsReducer } from '../components/domain/comics/comics-reducers/comics-reducers';
import { eventsReducer } from '../components/domain/events/events-reducers/events-reducers';
import { seriesReducer } from '../components/domain/series/series-reducers/series-reducers';

export const rootReducer = combineReducers({
  charactersReducer,
  comicsReducer,
  eventsReducer,
  seriesReducer,
  userReducer,
});
