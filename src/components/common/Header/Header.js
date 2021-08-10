import { useContext } from 'react';
import './Header.css';
import LoggedInContext from '../../../contexts/LoggedInContext';
import Logo from '../Logo/Logo';
import Navigation from '../Navigation/Navigation';
import Account from '../Account/Account';

const Header = () => {
  const isLoggedIn = useContext(LoggedInContext);

  return (
    <header className='header header__container'>
      <Logo />
      <div className='header__nav-container'>
        {isLoggedIn && <Navigation visibility='desktop' />}
        <Account withBurger visibility='desktop' />
      </div>
    </header>
  );
};

export default Header;
