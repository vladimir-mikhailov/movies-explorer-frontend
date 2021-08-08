import './NavTab.css';

const NavTab = () => (
    <nav className='section navtab'>
      <ul className='section__container navtab__menu-list'>
        <li className='navtab__menu-list-item'>
          <a className='navtab__menu-link' href='#about-project'>О проекте</a>
        </li>
        <li className='navtab__menu-list-item'>
          <a className='navtab__menu-link' href='#tech'>Технологии</a>
        </li>
        <li className='navtab__menu-list-item'>
          <a className='navtab__menu-link' href='#about-me'>Студент</a>
        </li>
      </ul>
    </nav>
  );

export default NavTab;
