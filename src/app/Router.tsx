/* eslint-disable react/jsx-curly-newline */
/* eslint-disable import/no-cycle */
import React, { useEffect } from 'react';
import { Route, Redirect, Switch } from 'react-router-dom';
import { SignIn, SignUp, auth } from 'authentication';
import {
  FavoritesCharacters,
  CharacterCardSummary,
  SearchedCharacters,
} from 'components/domain/characters';
import { ComicsSummary, ComicsInfo } from 'components/domain/comics';
import { ProfileViewMode, NotFoundPage, Home } from 'pages';
import DetailsSummary from 'components/domain/characters/details/details-summary/DetailsSummary';
import { Callback } from 'components/generic/callback/Callback';
import { SeriesCardSummary, SeriesInfo } from 'components/domain/series';
import { EventsCardSummary, EventsInfo } from 'components/domain/events';
import { getUser } from 'authentication/user/user-actions';
import { useDispatch } from 'react-redux';

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
  }, [dispatch]);

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
          path="/signin"
          render={() =>
            !auth.isAuthenticated() ? <SignIn /> : <Redirect to="/items" />
          }
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
          path="/event/:id"
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
          path="/serie/:id"
          render={() =>
            auth.isAuthenticated() ? <SeriesInfo /> : <Redirect to="signin" />
          }
        />
        <Route
          exact
          path="/event/:id"
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
          path="/details/:id"
          render={() =>
            auth.isAuthenticated() ? (
              <DetailsSummary />
            ) : (
              <Redirect to="signin" />
            )
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
          path="/characters-by-name/:name"
          render={() =>
            auth.isAuthenticated() ? (
              <SearchedCharacters />
            ) : (
              <Redirect to="signin" />
            )
          }
        />
        <Route
          path="/my-comics/:id"
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
        <Route exact path="/">
          {auth.isAuthenticated() ? <Redirect to="/home" /> : <SignUp />}
        </Route>

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
