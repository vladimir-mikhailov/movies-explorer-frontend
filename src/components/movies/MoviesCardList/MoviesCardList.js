import { useEffect, useState } from 'react';
import './MoviesCardList.css';
import MoviesCard from '../MoviesCard/MoviesCard';
import ShowMoreButton from '../ShowMoreButton/ShowMoreButton';
import useWindowDimensions from '../../../hooks/useWindowDimensions';

const MoviesCardList = ({
  movies,
  handleSave,
  typeSaved,
  checkIfSavedAndGetId,
  noButton,
}) => {
  const [moviesQuantity, setMoviesQuantity] = useState(5);
  const [quantifier, setQuantifier] = useState(2);
  const [showMoreButton, setShowMoreButton] = useState(false);

  const { width } = useWindowDimensions();

  useEffect(() => {
    if (width >= 1280) {
      setMoviesQuantity(12);
      setQuantifier(3);
      return;
    }
    if (width > 480 && width <= 1280) {
      setMoviesQuantity(8);
      setQuantifier(2);
      return;
    }
    setMoviesQuantity(5);
    setQuantifier(2);
  }, [width]);

  const showMore = () => {
    setMoviesQuantity(moviesQuantity + quantifier);
  };

  useEffect(() => {
    if (movies.length === 0) return;
    if (moviesQuantity >= movies.length) {
      setShowMoreButton(false);
    } else setShowMoreButton(true);
  }, [movies, showMoreButton, moviesQuantity]);

  return (
    <>
      <ul className='movies-card-list'>
        {movies.slice(0, noButton ? movies.length : moviesQuantity).map((m) => (
          <li className='movies-card-list__list-item' key={m.id || m.movieId}>
            <MoviesCard
              movie={m}
              handleSave={handleSave}
              typeSaved={typeSaved}
              checkIfSavedAndGetId={checkIfSavedAndGetId}
            />
          </li>
        ))}
      </ul>
      {!noButton && showMoreButton && <ShowMoreButton onClick={showMore} />}
    </>
  );
};

export default MoviesCardList;
