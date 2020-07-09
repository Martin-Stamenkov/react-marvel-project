import React from 'react';
import {
  Container,
  Card,
  CardContent,
  Typography,
  Button,
  Input,
  Divider,
} from '@material-ui/core';
import { profileStyles } from 'pages/Profile/profile-styles';
import placeholder from 'pages/Profile/avatar-placeholder.png';

export const ProfilePage = () => {
  const classes = profileStyles();

  return (
    <Container maxWidth="sm">
      <Card className={classes.root}>
        <CardContent>
          <Typography
            className={classes.title}
            color="textSecondary"
            gutterBottom
          >
            Profile
            <Divider />
            <div className={classes.logoContainer}>
              <img src={placeholder} alt="placeholder" />
            </div>
          </Typography>
          <form>
            Email
            <Input
              defaultValue="martinstamenkov@email.com"
              disabled
              fullWidth
              disableUnderline={true}
              inputProps={{ 'aria-label': 'description' }}
            />
            <div style={{ marginTop: '2rem' }}>
              Password
              <Input
                defaultValue="somepassword1234567"
                type="password"
                fullWidth
              />
            </div>
          </form>
          <Button
            style={{ margin: '1rem', background: 'green', color: 'white' }}
            type="submit"
            variant="contained"
            color="primary"
          >
            Save
          </Button>
        </CardContent>
      </Card>
    </Container>
  );
};

export default ProfilePage;
