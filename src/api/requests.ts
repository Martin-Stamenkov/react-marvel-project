import axios from 'axios';
import { baseUrl } from './constants';

// GET

const getAllCharacters = (
  publicKey: string,
  ts: number,
  hasher: string | Int32Array
) =>
  axios.get(`${baseUrl}characters?ts=${ts}&apikey=${publicKey}&hash=${hasher}`);

const getCharacterById = (
  characterId: number,
  publicKey: string,
  ts: number,
  hasher: string | Int32Array
) =>
  axios.get(
    `${baseUrl}characters/${characterId}?ts=${ts}&apikey=${publicKey}&hash=${hasher}`
  );

const getComicsById = (
  comicsId: number,
  publicKey: string,
  ts: number,
  hasher: string | Int32Array
) =>
  axios.get(
    `${baseUrl}comics/${comicsId}comics?ts=${ts}&apikey=${publicKey}&hash=${hasher}`
  );

export const Requests = {
  getAllCharacters,
  getCharacterById,
  getComicsById,
};
