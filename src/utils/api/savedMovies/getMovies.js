import handleResponse from '../handleResponse';
import { baseUrl } from '../apiConfig';

const getMovies = async () => {
  const res = await fetch(`${baseUrl}/movies`, {
    method: 'GET',
    credentials: 'include',
  });
  return handleResponse(res);
};

export default getMovies;
