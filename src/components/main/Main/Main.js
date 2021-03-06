import './Main.css';
import AboutMe from '../AboutMe/AboutMe';
import AboutProject from '../AboutProject/AboutProject';
import Hero from '../Hero/Hero';
import Footer from '../../common/Footer/Footer';
import NavTab from '../NavTab/NavTab';
import Techs from '../Techs/Techs';

const Main = () => (
    <>
      <Hero />
      <NavTab />
      <main className='main'>
        <AboutProject />
        <Techs />
        <AboutMe />
      </main>
      <Footer />
    </>
  );

export default Main;
