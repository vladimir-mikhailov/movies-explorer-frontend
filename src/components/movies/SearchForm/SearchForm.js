import './SearchForm.css';
import FilterCheckbox from '../FilterCheckbox/FilterCheckbox';

const SearchForm = ({
  placeholder,
  handleSubmit,
  searchQuery,
  handleSearchQueryChange,
  shorts,
}) => {
  const onSubmit = (e) => {
    e.preventDefault();
    handleSubmit(searchQuery);
  };

  const handleChange = (e) => {
    handleSearchQueryChange(e.target.value);
    // handleSubmit(e.target.value);
  };

  const handleToggleCheckbox = (shortsOnly) => {
    handleSubmit(searchQuery, shortsOnly);
  };

  return (
    <form className='search-form' onSubmit={onSubmit}>
      <input
        type='text'
        className='search-form__input'
        placeholder={placeholder}
        onChange={handleChange}
        value={searchQuery}
      />
      <button className='search-form__button' type='submit'>
        Найти
      </button>
      <FilterCheckbox
        label='Короткометражки'
        onChange={handleToggleCheckbox}
        shorts={shorts}
      />
    </form>
  );
};

export default SearchForm;
