import './Techs.css';

const Techs = () => (
  <section id='techs' className='section techs'>
    <div className='section__container'>
      <h2 className='section__heading section__heading_underlined section__heading_underline-color_adaptive-black-and-white'>
        Технологии
      </h2>
      <div className='techs__container'>
        <p className='techs__main-heading'>7 технологий</p>
        <p className='techs__main-subheading'>
          На курсе веб-разработки мы освоили технологии, которые применили в
          дипломном проекте.
        </p>
        <ul className='techs__list'>
          <li className='techs__list-item'>HTML</li>
          <li className='techs__list-item'>CSS</li>
          <li className='techs__list-item'>JS</li>
          <li className='techs__list-item'>React</li>
          <li className='techs__list-item'>Git</li>
          <li className='techs__list-item'>Express.JS</li>
          <li className='techs__list-item'>mongoDB</li>
        </ul>
      </div>
    </div>
  </section>
);

export default Techs;
