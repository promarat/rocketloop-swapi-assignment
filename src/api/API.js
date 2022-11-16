import axios from 'axios';

export const BASE_URL = 'https://swapi.dev/api/';
const swapi = axios.create({
  baseURL: BASE_URL,
});

const PEOPLE_URLS = [
  'people/?page=1',
  'people/?page=2',
  'people/?page=3',
  'people/?page=4',
  'people/?page=5',
  'people/?page=6',
  'people/?page=7',
  'people/?page=8',
  'people/?page=9',
];

const FILM_URLS = [
  'films/',
];

const STARSHIP_URLS = [
  'starships/?page=1',
  'starships/?page=2',
  'starships/?page=3',
  'starships/?page=4',
];

const SPECIES_URLS = [
  'species/?page=1',
  'species/?page=2',
  'species/?page=3',
  'species/?page=4',
];

export const getPeoples = async () => {
  try {
    const response = await Promise.all(
      PEOPLE_URLS.map(url => swapi.get(url).then(res => {
        if (res.status === 200) {
          return res.data.results.map(people => {
            const { name, birth_year, films, species, starships, url } = people;
            return { name, birth_year, films, species, starships, url };
          });
        } else {
          return [];
        }
      }))
    );
    return response.flat();
  } catch (error) {
    console.error('Error', error);
  }
}

export const getFilms = async () => {
  try {
    const response = await Promise.all(
      FILM_URLS.map(url => swapi.get(url).then(res => {
        if (res.status === 200) {
          return res.data.results.map(film => {
            const { episode_id, title, url } = film;
            return { episode_id, title, url };
          });
        } else {
          return [];
        }
      }))
    );
    return response.flat();
  } catch (error) {
    console.error('Error', error);
  }
}

export const getStarships = async () => {
  try {
    const response = await Promise.all(
      STARSHIP_URLS.map(url => swapi.get(url).then(res => {
        if (res.status === 200) {
          return res.data.results.map(species => {
            const { name, url } = species;
            return { name, url };
          });
        } else {
          return [];
        }
      }))
    );
    return response.flat();
  } catch (error) {
    console.error('Error', error);
  }
}

export const getSpecies = async () => {
  try {
    const response = await Promise.all(
      SPECIES_URLS.map(url => swapi.get(url).then(res => {
        if (res.status === 200) {
          return res.data.results.map(species => {
            const { name, url } = species;
            return { name, url };
          });
        } else {
          return [];
        }
      }))
    );
    return response.flat();
  } catch (error) {
    console.error('Error', error);
  }
}
