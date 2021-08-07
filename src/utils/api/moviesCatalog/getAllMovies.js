import handleResponse from '../handleResponse';
import { beatFilmsApiUrl } from '../../config';

const getAllMovies = async () => {
  const res = await fetch(beatFilmsApiUrl);
  return handleResponse(res);
};

export default getAllMovies;
