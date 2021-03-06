import { useEffect, useState } from 'react';
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';
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
import errorMessages from '../../utils/errorMessages';

function App() {
  const [loggedIn, setLoggedIn] = useState(null);
  const [currentUser, setCurrentUser] = useState({});
  const [isSaving, setIsSaving] = useState(false);
  const [isMenuPopupOpen, setIsMenuPopupOpen] = useState(false);
  const [isMessagePopupOpen, setIsMessagePopupOpen] = useState(false);
  const [movies, setMovies] = useState(null);
  const [savedMovies, setSavedMovies] = useState([]);
  const [filteredMovies, setFilteredMovies] = useState(null);
  const [filteredSavedMovies, setFilteredSavedMovies] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [shortsMovies, setShortsMovies] = useState(false);
  const [shortsSaved, setShortsSaved] = useState(false);
  const [searchQuery, setSearchQuery] = useState(null);
  const [lastSearchedQuery, setLastSearchedQuery] = useState(null);
  const [searchQuerySaved, setSearchQuerySaved] = useState(null);
  const [lastSearchedQuerySaved, setLastSearchedQuerySaved] = useState(null);
  const [message, setMessage] = useState('');
  const [lastQuerySentAt, setLastQuerySentAt] = useState(null);
  const [lastQuerySavedSentAt, setLastQuerySavedSentAt] = useState(null);

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

  // const resetStates = () => {
  //   // localStorage.clear();
  //   setMovies(null);
  //   setSavedMovies([]);
  //   setFilteredMovies(null);
  //   setFilteredSavedMovies(null);
  //   setShortsMovies(false);
  //   setShortsSaved(false);
  //   setSearchQuery(null);
  //   setSearchQuerySaved('');
  //   setMessage('');
  // };

  const handleLogin = async ({ email, password }) => {
    try {
      setIsSaving(true);
      await login({ email, password });
      await isLoggedIn();
      // resetStates();
      setIsSaving(false);
    } catch (e) {
      setIsSaving(false);
      setCurrentUser({});
      setLoggedIn(false);
      setMessage(e.message);
      // setIsMessagePopupOpen(true);
    }
  };

  const handleRegister = async ({ email, name, password }) => {
    try {
      setIsSaving(true);

      const newUser = await register({ email, name, password });

      if (newUser) {
        setIsSaving(false);
        await handleLogin({ email, password });
      }
    } catch (e) {
      setIsSaving(false);
      setMessage(e.message);
      // setIsMessagePopupOpen(true);
    }
  };

  const handleUpdateUser = async ({ email, name }) => {
    try {
      setIsSaving(true);

      const updatedUser = await updateUser({ email, name });

      if (updatedUser) {
        setIsSaving(false);
        setCurrentUser(updatedUser);
        setMessage('???????????? ?????????????? ??????????????????');
        setIsMessagePopupOpen(true);
      }
    } catch (e) {
      setIsSaving(false);
      setMessage(e.message);
      await isLoggedIn();
      setIsMessagePopupOpen(true);
    }
  };

  const handleLogout = async () => {
    try {
      const res = await logout();

      if (res) {
        setCurrentUser({});
        setLoggedIn(false);
        // resetStates();
      }
    } catch (e) {
      setMessage(`???????????????? ?? ?????????????? ???? ????????????????. ????????????: ${e.message}`);
      setIsMessagePopupOpen(true);
    }
  };

  const closeAllPopups = () => {
    setIsMenuPopupOpen(false);
    setIsMessagePopupOpen(false);
    setMessage('');
  };

  const filterMovies = (unfilteredMovies, query, shorts) =>
    unfilteredMovies.filter((m) => {
      if (query !== '' && query !== null)
        return shorts
          ? m.nameRU.toLowerCase().includes(query.toLowerCase()) &&
              m.duration <= 40
          : m.nameRU.toLowerCase().includes(query.toLowerCase());
      return shorts ? m.duration <= 40 : true;
    });

  const setMoviesToStateAndLocally = (newMovies) => {
    setMovies(newMovies);
    localStorage.setItem('movies', JSON.stringify(newMovies));
  };

  const setSavedMoviesToStateAndLocally = (newSavedMovies) => {
    setSavedMovies(newSavedMovies);
    localStorage.setItem('savedMovies', JSON.stringify(newSavedMovies));
  };

  const setFilteredMoviesToStateAndLocally = (newFilteredMovies) => {
    setFilteredMovies(newFilteredMovies === null ? null : newFilteredMovies);
    localStorage.setItem(
      'filteredMovies',
      newFilteredMovies === null ? '' : JSON.stringify(newFilteredMovies),
    );
  };

  const setFilteredSavedMoviesToStateAndLocally = (newFilteredMovies) => {
    setFilteredSavedMovies(
      newFilteredMovies === null ? null : newFilteredMovies,
    );
    localStorage.setItem(
      'filteredSavedMovies',
      newFilteredMovies === null ? '' : JSON.stringify(newFilteredMovies),
    );
  };

  const handleSearchMovies = async (query) => {
    if (searchQuery === lastSearchedQuery && searchQuery !== null) return;

    if (searchQuery === null || searchQuery === '') {
      setSearchQuery('');
      setFilteredMoviesToStateAndLocally(null);

      setLastSearchedQuery(null);
      localStorage.setItem('lastSearchedQuery', '');
      return;
    }
    if (searchQuery !== '') {
      try {
        setIsLoading(true);

        // todo ???????????? ???? ???????????? ?????????? setLastQuerySentAt
        const date = Date.now();

        if (
          lastQuerySentAt === null ||
          lastQuerySentAt <= date - 1000 * 60 * 60
        ) {
          const allMovies = await getAllMovies();
          setMoviesToStateAndLocally(allMovies);

          const saved = await getMovies();
          setSavedMoviesToStateAndLocally(saved);

          const moviesFiltered = filterMovies(allMovies, query, shortsMovies);
          setFilteredMoviesToStateAndLocally(moviesFiltered);

          setLastQuerySentAt(date);
          localStorage.setItem('lastQuerySentAt', date.toString());
        }

        if (lastQuerySentAt && lastQuerySentAt > date - 1000 * 60 * 60) {
          const moviesFiltered = filterMovies(movies, query, shortsMovies);
          setFilteredMoviesToStateAndLocally(moviesFiltered);
        }

        setLastSearchedQuery(query);
        localStorage.setItem('lastSearchedQuery', query);

        setIsLoading(false);
      } catch (e) {
        setMessage(`${errorMessages.queryError}: ${e.message}`);
        setIsMessagePopupOpen(true);
      }
    }
  };

  const handleSearchSavedMovies = (query = '') => {
    if (query === lastSearchedQuerySaved) return;

    setLastSearchedQuerySaved(query);

    setFilteredSavedMoviesToStateAndLocally(
      filterMovies(savedMovies, query, shortsSaved),
    );
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
          country: movie.country || '????????????????????',
          description: movie.description || '???????????????? ??????????????????????',
          director: movie.director || '????????????????????',
          duration: movie.duration || '1',
          image:
            imageUrl ||
            'https://api.nomoreparties.co/uploads/750x485_6aa18b04bb.jpeg',
          movieId: movie.id,
          nameEN: movie.nameEN || 'No Name',
          nameRU: movie.nameRU || '?????? ????????????????',
          thumbnail:
            thumbnailUrl ||
            'https://api.nomoreparties.co/uploads/750x485_6aa18b04bb.jpeg',
          trailer: movie.trailerLink || 'https://youtube.com',
          year: movie.year || '????????????????????',
        });

        const newSavedMovies = [...savedMovies, res];
        setSavedMoviesToStateAndLocally(newSavedMovies);
        setFilteredSavedMoviesToStateAndLocally(
          filterMovies(newSavedMovies, searchQuerySaved, shortsSaved),
        );

        return res._id;
      } catch (e) {
        setMessage(e.message);
        setIsMessagePopupOpen(true);
      }
    }

    try {
      const res = await deleteMovie(savedId);
      if (await res) {
        const newFilteredMovies = savedMovies.filter((m) => m._id !== savedId);
        setSavedMoviesToStateAndLocally(newFilteredMovies);
        setFilteredSavedMoviesToStateAndLocally(
          filterMovies(newFilteredMovies, searchQuerySaved, shortsSaved),
        );
      }
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

  const handleShortsMoviesChange = () => {
    setShortsMovies(!shortsMovies);
    localStorage.setItem('shortsMovies', !shortsMovies === true ? 'true' : '');

    if (
      filteredMovies?.length > 0 &&
      (searchQuery === '' || searchQuery === null) &&
      lastSearchedQuery !== null &&
      lastSearchedQuery !== ''
    ) {
      setFilteredMoviesToStateAndLocally(
        filterMovies(movies, lastSearchedQuery, !shortsMovies),
      );
      return;
    }

    if (searchQuery === '' || searchQuery === null) return;

    setFilteredMoviesToStateAndLocally(
      filterMovies(movies, searchQuery, !shortsMovies),
    );
  };

  const handleShortsSavedMoviesChange = () => {
    setShortsSaved(!shortsSaved);
    localStorage.setItem('shortsSaved', !shortsSaved === true ? 'true' : '');

    setFilteredSavedMoviesToStateAndLocally(
      filterMovies(savedMovies, searchQuerySaved, !shortsSaved),
    );
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

      if (localStorage.getItem('lastSearchedQuery')) {
        setLastSearchedQuery(localStorage.getItem('lastSearchedQuery'));
      }

      if (localStorage.getItem('searchQuerySavedMovies'))
        setSearchQuerySaved(localStorage.getItem('searchQuerySavedMovies'));

      if (localStorage.getItem('shortsMovies') === 'true')
        setShortsMovies(true);

      if (localStorage.getItem('shortsSaved') === 'true') setShortsSaved(true);

      if (localStorage.getItem('lastQuerySentAt'))
        setLastQuerySentAt(
          parseInt(localStorage.getItem('lastQuerySentAt'), 10),
        );

      if (localStorage.getItem('lastQuerySavedSentAt'))
        setLastQuerySavedSentAt(
          parseInt(localStorage.getItem('lastQuerySavedSentAt'), 10),
        );
    }
  }, [loggedIn]);

  useEffect(() => {
    if (
      localStorage.getItem('savedMovies') &&
      JSON.parse(localStorage.getItem('savedMovies')).length > 0
    ) {
      setFilteredSavedMoviesToStateAndLocally(
        JSON.parse(localStorage.getItem('savedMovies')),
      );
      return;
    }

    const date = Date.now();

    if (
      lastQuerySavedSentAt === null ||
      lastQuerySavedSentAt <= date - 1000 * 60 * 60
    ) {
      const getSaved = async () => {
        const res = await getMovies();
        setSavedMoviesToStateAndLocally(res);
        setFilteredSavedMoviesToStateAndLocally(res);

        setLastQuerySavedSentAt(date);
        localStorage.setItem('lastQuerySavedSentAt', date.toString());
      };
      if (loggedIn) getSaved();
    }
  }, [lastQuerySavedSentAt, loggedIn]);

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
                      message={message}
                      setMessage={setMessage}
                    />
                  </Route>

                  <Route exact path='/signin'>
                    {loggedIn && <Redirect to='/movies' />}
                    <Login
                      handleLogin={handleLogin}
                      isSaving={isSaving}
                      isPopup={false}
                      message={message}
                      setMessage={setMessage}
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
                    handleShortsMoviesChange={handleShortsMoviesChange}
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
                    movies={filteredSavedMovies}
                    searchQuery={searchQuerySaved}
                    handleSearchQueryChange={handleSearchQuerySavedChange}
                    handleShortsMoviesChange={handleShortsSavedMoviesChange}
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
