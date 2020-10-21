import React from 'react';
import { makeStyles, TextField } from '@material-ui/core';

type InputFieldProps = {
  label: string;
  placeholder?: string;
  name: string;
  type?: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

const useStyles = makeStyles({
  input: {
    marginBottom: 8,
    '& .MuiInputBase-input:-webkit-autofill': {
      WebkitBoxShadow: '0 0 0px 1000px white inset',
    },
  },
});

export const InputField = (props: InputFieldProps) => {
  const classes = useStyles();
  return (
    <div>
      <TextField
        label={props.label}
        className={classes.input}
        placeholder={props.placeholder}
        fullWidth
        type={props.type}
        name={props.name}
        onChange={props.onChange}
        margin="normal"
        InputLabelProps={{
          shrink: true,
        }}
      />
    </div>
  );
};
