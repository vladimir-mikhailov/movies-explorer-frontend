import { useContext } from 'react';
import LoggedInContext from '../../../contexts/LoggedInContext';

const WithAuth = ({ children }) => {
  const isLoggedIn = useContext(LoggedInContext);

  if (!isLoggedIn) return null;

  return children;
};

export default WithAuth;
