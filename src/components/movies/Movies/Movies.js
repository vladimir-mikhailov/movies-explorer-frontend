import { useMemo } from 'react';
import './Movies.css';
import Header from '../../common/Header/Header';
import Footer from '../../common/Footer/Footer';
import Preloader from '../../common/Preloader/Preloader';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';


const Movies = ({
  isLoading,
  movies,
  handleSearch,
  handleSave,
  checkIfSavedAndGetId,
  searchQuery,
  handleSearchQueryChange,
  handleShortsMoviesChange,
  shorts,
}) => {

  const render = useMemo(() => {

    const content = () => {
      if (isLoading) return <Preloader />;

      if (!isLoading && searchQuery === null && movies === null)
        return 'Ищите да обрящете';

      if (!isLoading && searchQuery === '') {
        return 'Нужно ввести ключевое слово';
      }

      if (!isLoading && searchQuery && searchQuery !== '' && !movies)
        return 'Введите ключевое слово и нажмите Найти';

      return 'Ничего не найдено';
    };

    if (
      isLoading ||
      !movies ||
      movies.length === 0 ||
      ((searchQuery === null || searchQuery === '') && !movies)
    )
      return (
        <section className='section movies movies_preloader'>
          <div className='section__container section__container_wide'>
            {content()}
          </div>
        </section>
      );
    return (
      <section className='section movies'>
        <div className='section__container section__container_wide movies__container'>
          <MoviesCardList
            movies={movies}
            handleSave={handleSave}
            checkIfSavedAndGetId={checkIfSavedAndGetId}
          />
        </div>
      </section>
    );
  }, [isLoading, searchQuery, movies, checkIfSavedAndGetId, handleSave]);

  return (
    <>
      <Header inHero={false} />
      <main className='main'>
        <section className='section'>
          <div className='section__container section__container_wide'>
            <SearchForm
              placeholder='Фильм'
              handleSubmit={handleSearch}
              searchQuery={searchQuery}
              handleSearchQueryChange={handleSearchQueryChange}
              handleShortsMoviesChange={handleShortsMoviesChange}
              shorts={shorts}
              isLoading={isLoading}
            />
          </div>
        </section>
        {render}
      </main>
      <Footer />
    </>
  );
};

export default Movies;
