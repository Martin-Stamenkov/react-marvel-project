import React, { useEffect } from 'react';
import { Route, Redirect, Switch } from 'react-router';
import SignUp from 'pages/SignUp';
import SignIn from 'pages/SignIn';
import {
  FavoritesCharacters,
  CharacterCardSummary,
} from 'components/domain/characters';
import { ProfilePage } from 'pages/Profile/profile-edit-mode/profile-edit-mode';
import { Home } from 'pages/home/Home';
import { ProfileViewMode } from 'pages/Profile/profile-view-mode/profile-view-mode';
import DetailsSummary from 'components/domain/details/details-summary/DetailsSummary';
import SearchedCharacters from 'components/domain/characters/characters-result/SearchedCharacters';
import NotFoundPage from 'pages/Not-Found/not-found';
import AuthContextProvider from 'authentication/Auth';
import { Callback } from 'components/generic/callback/Callback';
import { ComicsSummary } from 'components/domain/comics/comics-summary/ComicsSummary';
import { SeriesCardSummary } from 'components/domain/series/series-card-summary/SeriesCardSummary';
import { EventsCardSummary } from 'components/domain/events/events-summary/EventsCardSummary';
import SearchedComics from 'components/domain/comics/comics-result/SearchedComics';
import { ComicsInfo } from 'components/domain/comics/comics-info/ComicsInfo';
import { SeriesInfo } from 'components/domain/series/series-info/SeriesInfo';
import { EventsInfo } from 'components/domain/events/events-info/EventsInfo';
import { getUser } from 'store/actions';
import { useDispatch } from 'react-redux';

const auth = new AuthContextProvider();
const handleAuthentications = ({ location }: any) => {
  if (/access_token|id_token|error/.test(location.hash)) {
    auth.handleAuthentication();
  }
};
function Routes() {
  const dispatch = useDispatch();

  useEffect(() => {
    if (localStorage.getItem('access_token')) {
      auth.auth0.client.userInfo(
        localStorage.getItem('access_token') || '',
        (err: any, user: any) => {
          dispatch(getUser(user));
        }
      );
    }
  }, []);
  return (
    <>
      <Switch>
        <Route
          path="/callback"
          render={(props): any => {
            handleAuthentications(props);
            return <Callback />;
          }}
        />
        <Route
          exact
          path="/signup"
          render={() =>
            !auth.isAuthenticated() ? <SignUp /> : <Redirect to="/items" />
          }
        />
        <Route
          exact
          path="/signin"
          render={() =>
            !auth.isAuthenticated() ? <SignIn /> : <Redirect to="/items" />
          }
        />
        <Route
          exact
          path="/comics"
          render={() =>
            auth.isAuthenticated() ? (
              <ComicsSummary />
            ) : (
              <Redirect to="/signin" />
            )
          }
        />
        <Route
          exact
          path="/items"
          render={() =>
            auth.isAuthenticated() ? (
              <CharacterCardSummary />
            ) : (
              <Redirect to="signin" />
            )
          }
        />
        <Route
          exact
          path="/events"
          render={() =>
            auth.isAuthenticated() ? (
              <EventsCardSummary />
            ) : (
              <Redirect to="signin" />
            )
          }
        />
        <Route
          exact
          path="/event"
          render={() =>
            auth.isAuthenticated() ? <EventsInfo /> : <Redirect to="signin" />
          }
        />
        <Route
          exact
          path="/series"
          render={() =>
            auth.isAuthenticated() ? (
              <SeriesCardSummary />
            ) : (
              <Redirect to="signin" />
            )
          }
        />
        <Route
          exact
          path="/serie"
          render={() =>
            auth.isAuthenticated() ? <SeriesInfo /> : <Redirect to="signin" />
          }
        />
        <Route
          exact
          path="/event"
          render={() =>
            auth.isAuthenticated() ? <EventsInfo /> : <Redirect to="signin" />
          }
        />
        <Route
          exact
          path="/favorites"
          render={() =>
            auth.isAuthenticated() ? (
              <FavoritesCharacters />
            ) : (
              <Redirect to="signin" />
            )
          }
        />
        <Route
          exact
          path="/details"
          render={() =>
            auth.isAuthenticated() ? (
              <DetailsSummary />
            ) : (
              <Redirect to="signin" />
            )
          }
        />
        <Route
          path="/edit-profile"
          render={() =>
            auth.isAuthenticated() ? <ProfilePage /> : <Redirect to="signin" />
          }
        />
        <Route
          path="/profile"
          render={() =>
            auth.isAuthenticated() ? (
              <ProfileViewMode />
            ) : (
              <Redirect to="signin" />
            )
          }
        />
        <Route
          path="/characters-by-name"
          render={() =>
            auth.isAuthenticated() ? (
              <SearchedCharacters />
            ) : (
              <Redirect to="signin" />
            )
          }
        />
        <Route
          path="/comics-by-title"
          render={() =>
            auth.isAuthenticated() ? (
              <SearchedComics />
            ) : (
              <Redirect to="signin" />
            )
          }
        />
        <Route
          path="/my-comics"
          render={() =>
            auth.isAuthenticated() ? <ComicsInfo /> : <Redirect to="signin" />
          }
        />
        <Route
          path="/home"
          render={() =>
            auth.isAuthenticated() ? <Home /> : <Redirect to="signin" />
          }
        />
        <Route
          render={() =>
            auth.isAuthenticated() ? <NotFoundPage /> : <Redirect to="signin" />
          }
        />
      </Switch>
    </>
  );
}
export default Routes;
