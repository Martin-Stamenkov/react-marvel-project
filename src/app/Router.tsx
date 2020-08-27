import React from 'react';
import { Route, Redirect, Switch } from 'react-router';
import SignUp from 'pages/SignUp';
import SignIn from 'pages/SignIn';
import MainContent from 'components/layouts/MainContent';
import {
  FavoritesCharacters,
  CharacterCardSummary,
} from 'components/domain/Characters';
import { ProfilePage } from 'pages/Profile/profile-edit-mode/profile-edit-mode';
import { ProfileViewMode } from 'pages/Profile/profile-view-mode/profile-view-mode';
import { CharacterDetails } from 'components/domain/Characters/details/CharacterDetails';
import SearchedCharacters from 'components/domain/Characters/characters-result/SearchedCharacters';
import NotFoundPage from 'pages/Not-Found/not-found';
import AuthContextProvider from 'authentication/Auth';
import { Callback } from 'components/generic/callback/Callback';

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
              <CharacterDetails />
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
          path="*"
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
