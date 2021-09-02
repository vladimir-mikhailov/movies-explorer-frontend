import { useContext } from 'react';
import './Header.css';
import LoggedInContext from '../../../contexts/LoggedInContext';
import Logo from '../Logo/Logo';
import Navigation from '../Navigation/Navigation';
import Account from '../Account/Account';

const Header = ({ inHero }) => {
  const isLoggedIn = useContext(LoggedInContext);

  return (
    <>
      {!inHero ? (
        <header className='section'>
          <div className='section__container section__container_wide'>
            <div className='header'>
              <Logo />
              <div className='header__nav-container'>
                {isLoggedIn && <Navigation visibility='desktop' />}
                <Account withBurger visibility='desktop' />
              </div>
            </div>
          </div>
        </header>
      ) : (
        <header className='header'>
          <Logo />
          <div className='header__nav-container'>
            {isLoggedIn && <Navigation visibility='desktop' />}
            <Account withBurger visibility='desktop' />
          </div>
        </header>
      )}
    </>
  );
};
export default Header;
