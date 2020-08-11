import React from 'react';
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

function SignIn() {
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
          <form>
            <TextField
              id="standard-full-width"
              label="Email"
              style={{ margin: 8 }}
              placeholder="Your Email"
              fullWidth
              margin="normal"
              InputLabelProps={{
                shrink: true,
              }}
            />
            <div style={{ marginTop: '2rem' }}>
              <TextField
                id="standard-full-width"
                label="Password"
                type="password"
                style={{ margin: 8 }}
                placeholder="Your Pasword"
                fullWidth
                margin="normal"
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </div>
          </form>
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
            type="submit"
            variant="contained"
            href="/signup"
          >
            Sign Up
          </Button>
        </CardContent>
      </Card>
    </Container>
  );
}
export default SignIn;
