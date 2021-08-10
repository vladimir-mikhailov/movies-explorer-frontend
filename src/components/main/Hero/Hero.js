import { useEffect } from 'react';
import './Hero.css';
import Promo from '../Promo/Promo';
import Header from '../../common/Header/Header';

const Hero = () => {
  useEffect(() => {}, []);

  return (
    <header className='hero section'>
      <section className='section__container section__container_wide'>
        <Header/>
        <Promo />
      </section>
    </header>
  );
};

export default Hero;
