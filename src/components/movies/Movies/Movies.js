import { useState, useEffect } from 'react';
import './Movies.css';
import Header from '../../common/Header/Header';
import Footer from '../../common/Footer/Footer';
import Preloader from '../../common/Preloader/Preloader';
import SearchForm from '../SearchForm/SearchForm';
import getAllMovies from '../../../utils/api/moviesCatalog/getAllMovies';
import Movie from '../Movie/Movie';
import ShowMoreButton from '../ShowMoreButton/ShowMoreButton';

const Movies = ({ movies, setMovies }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [moviesShownQuantity, setMoviesShownQuantity] = useState(6);
  const [showShowMoreButton, setShowShowMoreButton] = useState(false);

  // todo filter function

  const showMore = () => {
    setMoviesShownQuantity(moviesShownQuantity + 6);
  };

  useEffect(() => {
    if (movies.length === 0) {
      setIsLoading(true);
      getAllMovies().then((res) => {
        setMovies(res);
        setIsLoading(false);
      });
    }
  }, [movies, setMovies]);

  useEffect(() => {
    if (movies.length === 0) return;
    if (moviesShownQuantity >= movies.length) {
      setShowShowMoreButton(false);
    } else setShowShowMoreButton(true);
  }, [movies, showShowMoreButton, moviesShownQuantity]);

  // const onSaveClick = () => {
  //   // todo saveMovie()
  // };

  return (
    <>
      <Header inHero={false} />
      <main className='section main movies'>
        <div className='section__container section__container_wide'>
          <SearchForm />
          {isLoading ? (
            <div className='movies__container movies__container_preloader'>
              <Preloader />
            </div>
          ) : (
            <div className='movies__container'>
              <ul className='movies__list'>
                {movies.slice(0, moviesShownQuantity).map((m) => (
                  <li className='movies__list-item' key={m.id}>
                    <Movie movie={m} />
                  </li>
                ))}
              </ul>
              {showShowMoreButton && <ShowMoreButton onClick={showMore} />}
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
};

export default Movies;
