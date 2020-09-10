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
import AuthContextProvider from 'authentication/Auth';
import background from 'assets/3.jpg';
import { history } from 'app/App';

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
    console.log(account);
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setAccount({ ...account, [event.target.name]: value });
  };

  const classes = useStyles();
  return (
    <div
      style={{
        background: `url(${background}) no-repeat center fixed`,
        paddingBottom: '12%',
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
            Sign In
          </Typography>
          <form onSubmit={handleSubmit}>
            <TextField
              label="Email"
              style={{ margin: 8 }}
              placeholder="Your Email"
              fullWidth
              name="Email"
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
              onClick={() => history.push('/signup')}
            >
              Sign Up
            </Button>
          </form>
        </CardContent>
      </Container>
    </div>
  );
}
export default SignIn;
