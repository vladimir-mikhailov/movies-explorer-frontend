import { useState, useEffect } from 'react';
import { Route, Switch, Redirect, BrowserRouter, useHistory } from 'react-router-dom';
import './App.css';
import CurrentUserContext from '../../contexts/CurrentUserContext';
import LoggedInContext from '../../contexts/LoggedInContext';
import IsSavingContext from '../../contexts/IsSavingContext';
import isMenuPopupOpenContext from '../../contexts/isMenuPopupOpenContext';
import setIsMenuPopupOpenContext from '../../contexts/setIsMenuPopupOpenContext';
import { beatFilmsBaseUrl } from '../../utils/api/apiConfig';
import getUser from '../../utils/api/user/getUser';
import login from '../../utils/api/user/login';
import register from '../../utils/api/user/register';
import updateUser from '../../utils/api/user/updateUser';
import Login from '../user/Login/Login';
import Main from '../main/Main/Main';
import Movies from '../movies/Movies/Movies';
import Profile from '../user/Profile/Profile';
import ProtectedRoute from '../common/ProtectedRoute/ProtectedRoute';
import Register from '../user/Register/Register';
import SavedMovies from '../movies/SavedMovies/SavedMovies';
import MenuPopup from '../popups/MenuPopup/MenuPopup';
import getAllMovies from '../../utils/api/moviesCatalog/getAllMovies';
import getMovies from '../../utils/api/savedMovies/getMovies';
import addMovie from '../../utils/api/savedMovies/addMovie';
import deleteMovie from '../../utils/api/savedMovies/deleteMovie';
import NotFound from '../common/NotFound/NotFound';
import logout from '../../utils/api/user/logout';

function App() {
  const [loggedIn, setLoggedIn] = useState(null);
  const [currentUser, setCurrentUser] = useState({});
  const [isSaving, setIsSaving] = useState(false);
  const [isMenuPopupOpen, setIsMenuPopupOpen] = useState(false);
  const [movies, setMovies] = useState([]);
  const [savedMovies, setSavedMovies] = useState([]);
  const [filteredMovies, setFilteredMovies] = useState(null);
  const [filteredSavedMovies, setFilteredSavedMovies] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [shortsOnly, setShortsOnly] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchQuerySaved, setSearchQuerySaved] = useState('');

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

  // todo убрать это
  // useEffect(() => {
  //   const email = 'vladimir@mikhailov.in';
  //   const password = 'Zaloopa123';
  //   handleLogin({ email, password });
  // }, []);

  const handleRegister = async ({ email, name, password }) => {
    try {
      setIsSaving(true);

      const newUser = await register({ email, name, password });

      if (newUser) {
        setIsSaving(false);

        // todo показать сообщение об успешной регистрации

        await handleLogin({ name, password });
      }
    } catch (e) {
      setIsSaving(false);
      // todo показать сообщение об ошибке при регистрации
    }
  };

  const handleUpdateUser = async ({ email, name }) => {
    try {
      setIsSaving(true);

      const updatedUser = await updateUser({ email, name });

      if (updatedUser) {
        setIsSaving(false);
        setCurrentUser(updatedUser);
        // todo показать сообщение об успешном изменении пользователя
      }
    } catch (e) {
      setIsSaving(false);
      // todo показать ошибку изменения данных пользователя
    }
  };

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

  const closeAllPopups = () => {
    setIsMenuPopupOpen(false);
  };

  const filterMovies = (unfilteredMovies, query, shorts) =>
    unfilteredMovies.filter((m) => {
      if (query !== '')
        return shorts
          ? m.nameRU.includes(query) && m.duration < 60
          : m.nameRU.includes(query);
      return shorts ? m.duration <= 40 : true;
    });

  const handleSearchMovies = async (query, shorts) => {
    setIsLoading(true);
    await setSearchQuery(query);
    await setFilteredMovies(filterMovies(movies, query, shorts));
    setIsLoading(false);
  };

  const handleSearchSavedMovies = async (query, shorts) => {
    setIsLoading(true);
    await setSearchQuerySaved(query);
    await setFilteredSavedMovies(filterMovies(savedMovies, query, shorts));
    setIsLoading(false);
  };

  const checkIfSavedAndGetId = (movieFromBase) => {
    const foundMovie = savedMovies.find(
      (savedMovie) => savedMovie.movieId === movieFromBase.id,
    );
    if (!foundMovie) return false;
    return foundMovie._id;
  };

  const handleSaveAndReturnId = async (movie, savedId) => {
    if (!savedId) {
      try {
        const imageUrl = `${beatFilmsBaseUrl}${movie.image.url}`;
        const thumbnailUrl = `${beatFilmsBaseUrl}${movie.image.formats.thumbnail.url}`;

        const res = await addMovie({
          country: movie.country || 'Неизвестна',
          description: movie.description || 'Описание отсутствует',
          director: movie.director || 'Неизвестен',
          duration: movie.duration,
          image: imageUrl,
          movieId: movie.id,
          nameEN: movie.nameEN || 'Без Названия',
          nameRU: movie.nameRU || 'No Name',
          thumbnail: thumbnailUrl,
          trailer: movie.trailerLink,
          year: movie.year || 'Неизвестен',
        });

        setSavedMovies([...savedMovies, res]);

        return res._id;
      } catch (e) {
        // todo error
      }
    }

    try {
      await deleteMovie(savedId);
      setSavedMovies(savedMovies.filter((m) => m._id !== savedId));
    } catch (e) {
      // todo error
    }
    return false;
  };

  useEffect(() => {
    const loadMovies = async () => {
      try {
        setIsLoading(true);
        const saved = getMovies();
        const all = getAllMovies();
        setSavedMovies(await saved);
        setMovies(await all);
        setIsLoading(false);
      } catch (e) {
        // todo show error
      }
    };
    loadMovies();
  }, []);

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
            <setIsMenuPopupOpenContext.Provider value={setIsMenuPopupOpen}>
              <isMenuPopupOpenContext.Provider value={isMenuPopupOpen}>
                <Switch>
                  <Route exact path='/'>
                    <Main />
                  </Route>

                  <Route exact path='/signup'>
                    {loggedIn && <Redirect to='/movies' />}
                    <Register
                      handleRegister={handleRegister}
                      isSaving={isSaving}
                      isPopup={false}
                    />
                  </Route>

                  <Route exact path='/signin'>
                    {loggedIn && <Redirect to='/movies' />}
                    <Login
                      handleLogin={handleLogin}
                      isSaving={isSaving}
                      isPopup={false}
                    />
                  </Route>

                  <ProtectedRoute
                    exact
                    path='/profile'
                    component={Profile}
                    handleUpdateUser={handleUpdateUser}
                    handleLogout={handleLogout}
                    loggedIn={loggedIn}
                    isSaving={isSaving}
                  />

                  <ProtectedRoute
                    exact
                    path='/movies'
                    component={Movies}
                    isLoading={isLoading}
                    loggedIn={loggedIn}
                    movies={filteredMovies || movies}
                    searchQuery={searchQuery}
                    handleSearch={handleSearchMovies}
                    handleSave={handleSaveAndReturnId}
                    checkIfSavedAndGetId={checkIfSavedAndGetId}
                    shortsOnly={shortsOnly}
                    setShortsOnly={setShortsOnly}
                  />

                  <ProtectedRoute
                    exact
                    path='/saved-movies'
                    component={SavedMovies}
                    loggedIn={loggedIn}
                    isLoading={isLoading}
                    movies={filteredSavedMovies || savedMovies}
                    searchQuery={searchQuerySaved}
                    handleSearch={handleSearchSavedMovies}
                    handleSave={handleSaveAndReturnId}
                    checkIfSavedAndGetId={checkIfSavedAndGetId}
                    shortsOnly={shortsOnly}
                    setShortsOnly={setShortsOnly}
                  />

                  <Route path='*'>
                    <NotFound />
                  </Route>
                </Switch>
                <MenuPopup isOpen={isMenuPopupOpen} onClose={closeAllPopups} />
              </isMenuPopupOpenContext.Provider>
            </setIsMenuPopupOpenContext.Provider>
          </IsSavingContext.Provider>
        </LoggedInContext.Provider>
      </CurrentUserContext.Provider>
    </BrowserRouter>
  );
}

export default App;
