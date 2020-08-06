import React, { useCallback, useState } from 'react';
import { TextField, Grid } from '@material-ui/core';

export default function SearchBar() {
  const [values, setValues] = useState('');

  const handleSubmit = () => {};

  const handleChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      event.preventDefault();
      const { value } = event.target;
      setValues(value);
    },
    []
  );
  console.log(values);
  return (
    <>
      <form onSubmit={handleSubmit}>
        <TextField
          style={{ width: '60%' }}
          id="standard-basic"
          label="Filter by Name or Description"
          color="secondary"
          fullWidth
          onChange={handleChange}
        />
      </form>
    </>
  );
}
