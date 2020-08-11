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
import { useDispatch } from 'react-redux';
import { fetchAllCharactersRequest, fetchAllCharacters } from 'store/actions';
import { CharacterDetails } from 'components/domain/Characters/details/CharacterDetails';
import SearchedCharacters from 'components/domain/Characters/characters-result/SearchedCharacters';
import NotFoundPage from 'pages/Not-Found/not-found';
import axios from 'axios';

const isAuthenticated = true;

function Routes() {
  if (isAuthenticated) {
    return (
      <Switch>
        {/* <Redirect from="/signup" to="/" />
        <Redirect from="/signin" to="/" /> */}
        <Route exact path="/" component={MainContent} />
        <Route exact path="/items" component={CharacterCardSummary} />
        <Route exact path="/favorites" component={FavoritesCharacters} />
        <Route exact path="/details" component={CharacterDetails} />
        <Route path="/edit-profile" component={ProfilePage} />
        <Route path="/profile" component={ProfileViewMode} />
        <Route path="/characters-by-name" component={SearchedCharacters} />
        <Route path="*" component={NotFoundPage} />
      </Switch>
    );
  }
  return (
    <Switch>
      <Route exact path="/signup" component={SignUp} />
      <Route exact path="/signin" component={SignIn} />
      <Redirect to="/signin" />
    </Switch>
  );
}
export default Routes;
