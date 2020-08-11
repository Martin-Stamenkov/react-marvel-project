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

type State = {
  email: string;
  password: string;
  username: string;
};

const SignUp = () => {
  const classes = useStyles();
  const [account, setAccount] = useState<any>({
    Email: '',
    Password: '',
    Username: '',
  });

  const handleChange = ({ target }: React.ChangeEvent<HTMLInputElement>) => {
    setAccount({ ...account, [target.name]: target.value });
  };

  const handleRegister = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // let hasError = false;
    // const errorArray: string[] = [];

    // setLoading(true);
    console.log(account);
    // setLoading(false);
    history.push('/items');
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
              margin="normal"
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
                margin="normal"
                onChange={handleChange}
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </div>
            <div style={{ marginTop: '2rem' }}>
              <TextField
                label="Username"
                style={{ margin: 8 }}
                placeholder="Your Username"
                fullWidth
                margin="normal"
                onChange={handleChange}
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </div>
          </form>
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
        </CardContent>
      </Card>
    </Container>
  );
};
export default SignUp;
