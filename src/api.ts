import axios from 'axios';
import { Show } from './models/Show';

export const searchShow = async (keyword: string) => {
  const data = await axios.get<{ show: Show }[]>(
    'https://api.tvmaze.com/search/shows?q=' + keyword
  );

  const shows = data.data.map((item) => item.show);

  const castPromises = [];
  for (const show of shows) {
    castPromises.push(getCast(show));
  }

  return Promise.all(castPromises);
};

export const getCast = async (show: Show) => {
  const castResponse = await axios.get(
    `https://api.tvmaze.com/shows/${show.id}/cast`
  );
  const cast = castResponse.data.map((c: any) => c.person);
  return { show, cast };
};

export const searchShow2 = (keyword: string) => {
  return axios
    .get<{ show: Show }[]>('https://api.tvmaze.com/search/shows?q=' + keyword)
    .then((response) => {
      const shows = response.data.map((item) => item.show);
      const castPromises = [];
      for (const show of shows) {
        const castAndShowPromise = axios
          .get(`https://api.tvmaze.com/shows/${show.id}/cast`)
          .then((res) => {
            const cast = res.data.map((item: any) => item.person);

            return { show, cast };
          });

        castPromises.push(castAndShowPromise);
      }
      return Promise.all(castPromises);
    });
};

export const loadShowDetail = async (showId: number) => {
  return axios
    .get(` https://api.tvmaze.com/shows/${showId}`)
    .then((res) => res.data);
};
