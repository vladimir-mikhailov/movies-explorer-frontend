import { useState, useEffect } from 'react';
import { beatFilmsBaseUrl } from '../../../utils/api/apiConfig';
import './Movie.css';
import addMovie from '../../../utils/api/savedMovies/addMovie';
import deleteMovie from '../../../utils/api/savedMovies/deleteMovie';
import getMovies from '../../../utils/api/savedMovies/getMovies';

const Movie = ({ movie }) => {
  const [isSaved, setIsSaved] = useState(false);
  const [movieId, setMovieId] = useState('');

  const imageUrl = `${beatFilmsBaseUrl}${movie.image.url}`;
  const thumbnailUrl = `${beatFilmsBaseUrl}${movie.image.formats.thumbnail.url}`;

  const handleSaveClick = () => {
    if (!isSaved) {
      addMovie({
        country: movie.country,
        description: movie.description,
        director: movie.director,
        duration: movie.duration,
        image: imageUrl,
        movieId: movie.id,
        nameEN: movie.nameEN,
        nameRU: movie.nameRU,
        thumbnail: thumbnailUrl,
        trailer: movie.trailerLink,
        year: movie.year,
      })
        .then((r) => {
          if (r) {
            setIsSaved(true);
            setMovieId(r._id);
          }
        })
        .catch(() => {
          // todo show error
        });
    }

    if (isSaved) {
      deleteMovie(movieId)
        .then((r) => {
          if (r) {
            setIsSaved(false);
          }
        })
        .catch(() => {
          // todo show error
        });
    }
  };

  // todo поднять на уровень выше, чтобы делался только один fetch и одна проверка
  useEffect(() => {
    getMovies().then((r) => {
      if (r) {
        if (
          r.some((el) => {
            setMovieId(el._id);
            return el.movieId === movie.id;
          })
        ) {
          setIsSaved(true);
        }
      }
    });
  }, [movie.id]);

  const timeFormatted = (duration) => {
    const hours = Math.floor(duration / 60);
    const minutes = duration % 60;
    if (hours === 0) return `${minutes}м`;
    if (minutes === 0) return `${hours}ч`;
    return `${hours}ч ${minutes}м`;
  };

  return (
    <figure className='movie'>
      <figcaption className='movie__caption-container'>
        <div className='movie__heading-container'>
          <h2 className='movie__heading' title={movie.nameRU}>
            {movie.nameRU}
          </h2>
          <p className='movie__duration'>{timeFormatted(movie.duration)}</p>
        </div>
        <button
          className={`movie__save-icon${
            isSaved ? ' movie__save-icon_type_saved' : ''
          }`}
          type='button'
          aria-label='Button'
          onClick={handleSaveClick}
        />
      </figcaption>
      <img
        className='movie__image'
        src={`${beatFilmsBaseUrl}${movie.image.url}`}
        alt={movie.nameRU}
      />
    </figure>
  );
};

export default Movie;
