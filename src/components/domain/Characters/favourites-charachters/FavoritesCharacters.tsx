import React from 'react';
import { TextField } from '@material-ui/core';

export const FavoritesCharacters = () => {
  return (
    <form noValidate autoComplete="off">
      <TextField id="standard-basic" label="Standard" />
      {console.log('hi')}
    </form>
  );
};
