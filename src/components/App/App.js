import { useState, useEffect } from 'react';
import { Route, Switch, Redirect, BrowserRouter } from 'react-router-dom';
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
import NotFound from '../errors/NotFound/NotFound';
import logout from '../../utils/api/user/logout';
import MessagePopup from '../popups/MessagePopup/MessagePopup';

function App() {
  const [loggedIn, setLoggedIn] = useState(null);
  const [currentUser, setCurrentUser] = useState({});
  const [isSaving, setIsSaving] = useState(false);
  const [isMenuPopupOpen, setIsMenuPopupOpen] = useState(false);
  const [isMessagePopupOpen, setIsMessagePopupOpen] = useState(false);
  const [movies, setMovies] = useState([]);
  const [savedMovies, setSavedMovies] = useState([]);
  const [filteredMovies, setFilteredMovies] = useState([]);
  const [filteredSavedMovies, setFilteredSavedMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [shortsMovies, setShortsMovies] = useState(false);
  const [shortsSaved, setShortsSaved] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchQuerySaved, setSearchQuerySaved] = useState('');
  const [message, setMessage] = useState('');

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
      await login({ email, password });
      await isLoggedIn();
      setIsSaving(false);
    } catch (e) {
      setIsSaving(false);
      setCurrentUser({});
      setLoggedIn(false);
      setMessage(e.message);
      setIsMessagePopupOpen(true);
    }
  };

  const handleRegister = async ({ email, name, password }) => {
    try {
      setIsSaving(true);

      const newUser = await register({ email, name, password });

      if (newUser) {
        setIsSaving(false);
        await handleLogin({ name, password });
      }
    } catch (e) {
      setIsSaving(false);
      setMessage(e.message);
      setIsMessagePopupOpen(true);
    }
  };

  const handleUpdateUser = async ({ email, name }) => {
    try {
      setIsSaving(true);

      const updatedUser = await updateUser({ email, name });

      if (updatedUser) {
        setIsSaving(false);
        setCurrentUser(updatedUser);
        setMessage('Данные успешно обновлены');
        setIsMessagePopupOpen(true);
      }
    } catch (e) {
      setIsSaving(false);
      setMessage(e.message);
      setIsMessagePopupOpen(true);
    }
  };

  const handleLogout = async () => {
    try {
      const res = await logout();

      if (res) {
        setCurrentUser({});
        setLoggedIn(false);
      }
    } catch (e) {
      setMessage(e.message);
      setIsMessagePopupOpen(true);
    }
  };

  const closeAllPopups = () => {
    setIsMenuPopupOpen(false);
    setIsMessagePopupOpen(false);
    setMessage('');
  };

  // const loadMovies = async () => {
  //   try {
  //     setIsLoading(true);
  //     const saved = getMovies();
  //     const all = getAllMovies();
  //     setSavedMovies(await saved);
  //     setMovies(await all);
  //     setIsLoading(false);
  //   } catch (e) {
  //     setMessage(e.message);
  //     setIsMessagePopupOpen(true);
  //   }
  // };

  const filterMovies = (unfilteredMovies, query, shorts) =>
    unfilteredMovies.filter((m) => {
      if (query !== '')
        return shorts
          ? m.nameRU.includes(query) && m.duration <= 40
          : m.nameRU.includes(query);
      return shorts ? m.duration <= 40 : true;
    });

  const getMoviesFromServer = async () => {
    try {
      const res = getAllMovies();
      return await res;
    } catch (e) {
      setMessage(
        `Ошибка загрузки: ${e.message}. Пока такое дело, пробуем искать по сохранённым данным`,
      );
      setIsMessagePopupOpen(true);
      return movies;
    }
  };

  const getAndSetMovies = async () => {
    const all = await getMoviesFromServer();
    const saved = await getMovies();
    setMovies(all);
    localStorage.setItem('movies', JSON.stringify(all));
    setSavedMovies(saved);
    localStorage.setItem('savedMovies', JSON.stringify(saved));
    return { all, saved };
  };

  const handleSearchMovies = async (query, shorts) => {
    try {
      setIsLoading(true);
      setSearchQuery(query);
      setShortsMovies(shorts);
      const { all } = await getAndSetMovies();
      const moviesFiltered = filterMovies(all, query, shorts);
      setFilteredMovies(moviesFiltered);
      localStorage.setItem('filteredMovies', JSON.stringify(moviesFiltered));
      setIsLoading(false);
    } catch (e) {
      console.log(e);
    }
  };

  const handleSearchSavedMovies = (query, shorts) => {
    setIsLoading(true);
    setSearchQuerySaved(query);
    setShortsSaved(shorts);
    const savedMoviesFiltered = filterMovies(savedMovies, query, shorts);
    setFilteredSavedMovies(savedMoviesFiltered);
    localStorage.setItem(
      'filteredSavedMovies',
      JSON.stringify(savedMoviesFiltered),
    );
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
        setMessage(e.message);
        setIsMessagePopupOpen(true);
      }
    }

    try {
      await deleteMovie(savedId);
      setSavedMovies(savedMovies.filter((m) => m._id !== savedId));
    } catch (e) {
      setMessage(e.message);
      setIsMessagePopupOpen(true);
    }
    return false;
  };

  const handleSearchQueryChange = (q) => {
    setSearchQuery(q);
    localStorage.setItem('searchQueryMovies', q);
  };

  const handleSearchQuerySavedChange = (q) => {
    setSearchQuerySaved(q);
    localStorage.setItem('searchQuerySavedMovies', q);
  };

  useEffect(() => {
    if (loggedIn) {
      if (localStorage.getItem('movies'))
        setMovies(JSON.parse(localStorage.getItem('movies')));

      if (localStorage.getItem('savedMovies'))
        setSavedMovies(JSON.parse(localStorage.getItem('savedMovies')));

      if (localStorage.getItem('filteredMovies'))
        setFilteredMovies(JSON.parse(localStorage.getItem('filteredMovies')));

      if (localStorage.getItem('filteredSavedMovies'))
        setFilteredSavedMovies(
          JSON.parse(localStorage.getItem('filteredSavedMovies')),
        );

      if (localStorage.getItem('searchQueryMovies')) {
        setSearchQuery(localStorage.getItem('searchQueryMovies'));
      }

      if (localStorage.getItem('searchQuerySavedMovies'))
        setSearchQuerySaved(localStorage.getItem('searchQuerySavedMovies'));

      if (localStorage.getItem('shortsMovies'))
        setShortsMovies(localStorage.getItem('shortsMovies') === 'true');

      if (localStorage.getItem('shortsSaved'))
        setShortsSaved(localStorage.getItem('shortsSaved') === 'true');
    }
  }, [loggedIn]);

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
                    movies={filteredMovies}
                    searchQuery={searchQuery}
                    handleSearchQueryChange={handleSearchQueryChange}
                    handleSearch={handleSearchMovies}
                    handleSave={handleSaveAndReturnId}
                    checkIfSavedAndGetId={checkIfSavedAndGetId}
                    shorts={shortsMovies}
                  />

                  <ProtectedRoute
                    exact
                    path='/saved-movies'
                    component={SavedMovies}
                    loggedIn={loggedIn}
                    isLoading={isLoading}
                    movies={filteredSavedMovies || savedMovies}
                    searchQuery={searchQuerySaved}
                    handleSearchQueryChange={handleSearchQuerySavedChange}
                    handleSearch={handleSearchSavedMovies}
                    handleSave={handleSaveAndReturnId}
                    checkIfSavedAndGetId={checkIfSavedAndGetId}
                    shorts={shortsSaved}
                  />

                  <Route path='*'>
                    <NotFound />
                  </Route>
                </Switch>
                <MenuPopup isOpen={isMenuPopupOpen} onClose={closeAllPopups} />
                <MessagePopup
                  isOpen={isMessagePopupOpen}
                  message={message}
                  onClose={closeAllPopups}
                />
              </isMenuPopupOpenContext.Provider>
            </setIsMenuPopupOpenContext.Provider>
          </IsSavingContext.Provider>
        </LoggedInContext.Provider>
      </CurrentUserContext.Provider>
    </BrowserRouter>
  );
}

export default App;
