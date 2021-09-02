import { Link } from 'react-router-dom';
import './AuthButton.css';

const AuthButton = ({
  buttonText,
  spanText,
  linkText,
  linkUrl,
  disabled,
  className
}) => (
  <div className={`auth-button ${className}`}>
    <button className={`auth-button__button${disabled ? ' auth-button__button_disabled' : ''}`} type='submit' disabled={disabled}>
      {buttonText}
    </button>
    <div className='auth-button__link-container'>
      <span className='auth-button__span'>{spanText}</span>
      <Link className='auth-button__link link' to={linkUrl}>
        {linkText}
      </Link>
    </div>
  </div>
);

export default AuthButton;
