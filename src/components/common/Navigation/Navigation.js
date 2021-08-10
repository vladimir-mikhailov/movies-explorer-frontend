import { NavLink } from 'react-router-dom';
import './Navigation.css';

const Navigation = ({ visibility, showMain, type }) => {
  let listItemClassName = 'navigation__menu-list-item';
  let activeClassName = 'navigation__menu-list-item_active';
  let menuClassName = 'navigation__menu-list';

  if (type === 'burger-menu') {
    activeClassName = 'navigation__link_active-burger';
    listItemClassName = 'navigation__menu-list-item navigation__menu-list-item_type_burger';
    menuClassName = 'navigation__menu-list navigation__menu-list_type_vertical';
  }

  return (
    <nav
      className={`navigation ${
        visibility === 'desktop'
          ? `navigation_visible-on_desktop`
          : `navigation_visible-on_mobile`
      }`}
    >
      <ul className={menuClassName}>
        {showMain && (
          <li className={listItemClassName}>
            <NavLink
              exact to='/'
              className='navigation__link'
              activeClassName={activeClassName}
            >
              Главная
            </NavLink>
          </li>
        )}
        <li className={listItemClassName}>
          <NavLink
            to='/movies'
            className='navigation__link'
            activeClassName={activeClassName}
          >
            Фильмы
          </NavLink>
        </li>
        <li className={listItemClassName}>
          <NavLink
            to='/saved-movies'
            className='navigation__link'
            activeClassName={activeClassName}
          >
            Сохранённые фильмы
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default Navigation;
