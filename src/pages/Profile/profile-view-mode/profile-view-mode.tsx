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

export const ProfileViewMode = () => {
  const classes = profileStyles();

  return (
    <Container maxWidth="xs">
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
                disabled
                disableUnderline={true}
                type="password"
                fullWidth
              />
            </div>
          </form>
          <Button
            style={{ margin: '1rem', background: 'blue', color: 'white' }}
            type="submit"
            variant="contained"
            color="primary"
            href="edit-profile"
          >
            Edit
          </Button>
        </CardContent>
      </Card>
    </Container>
  );
};

export default ProfileViewMode;
