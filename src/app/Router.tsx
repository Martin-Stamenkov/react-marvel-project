import React from 'react';
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
import SearchedComics from 'components/domain/comics/comics-result/SearchedComics';
import { ComicsInfo } from 'components/domain/comics/comics-info/ComicsInfo';

const auth = new AuthContextProvider();
const handleAuthentications = ({ location }: any) => {
  if (/access_token|id_token|error/.test(location.hash)) {
    auth.handleAuthentication();
  }
};
function Routes() {
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
              <Redirect to="signin"></Redirect>
            )
          }
        />
        <Route
          path="/comics-by-title"
          render={() =>
            auth.isAuthenticated() ? (
              <SearchedComics />
            ) : (
              <Redirect to="signin"></Redirect>
            )
          }
        />
        <Route
          path="/my-comics"
          render={() =>
            auth.isAuthenticated() ? (
              <ComicsInfo />
            ) : (
              <Redirect to="signin"></Redirect>
            )
          }
        />
        <Route
          path="/home"
          render={() =>
            auth.isAuthenticated() ? (
              <Home />
            ) : (
              <Redirect to="signin"></Redirect>
            )
          }
        />
        <Route
          render={() =>
            auth.isAuthenticated() ? (
              <NotFoundPage />
            ) : (
              <Redirect to="signin"></Redirect>
            )
          }
        />
      </Switch>
    </>
  );
}
export default Routes;
