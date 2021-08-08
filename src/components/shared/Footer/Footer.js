import { useEffect } from 'react';
import './Footer.css';

const Footer = () => {
  useEffect(() => {

  }, []);

  return (
    <footer className='footer'>
      <p className='footer__copyright'>&copy; {(new Date()).getFullYear()} Movie-WhoYouVie</p>
    </footer>
  );
};

export default Footer;
