import handleResponse from '../handleResponse';
import { baseUrl } from '../../config';

const deleteMovie = async (movieId) => {
  const res = await fetch(`${baseUrl}/movies/${movieId}`, {
    method: 'DELETE',
    credentials: 'include',
  });
  return handleResponse(res);
};

export default deleteMovie;
