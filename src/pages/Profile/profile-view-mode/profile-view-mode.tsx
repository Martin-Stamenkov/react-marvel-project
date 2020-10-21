import React, { useEffect, useState } from 'react';
import {
  Container,
  Card,
  CardContent,
  Typography,
  Input,
} from '@material-ui/core';
import { profileStyles } from 'pages/Profile/profile-styles';
import { useSelector } from 'react-redux';
import { Callback } from 'components/generic/callback/Callback';
import placeholder from 'pages/Profile/avatar-placeholder.png';

export const ProfileViewMode = () => {
  const classes = profileStyles();
  const [profile, setProfile] = useState<any>({
    name: '',
    nickname: '',
    picture: '',
  });
  const [loading, setLoading] = useState(true);
  const user = useSelector((state: any) => state.userReducer.currentUser);

  useEffect(() => {
    setProfile(user);
    setLoading(false);
  }, [user]);

  // const editMode = () => {
  //   history.push('edit-profile');
  // };
  return (
    user && (
      <>
        <Container maxWidth="xs">
          {loading ? (
            <Callback />
          ) : (
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
                  <img src={profile.picture || placeholder} alt="placeholder" />
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
                onClick={editMode}
                >
                Edit
              </Button> */}
              </CardContent>
            </Card>
          )}
        </Container>
      </>
    )
  );
};

export default ProfileViewMode;
