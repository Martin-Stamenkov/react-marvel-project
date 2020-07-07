import React from 'react';
import { Route, Redirect, Switch } from 'react-router';
import SignUp from 'pages/SignUp';
import SignIn from 'pages/SignIn';
import MainContent from 'components/layouts/MainContent';
import CharacterCardSummary from 'components/domain/Characters/CharacterCardSummary';
import FavoritesCharacters from 'components/domain/Characters/FavoritesCharacters';

const isAuthenticated = true;

function Routes() {
  if (!isAuthenticated) {
    return (
      <Switch>
        <Redirect from="/signup" to="/" />
        <Redirect from="/signin" to="/" />

        <Route exact path="/" component={MainContent} />
        <Route exact path="/items" component={CharacterCardSummary} />
        <Route exact path="/favorites" component={FavoritesCharacters} />
        {/* <Route path="/:username" component={UserProfile} /> */}
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
