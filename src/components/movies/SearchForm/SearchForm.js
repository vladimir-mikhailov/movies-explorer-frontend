import { useState } from 'react';
import './SearchForm.css';
import FilterCheckbox from '../FilterCheckbox/FilterCheckbox';

const SearchForm = ({ placeholder, handleSubmit, setShortsOnly, shortsOnly, searchQuery: query }) => {
  const [searchQuery, setSearchQuery] = useState(query);

  const onSubmit = (e) => {
    e.preventDefault();
    handleSubmit(searchQuery);
  };

  const handleChange = (e) => {
    setSearchQuery(e.target.value);
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
      <button
        className='search-form__button'
        type='submit'
      >
        Найти
      </button>
      <FilterCheckbox label='Короткометражки' shortsOnly={shortsOnly} setShortsOnly={setShortsOnly} />
    </form>
  );
};

export default SearchForm;
