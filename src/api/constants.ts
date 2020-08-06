import { Md5 } from 'ts-md5';

export const ts = Number(new Date());
export const publicKey = '7c7a30fe99fa3987fab6f9635906a622';
export const privateKey = '28c9f58682f83faf1bc37a7f74655c90daed682a';
export const hasher = Md5.hashAsciiStr(ts + privateKey + publicKey);
export const baseUrl = 'https://gateway.marvel.com:443/v1/public/';

export const REACT_APP_AUTH0_DOMAIN = 'dev-b7woa0dr.auth0.com';
export const REACT_APP_AUTH0_CLIENT_ID = 'Na11x4V1rLVdywNu4ZU6o5godHeoq4Uo';
