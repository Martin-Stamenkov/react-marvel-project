import React, { useState } from 'react';
import Container from '@material-ui/core/Container';
import { Typography, makeStyles } from '@material-ui/core';
import marvel from 'assets/marvel.png';
import { auth } from 'authentication/auth/Auth';
import { history } from 'app/App';
import { InputField } from 'libs/components/input-field/input-field';
import { GenericButton } from 'libs/components/button/generic-button';

const useStyles = makeStyles({
  root: {
    minWidth: 200,
  },
  title: {
    fontSize: 16,
  },
  logo: {
    width: 265,
  },
  signInButton: {
    marginRight: '1rem',
    background: 'red',
    color: 'white',
    '&:hover': {
      background: 'red',
    },
  },
  signUpButton: {
    background: 'green',
    color: 'white',
    '&:hover': {
      background: 'green',
    },
  },
});

export const SignIn = () => {
  const [account, setAccount] = useState<any>({
    Email: '',
    Password: '',
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.stopPropagation();
    e.preventDefault();
    auth.login(account.Email, account.Password);
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setAccount({ ...account, [event.target.name]: value });
  };

  const classes = useStyles();
  return (
    <>
      <Container style={{ marginTop: '3%' }} maxWidth="sm">
        <img className={classes.logo} src={marvel} alt="MarvelLogo" />
        <Typography
          className={classes.title}
          color="textSecondary"
          gutterBottom
        >
          Sign In
        </Typography>
        <form onSubmit={handleSubmit}>
          <InputField
            label="Email"
            placeholder="Your Email"
            name="Email"
            onChange={handleChange}
          />
          <div style={{ marginTop: '1rem' }}>
            <InputField
              label="Password"
              type="password"
              placeholder="Your Password"
              name="Password"
              onChange={handleChange}
            />
          </div>
          <GenericButton
            className={classes.signInButton}
            type="submit"
            variant="contained"
            color="primary"
          >
            Sign In
          </GenericButton>
          <GenericButton
            className={classes.signUpButton}
            variant="contained"
            onClick={() => history.push('/signup')}
          >
            Sign Up
          </GenericButton>
        </form>
      </Container>
    </>
  );
};
