import handleResponse from '../handleResponse';
import { baseUrl } from '../apiConfig';

const addMovie = async ({
  country,
  description,
  director,
  duration,
  image,
  movieId,
  nameEN,
  nameRU,
  thumbnail,
  trailer,
  year,
}) => {
  const res = await fetch(`${baseUrl}/movies`, {
    method: 'POST',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      country,
      description,
      director,
      duration,
      image,
      movieId,
      nameEN,
      nameRU,
      thumbnail,
      trailer,
      year,
    }),
  });
  return handleResponse(res);
};

export default addMovie;
