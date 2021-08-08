import { useEffect } from 'react';
import './Main.css';
import AboutMe from '../AboutMe/AboutMe';
import AboutProject from '../AboutProject/AboutProject';
import Hero from '../Hero/Hero';
import Footer from '../../shared/Footer/Footer';
import Techs from '../Techs/Techs';

const Main = () => {
  useEffect(() => {}, []);

  return (
    <>
      <Hero />
      <main className='main'>
        <AboutProject />
        <Techs />
        <AboutMe /> {/* Внутри - Portfolio */}
      </main>
      <Footer />
    </>
  );
};

export default Main;
