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
  shorts
}) => (
    <>
      <Header inHero={false} />
      <main className='main'>
        <section className='section'>
          <div className='section__container section__container_wide'>
            <SearchForm
              placeholder='Фильм'
              handleSubmit={handleSearch}
              searchQuery={searchQuery}
              shorts={shorts}
            />
          </div>
        </section>

        {isLoading || movies.length === 0 ? (
          <section className='section movies movies_preloader'>
            <div className='section__container section__container_wide'>
              {isLoading ? <Preloader /> : 'Ничего не найдено'}
            </div>
          </section>
        ) : (
          <section className='section movies'>
            <div className='section__container section__container_wide movies__container'>
              <MoviesCardList
                movies={movies}
                handleSave={handleSave}
                checkIfSavedAndGetId={checkIfSavedAndGetId}
              />
            </div>
          </section>
        )}
      </main>
      <Footer />
    </>
  );

export default Movies;
