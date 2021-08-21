import './AboutProject.css';

const AboutProject = () => (
  <section id='about-project' className='section about-project'>
    <div className='section__container'>
      <h2 className='section__heading section__heading_underlined section__heading_underline-color_light'>
        О проекте
      </h2>
      <div className='about-project__container'>
        <ul className='about-project__list'>
          <li className='about-project__list-item'>
            <h3 className='about-project__list-item-heading'>
              Дипломный проект включал 5 этапов
            </h3>
            <p className='about-project__list-item-text'>
              Составление плана, работу над&nbsp;бэкендом, вёрстку, добавление
              функциональности и&nbsp;финальные доработки.
            </p>
          </li>
          <li className='about-project__list-item'>
            <h3 className='about-project__list-item-heading'>
              На выполнение диплома ушло 5 недель
            </h3>
            <p className='about-project__list-item-text'>
              У каждого этапа был мягкий и&nbsp;жёсткий дедлайн,
              которые нужно было соблюдать, чтобы успешно защититься.
            </p>
          </li>
        </ul>
        <div className='about-project__progress-bar'>
          <div className='about-project__progress-bar-part about-project__progress-bar-part_type_filled'>
            1 неделя
          </div>
          <div className='about-project__progress-bar-part about-project__progress-bar-part_type_empty'>4 недели</div>
          <div className='about-project__progress-bar-caption'>Back-end</div>
          <div className='about-project__progress-bar-caption'>Front-end</div>
        </div>
      </div>
    </div>
  </section>
);

export default AboutProject;
