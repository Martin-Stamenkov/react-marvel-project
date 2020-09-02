import axios from 'axios';
import { baseUrl } from './constants';

// GET

const getAllCharacters = (
  offset: number,
  publicKey: string,
  ts: number,
  hasher: string | Int32Array
) =>
  axios.get(
    `${baseUrl}characters?orderBy=-modified&offset=${offset}&ts=${ts}&apikey=${publicKey}&hash=${hasher}`
  );

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
    `${baseUrl}comics/${comicsId}?ts=${ts}&apikey=${publicKey}&hash=${hasher}`
  );
const getCreatorsByComicsId = (
  comicsId: number,
  publicKey: string,
  ts: number,
  hasher: string | Int32Array
) =>
  axios.get(
    `${baseUrl}comics/${comicsId}/creators?ts=${ts}&apikey=${publicKey}&hash=${hasher}`
  );
const getCharactersByComicsId = (
  comicsId: number,
  publicKey: string,
  ts: number,
  hasher: string | Int32Array
) =>
  axios.get(
    `${baseUrl}comics/${comicsId}/characters?ts=${ts}&apikey=${publicKey}&hash=${hasher}`
  );
const getCharactersBySeriesId = (
  id: number,
  publicKey: string,
  ts: number,
  hasher: string | Int32Array
) =>
  axios.get(
    `${baseUrl}series/${id}/characters?ts=${ts}&apikey=${publicKey}&hash=${hasher}`
  );
const getCharactersByEventId = (
  id: number,
  publicKey: string,
  ts: number,
  hasher: string | Int32Array
) =>
  axios.get(
    `${baseUrl}events/${id}/characters?ts=${ts}&apikey=${publicKey}&hash=${hasher}`
  );

const searchCharacterByName = (
  searchString: string,
  publicKey: string,
  ts: number,
  hasher: string | Int32Array
) =>
  axios.get(
    `${baseUrl}characters?nameStartsWith=${searchString}&ts=${ts}&apikey=${publicKey}&hash=${hasher}`
  );
const searchComicsByTitle = (
  searchTitle: string,
  publicKey: string,
  ts: number,
  hasher: string | Int32Array
) =>
  axios.get(
    `${baseUrl}comics?title=${searchTitle}&orderBy=title&ts=${ts}&apikey=${publicKey}&hash=${hasher}`
  );

const getAllComics = (
  offset: number,
  publicKey: string,
  ts: number,
  hasher: string | Int32Array
) =>
  axios.get(
    `${baseUrl}comics?orderBy=focDate&offset=${offset}&ts=${ts}&apikey=${publicKey}&hash=${hasher}`
  );
const getAllSeries = (
  offset: number,
  publicKey: string,
  ts: number,
  hasher: string | Int32Array
) =>
  axios.get(
    `${baseUrl}series?orderBy=title&offset=${offset}&ts=${ts}&apikey=${publicKey}&hash=${hasher}`
  );
const getAllEvents = (
  offset: number,
  publicKey: string,
  ts: number,
  hasher: string | Int32Array
) =>
  axios.get(
    `${baseUrl}events?orderBy=name&offset=${offset}&ts=${ts}&apikey=${publicKey}&hash=${hasher}`
  );
const getSeriesById = (
  id: number,
  publicKey: string,
  ts: number,
  hasher: string | Int32Array
) =>
  axios.get(
    `${baseUrl}series/${id}?ts=${ts}&apikey=${publicKey}&hash=${hasher}`
  );
const getEventById = (
  id: number,
  publicKey: string,
  ts: number,
  hasher: string | Int32Array
) =>
  axios.get(
    `${baseUrl}events/${id}?ts=${ts}&apikey=${publicKey}&hash=${hasher}`
  );
const getEventsByCharacterId = (
  id: number,
  publicKey: string,
  ts: number,
  hasher: string | Int32Array
) =>
  axios.get(
    `${baseUrl}characters/${id}/events?orderBy=name&ts=${ts}&apikey=${publicKey}&hash=${hasher}`
  );
const getComicsByCharacterId = (
  id: number,
  publicKey: string,
  ts: number,
  hasher: string | Int32Array
) =>
  axios.get(
    `${baseUrl}characters/${id}/comics?ts=${ts}&apikey=${publicKey}&hash=${hasher}`
  );
const getSeriesByCharacterId = (
  id: number,
  publicKey: string,
  ts: number,
  hasher: string | Int32Array
) =>
  axios.get(
    `${baseUrl}characters/${id}/series?ts=${ts}&apikey=${publicKey}&hash=${hasher}`
  );
const getStoriesByCharacterId = (
  id: number,
  publicKey: string,
  ts: number,
  hasher: string | Int32Array
) =>
  axios.get(
    `${baseUrl}characters/${id}/stories?ts=${ts}&apikey=${publicKey}&hash=${hasher}`
  );

export const Requests = {
  getCharactersByEventId,
  getEventById,
  getAllEvents,
  getCharactersBySeriesId,
  getSeriesById,
  getAllSeries,
  getCharactersByComicsId,
  getCreatorsByComicsId,
  getStoriesByCharacterId,
  getSeriesByCharacterId,
  getComicsByCharacterId,
  getAllCharacters,
  getCharacterById,
  getComicsById,
  searchCharacterByName,
  getAllComics,
  searchComicsByTitle,
  getEventsByCharacterId,
};
