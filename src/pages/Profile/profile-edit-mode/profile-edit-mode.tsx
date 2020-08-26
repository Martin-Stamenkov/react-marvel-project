import React, { useState, ChangeEvent, FormEvent, useEffect } from 'react';
import {
  Container,
  Card,
  CardContent,
  Typography,
  Button,
  Input,
} from '@material-ui/core';
import { profileStyles } from 'pages/Profile/profile-styles';
import { useSelector } from 'react-redux';
import AuthContextProvider from 'authentication/Auth';

const auth = new AuthContextProvider();

export const ProfilePage = () => {
  const classes = profileStyles();
  const profile = useSelector((state: any) => state.currentUser);
  const [userInfo, setUserInfo] = useState<any>({
    Nickname: '',
    Email: '',
    Password: '',
  });
  useEffect(() => {
    profile &&
      setUserInfo({
        Nickname: profile.nickname.toString(),
        Email: profile.name.toString(),
      });
  }, []);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setUserInfo({ ...userInfo, [event.target.name]: value });
  };

  const sendData = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const userId = localStorage.getItem('id_token');
    const user = userInfo;
    auth.updateUserData(+userId!!, user);
  };

  return (
    profile && (
      <Container maxWidth="xs">
        <Card className={classes.root}>
          <CardContent>
            <Typography
              className={classes.title}
              color="textSecondary"
              gutterBottom
            >
              Edit your Profile
            </Typography>
            <div className={classes.logoContainer}>
              <img src={profile.picture} alt="placeholder" />
            </div>
            <form onSubmit={sendData}>
              Nickname
              <Input
                defaultValue={profile.nickname}
                fullWidth
                inputProps={{ 'aria-label': 'description' }}
                onChange={handleChange}
                name="Nickname"
              />
              <div style={{ marginTop: '2rem' }}>
                Email
                <Input
                  value={profile.name}
                  fullWidth
                  disabled
                  inputProps={{ 'aria-label': 'description' }}
                  onChange={handleChange}
                  name="Email"
                />
              </div>
              <div style={{ marginTop: '2rem' }}>
                Password
                <Input
                  defaultValue={userInfo.Password}
                  type="password"
                  fullWidth
                  onChange={handleChange}
                  name="Password"
                />
              </div>
              <Button
                style={{ margin: '1rem', background: 'green', color: 'white' }}
                type="submit"
                variant="contained"
                color="primary"
              >
                Save
              </Button>
            </form>
          </CardContent>
        </Card>
      </Container>
    )
  );
};

export default ProfilePage;
