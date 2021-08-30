import { useState, useEffect } from 'react';
import { beatFilmsBaseUrl } from '../../../utils/api/apiConfig';
import './MoviesCard.css';

const MoviesCard = ({ movie, handleSave, typeSaved, checkIfSavedAndGetId }) => {
  const [savedId, setSavedId] = useState(false);

  useEffect(() => {
    setSavedId(movie._id || checkIfSavedAndGetId(movie));
  }, [checkIfSavedAndGetId, movie]);

  const onSaveClick = async () => {
    try {
      if (typeSaved) {
        await handleSave(movie, savedId);
        return;
      }
      if (savedId) {
        await handleSave(movie, savedId);
        setSavedId(false);
        return;
      }
      if (!savedId) {
        setSavedId(await handleSave(movie, savedId));
      }
    } catch (e) {
      // todo show error
    }
  };

  const timeFormatted = (duration) => {
    const hours = Math.floor(duration / 60);
    const minutes = duration % 60;
    if (hours === 0) return `${minutes}м`;
    if (minutes === 0) return `${hours}ч`;
    return `${hours}ч ${minutes}м`;
  };

  let saveButtonTypeClass = 'movies-card__save-icon';
  if (typeSaved) saveButtonTypeClass += ' movies-card__save-icon_type_delete';
  if (savedId) saveButtonTypeClass += ' movies-card__save-icon_type_saved';

  return (
    <figure className='movies-card'>
      <figcaption className='movies-card__caption-container'>
        <div className='movies-card__heading-container'>

            <h2 className='movies-card__heading' title={movie.nameRU}>
              <a
                href={movie.trailer || movie.trailerLink}
                target='_blank'
                rel='nofollow noopener noreferrer'
                className='link'
              >{movie.nameRU}</a>
            </h2>

          <p className='movies-card__duration'>
            {timeFormatted(movie.duration)}
          </p>
        </div>
        <button
          className={saveButtonTypeClass}
          type='button'
          aria-label='Button'
          onClick={onSaveClick}
        />
      </figcaption>
      <a
        href={movie.trailer || movie.trailerLink}
        target='_blank'
        rel='nofollow noopener noreferrer'
        className='link'
      >
        <img
          className='movies-card__image'
          src={
            typeSaved ? movie.image : `${beatFilmsBaseUrl}${movie.image.url}`
          }
          alt={movie.nameRU}
        />
      </a>
    </figure>
  );
};

export default MoviesCard;
