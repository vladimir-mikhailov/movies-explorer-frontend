import handleResponse from '../handleResponse';
import { baseUrl } from '../apiConfig';

const logout = async () => {
  const res = await fetch(`${baseUrl}/signout`, {
    method: 'POST',
    credentials: 'include',
  });
  return handleResponse(res);
};

export default logout;
