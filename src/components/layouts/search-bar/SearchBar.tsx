import React, { useCallback, useState, useEffect } from 'react';
import { TextField, Grid, FormControl } from '@material-ui/core';

import { useDispatch } from 'react-redux';
import { searchCharactersByName, searchComicsByTitle } from 'store/actions';

export default function SearchBar() {
  const [values, setValues] = useState('');
  const dispatch = useDispatch();

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (values) {
      // dispatch(searchCharacterByNameRequest());
      dispatch(searchCharactersByName(values));
      dispatch(searchComicsByTitle(values));
      setValues('');
    }
  };
  const handleChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      event.preventDefault();
      const { value } = event.target;
      setValues(value);
    },
    []
  );
  return (
    <>
      <form onSubmit={handleSubmit} style={{ width: '50%' }}>
        <TextField
          type="text"
          value={values}
          id="standard-basic"
          label="Filter by Name"
          color="secondary"
          fullWidth
          onChange={handleChange}
        />
      </form>
    </>
  );
}
