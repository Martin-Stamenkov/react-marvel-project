import React, { useState } from 'react';
import Container from '@material-ui/core/Container';
import { Typography, makeStyles } from '@material-ui/core';
import marvel from 'assets/marvel.png';
import { history } from 'app/App';
import { InputField } from 'libs/components/input-field/input-field';
import { auth } from 'authentication/auth/Auth';
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
    background: 'green',
    color: 'white',
    '&:hover': {
      background: 'green',
    },
  },
  signUpButton: {
    marginRight: '1rem',
    background: 'blue',
    color: 'white',
    '&:hover': {
      background: 'blue',
    },
  },
});

export const SignUp = () => {
  const classes = useStyles();
  const [account, setAccount] = useState<any>({
    Nickname: '',
    Email: '',
    Password: '',
  });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setAccount({ ...account, [event.target.name]: value });
  };

  const handleRegister = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    event.stopPropagation();
    auth.register(account.Email, account.Password, account.Nickname);
  };

  return (
    <>
      <Container style={{ marginTop: '3%' }} maxWidth="sm">
        <img className={classes.logo} src={marvel} alt="MarvelLogo" />
        <Typography
          className={classes.title}
          color="textSecondary"
          gutterBottom
        >
          Sign Up
        </Typography>
        <form onSubmit={handleRegister}>
          <InputField
            label="Nickname"
            placeholder="Nickname"
            name="Nickname"
            onChange={handleChange}
          />
          <div style={{ marginTop: '1rem' }}>
            <InputField
              label="Email"
              placeholder="Your Email"
              name="Email"
              onChange={handleChange}
            />
          </div>
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
            className={classes.signUpButton}
            type="submit"
            variant="contained"
          >
            Submit
          </GenericButton>
          <GenericButton
            className={classes.signInButton}
            variant="contained"
            onClick={() => history.push('/signin')}
          >
            Sign In
          </GenericButton>
        </form>
      </Container>
    </>
  );
};
