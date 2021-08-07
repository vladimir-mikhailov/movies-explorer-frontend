import { useState, useEffect } from 'react';
import {
  Route,
  Switch,
  Redirect,
  BrowserRouter,
  useHistory,
} from 'react-router-dom';
import './App.css';
import Login from '../user/Login/Login';
import Main from '../main/Main/Main';
import Movies from '../movies/Movies/Movies';
import Profile from '../user/Profile/Profile';
import ProtectedRoute from '../shared/ProtectedRoute/ProtectedRoute';
import Register from '../user/Register/Register';
import CurrentUserContext from '../../contexts/CurrentUserContext';
import LoggedInContext from '../../contexts/LoggedInContext';
import IsSavingContext from '../../contexts/IsSavingContext';
import register from '../../utils/api/user/register';
import getUser from '../../utils/api/user/getUser';
// import updateUser from '../../utils/api/updateUser';
import login from '../../utils/api/user/login';
import logout from '../../utils/api/user/logout';

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState({});
  const [isSaving, setIsSaving] = useState(false);

  const history = useHistory();

  const isLoggedIn = async () => {
    try {
      const user = await getUser();

      if (user?._id) {
        setLoggedIn(true);
        setCurrentUser(user);
        return;
      }
      setLoggedIn(false);
      setCurrentUser({});
    } catch (e) {
      setLoggedIn(false);
      setCurrentUser({});
    }
  };

  useEffect(() => isLoggedIn(), []);

  const handleLogin = async ({ email, password }) => {
    try {
      setIsSaving(true);

      const user = await login({ email, password });

      if (user) {
        setIsSaving(false);
        setCurrentUser(user);
        setLoggedIn(true);
      }
    } catch (e) {
      setIsSaving(false);
      setCurrentUser({});
      setLoggedIn(false);
      // todo показать ошибку логина
    }
  };

  const handleRegister = async ({ email, name, password }) => {
    try {
      setIsSaving(true);

      const newUser = await register({ email, name, password });

      if (newUser) {
        setIsSaving(false);

        // todo показать сообщение об успещной регистрации

        await handleLogin({ name, password });
      }
    } catch (e) {
      setIsSaving(false);
      // todo показать сообщение об ошибке при регистрации
    }
  };

  // const handleUpdateUser = async ({ email, name }) => {
  //  todo handleUpdateUser
  // };

  const handleLogout = async () => {
    try {
      const res = await logout();

      if (res) {
        setCurrentUser({});
        setLoggedIn(false);
        history.push('/signin');
      }
    } catch (e) {
      // todo показать ошибку логаута
    }
  };

  const closeAllPopups = () => {};

  useEffect(() => {
    const handleEscClose = (e) => {
      if (e.key === 'Escape') closeAllPopups();
    };

    document.addEventListener('keydown', handleEscClose);
  }, []);

  return (
    <BrowserRouter>
      <CurrentUserContext.Provider value={currentUser}>
        <LoggedInContext.Provider value={loggedIn}>
          <IsSavingContext.Provider value={isSaving}>
            <Switch>
              <Route exact path='/'>
                <Main />
              </Route>

              <Route path='/signup'>
                {loggedIn && <Redirect to='/movies' />}
                <Register
                  handleRegister={handleRegister}
                  isSaving={isSaving}
                  isPopup={false}
                />
              </Route>

              <Route path='/signin'>
                {loggedIn && <Redirect to='/movies' />}
                <Login
                  handleLogin={handleLogin}
                  isSaving={isSaving}
                  isPopup={false}
                />
              </Route>

              <Route path='/signout'>
                {loggedIn && handleLogout() }
              </Route>

              <ProtectedRoute
                path='/profile'
                component={Profile}
                loggedIn={loggedIn}
              />

              <ProtectedRoute
                path='/movies'
                component={Movies}
                loggedIn={loggedIn}
              />

              <Route path='*'>
                <Main />
              </Route>
            </Switch>
          </IsSavingContext.Provider>
        </LoggedInContext.Provider>
      </CurrentUserContext.Provider>
    </BrowserRouter>
  );
}

export default App;
