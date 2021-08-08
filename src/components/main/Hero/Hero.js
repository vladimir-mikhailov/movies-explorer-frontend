import { useEffect } from 'react';
import './Hero.css';
import Logo from '../../shared/Logo/Logo';
import Promo from '../Promo/Promo';
import NavTab from '../NavTab/NavTab';

const Hero = () => {
  useEffect(() => {

  }, []);

  return (
    <header className='header'>
      <Logo />
      <Promo />
      <NavTab />
    </header>
  );
};

export default Hero;
