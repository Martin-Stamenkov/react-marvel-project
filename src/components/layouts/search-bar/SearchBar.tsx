import React, { useCallback, useState } from 'react';
import { TextField } from '@material-ui/core';

import { useDispatch } from 'react-redux';
import { searchCharactersByName } from 'store/actions';

export default function SearchBar({ data }: any) {
  const [values, setValues] = useState('');
  const dispatch = useDispatch();

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (values) {
      dispatch(searchCharactersByName(values));
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
      <form onSubmit={handleSubmit} style={{ marginTop: '3%', width: '50%' }}>
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
