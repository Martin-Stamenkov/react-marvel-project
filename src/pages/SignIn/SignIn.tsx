import React, { useState } from 'react';
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
import AuthContextProvider from 'authentication/Auth';
import { history } from 'app/App';

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

const auth = new AuthContextProvider();

function SignIn() {
  const [account, setAccount] = useState<any>({
    Email: '',
    Password: '',
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.stopPropagation();
    e.preventDefault();
    auth.login(account.Email, account.Password);
    // setLoading(true);
    console.log(account);
    // setLoading(false);
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setAccount({ ...account, [event.target.name]: value });
  };

  console.log(account);

  const classes = useStyles();
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
            Sign In
          </Typography>
          <form onSubmit={handleSubmit}>
            <TextField
              label="Email"
              style={{ margin: 8 }}
              placeholder="Your Email"
              fullWidth
              name="Email"
              // value={account.Email}
              onChange={handleChange}
              margin="normal"
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
                name="Password"
                // value={account.Password}
                onChange={handleChange}
                fullWidth
                margin="normal"
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </div>
            <Button
              style={{ margin: '1rem', background: 'red', color: 'white' }}
              type="submit"
              variant="contained"
              color="primary"
            >
              Sign In
            </Button>
            <Button
              style={{ background: 'green', color: 'white' }}
              variant="contained"
              href="/signup"
            >
              Sign Up
            </Button>
          </form>
        </CardContent>
      </Card>
    </Container>
  );
}
export default SignIn;
