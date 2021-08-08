import { useEffect } from 'react';
import './Hero.css';
import Logo from '../../shared/Logo/Logo';
import Promo from '../Promo/Promo';

const Hero = () => {
  useEffect(() => {}, []);

  return (
    <header className='hero section'>
      <section className='section__container'>
        <Logo />
        <Promo />
      </section>
    </header>
  );
};

export default Hero;
