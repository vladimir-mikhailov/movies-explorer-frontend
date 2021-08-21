import { useContext } from 'react';
import { Link } from 'react-router-dom';
import './Account.css';
import LoggedInContext from '../../../contexts/LoggedInContext';
import isMenuPopupOpenContext from '../../../contexts/isMenuPopupOpenContext';
import setIsMenuPopupOpenContext from '../../../contexts/setIsMenuPopupOpenContext';

const Account = ({ withBurger, visibility }) => {
  const isLoggedIn = useContext(LoggedInContext);
  const setIsMenuPopupOpen = useContext(setIsMenuPopupOpenContext);
  const isMenuPopupOpen = useContext(isMenuPopupOpenContext);

  const accountClassName = withBurger ? 'account' : 'account account_burger';

  const handleBurgerClick = () => {
    if (isMenuPopupOpen) {
      setIsMenuPopupOpen(false);
    }
    if (!isMenuPopupOpen && isLoggedIn) {
      setIsMenuPopupOpen(true);
    }
  };

  return (
    <nav className={accountClassName}>
      {isLoggedIn && (
        <>
          <Link
            className={`link account__link account__link_visible-on_${visibility}`}
            to='/profile'
          >
            Аккаунт
          </Link>
          {withBurger && (
            <button
              className={`link burger button${
                isMenuPopupOpen ? ' burger_open' : ''
              }`}
              type='button'
              onClick={handleBurgerClick}
              aria-label='Меню'
            />
          )}
        </>
      )}

      {isLoggedIn === false && (
        <>
          <Link className='link account__auth-link' to='/signup'>
            Регистрация
          </Link>
          <Link
            className='link account__auth-link account__auth-link_black button button_color_accent account__button'
            to='/signin'
          >
            Войти
          </Link>
        </>
      )}
    </nav>
  );
};

export default Account;
