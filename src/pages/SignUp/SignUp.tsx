import React, { useState } from 'react';
import Container from '@material-ui/core/Container';
import {
  Typography,
  makeStyles,
  CardContent,
  Button,
  TextField,
} from '@material-ui/core';
import marvel from 'assets/marvel.png';
import { history } from 'app/App';
import background from 'assets/3.jpg';
import AuthContextProvider from 'authentication/Auth';

const auth = new AuthContextProvider();

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
});

const SignUp = () => {
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
    <div
      style={{
        background: `url(${background}) no-repeat center fixed`,
        paddingBottom: '3%',
        paddingTop: '1%',
        backgroundSize: '1400px 740px',
      }}
    >
      <Container style={{ marginTop: '3%', marginLeft: 1 }} maxWidth="sm">
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
            <div style={{ marginTop: '2rem' }}>
              <TextField
                label="Nickname"
                style={{ margin: 8 }}
                placeholder="Nickname"
                fullWidth
                margin="normal"
                name="Nickname"
                value={account.Nickname}
                onChange={handleChange}
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </div>
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
            <Button
              style={{ margin: '1rem', background: 'blue', color: 'white' }}
              type="submit"
              variant="contained"
            >
              Submit
            </Button>
            <Button
              style={{ background: 'green', color: 'white' }}
              variant="contained"
              onClick={() => history.push('/signin')}
            >
              Sign In
            </Button>
          </form>
        </CardContent>
      </Container>
    </div>
  );
};
export default SignUp;
