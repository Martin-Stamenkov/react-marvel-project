import React, { useCallback, useState } from 'react';
import { TextField } from '@material-ui/core';

import { useDispatch } from 'react-redux';
import { searchCharactersByName } from 'store/actions';

export default function SearchBar({ data }: any) {
  console.log(data);
  const [values, setValues] = useState('');
  const dispatch = useDispatch();
  console.log(values);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (values) {
      // dispatch(searchCharacterByNameRequest());
      const a = dispatch(searchCharactersByName(values));
      console.log(a);
      // dispatch(searchComicsByTitle(values));
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
