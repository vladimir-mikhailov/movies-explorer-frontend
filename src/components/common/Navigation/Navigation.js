import { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import setIsMenuPopupOpenContext from '../../../contexts/setIsMenuPopupOpenContext';import './Navigation.css';

const Navigation = ({ visibility, showMain, type }) => {
  const setIsMenuPopupOpen = useContext(setIsMenuPopupOpenContext);

  const onClick = () => {
    setIsMenuPopupOpen(false);
  };

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
              onClick={onClick}
              exact to='/'
              className='link navigation__link'
              activeClassName={activeClassName}
            >
              Главная
            </NavLink>
          </li>
        )}
        <li className={listItemClassName}>
          <NavLink
            onClick={onClick}
            to='/movies'
            className='link navigation__link'
            activeClassName={activeClassName}
          >
            Фильмы
          </NavLink>
        </li>
        <li className={listItemClassName}>
          <NavLink
            onClick={onClick}
            to='/saved-movies'
            className='link navigation__link'
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
