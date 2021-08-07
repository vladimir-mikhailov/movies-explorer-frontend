import handleResponse from './handleResponse';
import { baseUrl } from '../config';

const register = async ({ email, name, password }) => {
  const res = await fetch(`${baseUrl}/signup`, {
    method: 'POST',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, name, password }),
  });
  return handleResponse(res);
};

export default register;
