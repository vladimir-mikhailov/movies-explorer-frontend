import './FilterCheckbox.css';

const FilterCheckbox = ({ label }) => (
  <>
    <label className='filter-checkbox' htmlFor='shorts'>
      <input
        id='shorts'
        type='checkbox'
        className='filter-checkbox__control filter-checkbox__control_invisible'
      />
      <span className="filter-checkbox__control filter-checkbox__control_pseudo" />
      {label}
    </label>
  </>
);

export default FilterCheckbox;
