import handleResponse from '../handleResponse';
import { baseUrl } from '../../config';

const updateUser = async ({ email, name }) => {
  const res = await fetch(`${baseUrl}/users/me`, {
    method: 'PATCH',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, name }),
  });
  return handleResponse(res);
};

export default updateUser;
