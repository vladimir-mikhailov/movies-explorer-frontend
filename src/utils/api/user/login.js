import handleResponse from '../handleResponse';
import { baseUrl } from '../../config';

const login = async ({ email, password }) => {
  const res = await fetch(`${baseUrl}/signin`, {
    method: 'POST',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, password }),
  });
  return handleResponse(res);
};

export default login;
