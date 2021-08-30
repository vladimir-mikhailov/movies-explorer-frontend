import './FilterCheckbox.css';

const FilterCheckbox = ({ label, shortsOnly, setShortsOnly }) => {
  const handleClick = () => {
    setShortsOnly(!shortsOnly);
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
