import React, { useEffect, useState } from 'react';
import {
  Container,
  Card,
  CardContent,
  Typography,
  Button,
  Input,
} from '@material-ui/core';
import { profileStyles } from 'pages/Profile/profile-styles';
import AuthContextProvider from 'authentication/Auth';
import { useDispatch, useSelector } from 'react-redux';
import { getUser } from 'store/actions';

const auth = new AuthContextProvider();

export const ProfileViewMode = () => {
  const classes = profileStyles();
  const dispatch = useDispatch();
  const [profile, setProfile] = useState<any>({
    name: '',
    nickname: '',
    picture: '',
  });

  useEffect(() => {
    if (localStorage.getItem('access_token')) {
      auth.auth0.client.userInfo(
        localStorage.getItem('access_token') || '',
        (err, user) => {
          dispatch(getUser(user));
          setProfile(user);
        }
      );
    }
  }, []);

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
          </Typography>
          <div className={classes.logoContainer}>
            <img src={profile.picture} alt="placeholder" />
          </div>
          <form>
            Email:
            <Input
              name="name"
              value={profile.name}
              fullWidth
              disableUnderline={true}
              inputProps={{ 'aria-label': 'description' }}
            />
            <div style={{ marginTop: '2rem' }}>
              Nickname:
              <Input
                value={profile.nickname}
                disableUnderline={true}
                fullWidth
              />
            </div>
          </form>
          {/* <Button
            style={{ margin: '1rem', background: 'blue', color: 'white' }}
            type="submit"
            variant="contained"
            color="primary"
            href="edit-profile"
          >
            Edit
          </Button> */}
        </CardContent>
      </Card>
    </Container>
  );
};

export default ProfileViewMode;
