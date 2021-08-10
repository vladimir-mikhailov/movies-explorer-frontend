import { useEffect } from 'react';
import './Footer.css';

const Footer = () => {
  useEffect(() => {}, []);

  return (
    <footer className='section footer'>
      <div className='section__container section__container_wide footer__container'>
        <h4 className='footer__heading'>
          Учебный проект Яндекс.Практикум х BeatFilm.
        </h4>
        <div className='footer__nav-container'>
          <nav className='footer__menu'>
            <ul className='footer__menu-list'>
              <li className='footer__menu-list-item'>
                <a
                  className='footer__menu-link'
                  href='https://praktikum.yandex.ru'
                  rel='nofollow noopener'
                >
                  Яндекс.Практикум
                </a>
              </li>
              <li className='footer__menu-list-item'>
                <a
                  className='footer__menu-link'
                  href='https://github.com/vladimir-mikhailov'
                  rel='nofollow noopener'
                >
                  GitHub
                </a>
              </li>
              <li className='footer__menu-list-item'>
                <a
                  className='footer__menu-link'
                  href='https://www.facebook.com/mikhailov.vladimir/'
                  rel='nofollow noopener'
                >
                  Facebook
                </a>
              </li>
            </ul>
          </nav>
          <p className='footer__copyright'>&copy;{new Date().getFullYear()}</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
