import auth0 from 'auth0-js';
import {
  REACT_APP_AUTH0_DOMAIN,
  REACT_APP_AUTH0_CLIENT_ID,
  REDIRECT_URL,
  DB_CONNECTION_NAME,
} from '../api/constants';
import { history } from 'app/App';
import { getUser } from 'store/actions';

export default class AuthContextProvider {
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
    this.handleAuthentication = this.handleAuthentication.bind(this);
    this.isAuthenticated = this.isAuthenticated.bind(this);
    this.getProfile = this.getProfile.bind(this);
  }

  userProfile = {};
  login(username: string, password: string) {
    this.auth0.login(
      { realm: DB_CONNECTION_NAME, username, password },
      (err) => {
        if (err) {
          console.log(err);
          return;
        }
      }
    );
  }

  register(email: string, password: string, username: string) {
    this.auth0.signup(
      { connection: DB_CONNECTION_NAME, email, password, username },
      (err) => {
        if (err) {
          console.log(err);

          return;
        }
        history.push('/items');
      }
    );
  }
  handleAuthentication() {
    this.auth0.parseHash((err: any, authResult: any) => {
      if (authResult && authResult.accessToken && authResult.idToken) {
        this.setSession(authResult);
        history.replace('/profile');
      } else if (err) {
        history.replace('/signin');
        console.log(err);
        alert(`Error: ${err.error}. Check the console for further details.`);
      }
    });
  }

  setSession(authResult: any) {
    // Set the time that the access token will expire at
    let expiresAt = JSON.stringify(
      authResult.expiresIn * 1000 + new Date().getTime()
    );
    localStorage.setItem('access_token', authResult.accessToken);
    localStorage.setItem('id_token', authResult.idToken);
    localStorage.setItem('expires_at', expiresAt);
    // navigate to the home route
    history.replace('/items');
  }

  logout(history: any) {
    // Clear access token and ID token from local storage
    localStorage.removeItem('access_token');
    localStorage.removeItem('id_token');
    localStorage.removeItem('expires_at');
    // navigate to the home route
    history.replace('/signin');
  }

  isAuthenticated() {
    // Check whether the current time is past the
    // access token's expiry time
    let expiresAt = JSON.parse(localStorage.getItem('expires_at') || '');
    return new Date().getTime() < expiresAt;
  }
  getProfile(
    cb: (arg0: auth0.Auth0Error | null, arg1: auth0.Auth0UserProfile) => void
  ) {
    let accessToken = localStorage.getItem('access_token') || '';
    this.auth0.client.userInfo(accessToken, (err, profile) => {
      if (profile) {
        this.userProfile = profile;
      }
      cb(err, profile);
    });
  }
}
