import { Link } from 'react-router-dom';
import './Logo.css';

const Logo = () => (
  <Link className='header__logo logo' to='/' aria-label='logo' />
);

export default Logo;
