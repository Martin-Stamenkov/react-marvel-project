import React from 'react';
import { Route, Redirect, Switch } from 'react-router';
import SignUp from 'pages/SignUp';
import SignIn from 'pages/SignIn';
import MainContent from 'components/layouts/MainContent';
import CharacterCardSummary from 'components/domain/Characters/CharacterCardSummary';
import { FavoritesCharacters } from 'components/domain/Characters/favourites-charachters/FavoritesCharacters';
import { ProfilePage } from 'pages/Profile/profile-edit-mode/profile-edit-mode';
import { ProfileViewMode } from 'pages/Profile/profile-view-mode/profile-view-mode';
import { useDispatch } from 'react-redux';
import { fetchAllCharactersRequest, fetchAllCharacters } from 'store/actions';
import { CharacterDetails } from 'components/domain/Characters/details/CharacterDetails';
import NotFoundPage from 'pages/Not-Found/not-found';

const isAuthenticated = true;

function Routes() {
  const dispatch = useDispatch();
  dispatch(fetchAllCharactersRequest());
  dispatch(fetchAllCharacters());

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
