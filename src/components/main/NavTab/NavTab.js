import { Link } from 'react-scroll';
import './NavTab.css';

const NavTab = () => (
  <nav className='section navtab'>
    <ul className='section__container section__container_wide navtab__menu-list'>
      <li className='navtab__menu-list-item'>
        <Link
          className='link navtab__menu-link'
          to='about-project'
          href='#about-project'
          smooth
          duration={500}
        >
          О&nbsp;проекте
        </Link>
      </li>
      <li className='navtab__menu-list-item'>
        <Link
          className='link navtab__menu-link'
          to='techs'
          href='#techs'
          smooth
          duration={500}
        >
          Технологии
        </Link>
      </li>
      <li className='navtab__menu-list-item'>
        <Link
          className='link navtab__menu-link'
          to='about-me'
          href='#about-me'
          smooth
          duration={500}
        >
          Студент
        </Link>
      </li>
    </ul>
  </nav>
);

export default NavTab;
