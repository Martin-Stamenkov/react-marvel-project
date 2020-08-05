import React, { useEffect } from 'react';
import { TextField } from '@material-ui/core';

export const FavoritesCharacters = () => {
  return (
    <>
      <TextField
        id="standard-basic"
        label="Filter by Name or Description"
        fullWidth
        color="secondary"
      />
    </>
  );
};
