import auth0 from 'auth0-js';
import { history } from 'app/App';
import swal from 'sweetalert';
import {
  REACT_APP_AUTH0_DOMAIN,
  REACT_APP_AUTH0_CLIENT_ID,
  REDIRECT_URL,
  DB_CONNECTION_NAME,
} from 'api/constants';

export default class Auth {
  auth0 = new auth0.WebAuth({
    domain: REACT_APP_AUTH0_DOMAIN,
    clientID: REACT_APP_AUTH0_CLIENT_ID,
    redirectUri: REDIRECT_URL,
    audience: `https://${REACT_APP_AUTH0_DOMAIN}/userinfo`,
    responseType: 'token id_token',
    scope: 'openid profile',
  });

  constructor() {
    this.login = this.login.bind(this);
    this.register = this.register.bind(this);
    this.handleAuthentication = this.handleAuthentication.bind(this);
    this.logout = this.logout.bind(this);
    this.isAuthenticated = this.isAuthenticated.bind(this);
  }

  userProfile = {};

  login(username: string, password: string) {
    this.auth0.login(
      { realm: DB_CONNECTION_NAME, username, password },
      (err) => {
        if (err) {
          swal({
            title: 'Oops!',
            text: 'Wrong email or password.',
            icon: 'error',
          });
          return;
        }
        history.push('/home');
      }
    );
  }

  register(email: string, password: string, nickname: string) {
    const auth = {
      connection: DB_CONNECTION_NAME,
      email,
      password,
      nickname,
    };
    this.auth0.signup(auth, (err) => {
      if (err) {
        console.log(err);
        swal({
          title: 'Oops!',
          text: `Error: ${
            err.original.response.body.error
              ? err.original.response.body.error
              : err.original.response.body.description
          }`,
          icon: 'error',
        });
        return;
      }
      swal({
        title: 'Success!',
        text: 'You signed up successfully',
        icon: 'success',
      }).then(() => history.push('/signin'));
    });
  }

  handleAuthentication() {
    this.auth0.parseHash((err: any, authResult: any) => {
      if (authResult && authResult.accessToken && authResult.idToken) {
        this.setSession(authResult);
        history.replace('/home');
      } else if (err) {
        console.log(err);
        swal(`Error: ${err.error}. Check the console for further details.`);
      }
    });
  }

  setSession(authResult: any) {
    const expiresAt = JSON.stringify(
      authResult.expiresIn * 1000 + new Date().getTime()
    );
    localStorage.setItem('access_token', authResult.accessToken);
    localStorage.setItem('id_token', authResult.idToken);
    localStorage.setItem('expires_at', expiresAt);
  }

  updateUserData(id: number, user: any) {
    const Management = new auth0.Management({
      domain: REACT_APP_AUTH0_DOMAIN,
      token: localStorage.getItem('access_token') || undefined,
    });
    Management.patchUserMetadata(
      'auth0|5f35540a8817010037018975',
      user,
      (res) => {
        console.log(res);
      }
    );
  }

  logout(history: any) {
    localStorage.removeItem('access_token');
    localStorage.removeItem('id_token');
    localStorage.removeItem('expires_at');
    history.replace('/signin');
  }

  isAuthenticated() {
    // Check whether the current time is past the
    // access token's expiry time
    const expiresAt = JSON.parse(localStorage.getItem('expires_at') || '{}');
    return new Date().getTime() < expiresAt;
  }
}

export const auth = new Auth();
