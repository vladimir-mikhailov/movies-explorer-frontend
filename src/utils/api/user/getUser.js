import handleResponse from '../handleResponse';
import { baseUrl } from '../apiConfig';

const getUser = async () => {
  const res = await fetch(`${baseUrl}/users/me`, {
    method: 'GET',
    credentials: 'include',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  });
  return handleResponse(res);
};

export default getUser;
