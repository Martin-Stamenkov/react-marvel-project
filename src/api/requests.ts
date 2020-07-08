import axios from 'axios';

//GET

const getAllCharacters = () => {
  axios.get(
    'https://gateway.marvel.com:443/v1/public/characters?apikey=7c7a30fe99fa3987fab6f9635906a622'
  );
};

export const Requests = {
  getAllCharacters,
};
