import './NavTab.css';

const NavTab = () => (
    <nav className='section navtab'>
      <ul className='section__container section__container_wide navtab__menu-list'>
        <li className='navtab__menu-list-item'>
          <a className='navtab__menu-link' href='#about-project'>О&nbsp;проекте</a>
        </li>
        <li className='navtab__menu-list-item'>
          <a className='navtab__menu-link' href='#techs'>Технологии</a>
        </li>
        <li className='navtab__menu-list-item'>
          <a className='navtab__menu-link' href='#about-me'>Студент</a>
        </li>
      </ul>
    </nav>
  );

export default NavTab;
