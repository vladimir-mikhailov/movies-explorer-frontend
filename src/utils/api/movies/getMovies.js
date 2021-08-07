import handleResponse from '../handleResponse';
import { baseUrl } from '../../config';

const getMovies = async () => {
  const res = await fetch(`${baseUrl}/movies`, {
    method: 'GET',
    credentials: 'include',
  });
  return handleResponse(res);
};

export default getMovies;
