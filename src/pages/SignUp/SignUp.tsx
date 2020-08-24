import React, { useState, useContext } from 'react';
import Container from '@material-ui/core/Container';
import {
  Typography,
  makeStyles,
  Card,
  CardContent,
  Button,
  TextField,
} from '@material-ui/core';
import marvel from '../marvel.png';
import { history } from 'app/App';
import AuthContextProvider from 'authentication/Auth';

const auth = new AuthContextProvider();

const useStyles = makeStyles({
  root: {
    marginTop: 100,
    minWidth: 200,
    minHeight: 450,
  },
  title: {
    fontSize: 16,
  },
  logo: {
    width: 265,
  },
});

const SignUp = () => {
  const classes = useStyles();
  const [account, setAccount] = useState<any>({
    Email: '',
    Password: '',
    RepeatPassword: '',
  });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setAccount({ ...account, [event.target.name]: value });
  };

  console.log(account);

  const handleRegister = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    e.stopPropagation();
    // let hasError = false;
    // const errorArray: string[] = [];
    auth.register(account.Email, account.Password, account.Username);
    // setLoading(true);
    console.log(account);
    // setLoading(false);
    // history.replace('/items');
  };

  return (
    <Container maxWidth="sm">
      <Card className={classes.root}>
        <CardContent>
          <img className={classes.logo} src={marvel} alt="MarvelLogo" />
          <Typography
            className={classes.title}
            color="textSecondary"
            gutterBottom
          >
            Sign Up
          </Typography>
          <form onSubmit={handleRegister}>
            <TextField
              label="Email"
              style={{ margin: 8 }}
              placeholder="Your Email"
              fullWidth
              name="Email"
              margin="normal"
              value={account.Email}
              onChange={handleChange}
              InputLabelProps={{
                shrink: true,
              }}
            />
            <div style={{ marginTop: '2rem' }}>
              <TextField
                label="Password"
                type="password"
                style={{ margin: 8 }}
                placeholder="Your Password"
                fullWidth
                name="Password"
                margin="normal"
                value={account.Password}
                onChange={handleChange}
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </div>
            <div style={{ marginTop: '2rem' }}>
              <TextField
                label="Repeat Password"
                type="password"
                style={{ margin: 8 }}
                placeholder="Repeat Password"
                fullWidth
                margin="normal"
                name="RepeatPassword"
                value={account.RepeatPassword}
                onChange={handleChange}
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </div>
            <Button
              style={{ margin: '1rem', background: 'red', color: 'white' }}
              variant="contained"
              color="primary"
            >
              Sign Up
            </Button>
            <Button
              style={{ background: 'green', color: 'white' }}
              variant="contained"
              href="/signin"
            >
              Sign In
            </Button>
            <Button
              style={{ margin: '1rem', background: 'blue', color: 'white' }}
              type="submit"
              variant="contained"
            >
              Submit
            </Button>
          </form>
        </CardContent>
      </Card>
    </Container>
  );
};
export default SignUp;
