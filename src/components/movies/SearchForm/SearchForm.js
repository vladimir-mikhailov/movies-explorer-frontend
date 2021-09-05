import { useState, useEffect } from 'react';
import './SearchForm.css';
import FilterCheckbox from '../FilterCheckbox/FilterCheckbox';

const SearchForm = ({
  placeholder,
  handleSubmit,
  searchQuery,
  handleSearchQueryChange,
  handleShortsMoviesChange,
  shorts,
  isLoading,
}) => {
  const [disabled, setDisabled] = useState(true);

  useEffect(() => {
    if (searchQuery === null || searchQuery === '') {
      setDisabled(true);
      return;
    }
    setDisabled(false);
  }, [searchQuery]);

  const onSubmit = (e) => {
    e.preventDefault();
    handleSubmit(searchQuery);
  };

  const handleChange = (e) => {
    handleSearchQueryChange(e.target.value);
    // handleSubmit(e.target.value);
  };

  return (
    <form className='search-form' onSubmit={onSubmit}>
      <input
        type='text'
        className='search-form__input'
        placeholder={placeholder}
        onChange={handleChange}
        value={searchQuery || ''}
        disabled={isLoading}
      />
      <button
        className={`search-form__button${
          disabled ? ' search-form__button_disabled' : ''
        }`}
        type='submit'
        disabled={disabled}
      >
        Найти
      </button>
      <FilterCheckbox
        label='Короткометражки'
        onChange={handleShortsMoviesChange}
        shorts={shorts}
      />
    </form>
  );
};

export default SearchForm;
