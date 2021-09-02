import { useState } from 'react';
import './FilterCheckbox.css';

const FilterCheckbox = ({ label, onChange, shorts }) => {
  const [shortsOnly, setShortsOnly] = useState(shorts);


  const handleClick = async () => {
    await setShortsOnly(!shortsOnly);
    onChange(!shortsOnly);
  };

  return (
    <>
      <label className='filter-checkbox' htmlFor='shorts'>
        <input
          id='shorts'
          type='checkbox'
          className='filter-checkbox__control filter-checkbox__control_invisible'
          checked={shortsOnly}
          onChange={handleClick}
        />
        <span className='filter-checkbox__control filter-checkbox__control_pseudo' />
        {label}
      </label>
    </>
  );
};

export default FilterCheckbox;
