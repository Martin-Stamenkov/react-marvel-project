/* eslint-disable import/no-cycle */
/* eslint-disable @typescript-eslint/indent */
/* eslint-disable no-nested-ternary */
import React, { useCallback, useState } from 'react';
import { InputAdornment, makeStyles, TextField } from '@material-ui/core';
import { history } from 'app/App';
import SearchIcon from '@material-ui/icons/Search';

const useStyles = makeStyles({
  input: {
    marginBottom: 0,
    '& .MuiInputBase-input:-webkit-autofill': {
      WebkitBoxShadow: '0 0 0px 1000px white inset',
    },
  },
});

export default function SearchBar() {
  const classes = useStyles();
  const [values, setValues] = useState('');
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (values && values.length > 2) {
      history.push(`/characters-by-name/${values}`);
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
      <form
        onSubmit={handleSubmit}
        style={{ marginTop: '3%', marginBottom: '3%', width: '50%' }}
      >
        <TextField
          className={classes.input}
          type="text"
          value={values}
          id="standard-basic"
          label={
            values.length === 0
              ? 'Search heroes by name'
              : values.length > 0 && values.length < 3
              ? 'Please input at lest 3 characters'
              : 'Try to search!!!'
          }
          color="secondary"
          fullWidth
          onChange={handleChange}
          InputProps={{
            endAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
        />
      </form>
    </>
  );
}
