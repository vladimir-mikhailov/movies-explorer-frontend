import './FilterCheckbox.css';

const FilterCheckbox = ({ label, onChange, shorts }) => (
  <>
    <label className='filter-checkbox' htmlFor='shorts'>
      <input
        id='shorts'
        type='checkbox'
        className='filter-checkbox__control filter-checkbox__control_invisible'
        checked={shorts}
        onChange={onChange}
      />
      <span className='filter-checkbox__control filter-checkbox__control_pseudo' />
      {label}
    </label>
  </>
);

export default FilterCheckbox;
