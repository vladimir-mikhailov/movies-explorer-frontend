import { useState, useEffect } from 'react';
import { Route, Switch, Redirect, BrowserRouter } from 'react-router-dom';
import './App.css';
import Login from '../user/Login/Login';
import Main from '../main/Main/Main';
import Movies from '../movies/Movies/Movies';
import Profile from '../user/Profile/Profile';
import ProtectedRoute from '../shared/ProtectedRoute/ProtectedRoute';
import Register from '../user/Register/Register';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import { LoggedInContext } from '../../contexts/LoggedInContext';
// import { IsSavingContext } from '../../contexts/IsSavingContext';
import getUser from '../../utils/api/user/getUser';
// import updateUser from '../../utils/api/updateUser';
// import logout from '../../utils/api/logout';
// import register from '../../utils/api/register';
// import login from '../../utils/api/login';

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState({});
  // const [isSaving, setIsSaving] = useState(false);

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

  // const handleRegister = () => {
  //
  // };

  return (
    <BrowserRouter>
      <CurrentUserContext.Provider value={currentUser}>
        <LoggedInContext.Provider value={loggedIn}>
          {/* <IsSavingContext.Provider value={isSaving}> */}
          <Switch>
            <Route exact path='/'>
              <Main />
            </Route>

            <Route path='/signup'>
              {loggedIn && <Redirect to='/' />}
              <Register
                // handleRegister={handleRegister}
                // isSaving={isSaving}
                isPopup={false}
              />
            </Route>

            <Route path='/signin'>
              {loggedIn && <Redirect to='/' />}
              <Login
                // handleLogin={handleLogin}
                // isSaving={isSaving}
                isPopup={false}
              />
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

            <ProtectedRoute path='*' component={Profile} loggedIn={loggedIn} />
          </Switch>
          {/* </IsSavingContext.Provider> */}
        </LoggedInContext.Provider>
      </CurrentUserContext.Provider>
    </BrowserRouter>
  );
}

export default App;
