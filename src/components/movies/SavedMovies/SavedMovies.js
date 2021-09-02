import './SavedMovies.css';
import Header from '../../common/Header/Header';
import SearchForm from '../SearchForm/SearchForm';
import Preloader from '../../common/Preloader/Preloader';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import Footer from '../../common/Footer/Footer';

const SavedMovies = ({
  isLoading,
  movies,
  handleSearch,
  handleSave,
  checkIfSavedAndGetId,
  searchQuery,
  shorts,
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
        <section className='section saved-movies saved-movies_preloader'>
          <div className='section__container section__container_wide'>
            {isLoading ? <Preloader /> : 'Ничего не найдено'}
          </div>
        </section>
      ) : (
        <section className='section saved-movies'>
          <div className='section__container section__container_wide saved-movies__container'>
            <MoviesCardList
              movies={movies}
              handleSave={handleSave}
              typeSaved
              checkIfSavedAndGetId={checkIfSavedAndGetId}
            />
          </div>
        </section>
      )}
    </main>
    <Footer />
  </>
);

export default SavedMovies;
