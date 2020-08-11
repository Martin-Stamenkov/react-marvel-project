import auth0 from 'auth0-js';
import {
  REACT_APP_AUTH0_DOMAIN,
  REACT_APP_AUTH0_CLIENT_ID,
  REDIRECT_URL,
  DB_CONNECTION_NAME,
} from '../api/constants';

export default class AuthContextProvider {
  webAuth = new auth0.WebAuth({
    domain: REACT_APP_AUTH0_DOMAIN,
    clientID: REACT_APP_AUTH0_CLIENT_ID,
    redirectUri: REDIRECT_URL,
    audience: `https://${REACT_APP_AUTH0_DOMAIN}/userinfo`,
    responseType: 'token id_token',
    scope: 'openid',
  });

  register(history: any, email: string, password: string, username: string) {
    this.webAuth.signup(
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
}
