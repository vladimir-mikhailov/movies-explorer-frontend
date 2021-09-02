import './Input.css';

const Input = ({
  type,
  name,
  id,
  label,
  placeholder,
  onchange,
  value,
  minLength,
  maxLength,
  required,
  errorMessage,
}) => {
  const errorClassName = errorMessage
    ? 'input__error input__error_visible'
    : 'input__error';

  const inputClassName = errorMessage
    ? 'input input_type_error'
    : 'input';

  return (
    <>
      <label htmlFor={id} className='input__label'>
        {label}
        <input
          className={inputClassName}
          type={type}
          name={name}
          id={id}
          placeholder={placeholder}
          onChange={onchange}
          value={value}
          minLength={minLength}
          maxLength={maxLength}
          required={required}
        />
      </label>
      <span className={errorClassName}>{errorMessage}</span>
    </>
  );
};

export default Input;
