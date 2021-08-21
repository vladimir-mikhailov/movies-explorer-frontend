import './Portfolio.css';

const Portfolio = () => (
  <>
    <h3 className='portfolio__heading'>Портфолио</h3>
    <ul className='portfolio__list'>
      <li className='portfolio__list-item'>
        <a
          href='https://vladimir-mikhailov.github.io/how-to-learn/index.html'
          target='_blank'
          rel='nofollow noopener noreferrer'
          className='link portfolio-link'
        >
          Научиться учиться
        </a>
      </li>
      <li className='portfolio__list-item'>
        <a
          href='https://vladimir-mikhailov.github.io/russian-travel/'
          target='_blank'
          rel='nofollow noopener noreferrer'
          className='link portfolio-link'
        >
          Путешествия по России
        </a>
      </li>
      <li className='portfolio__list-item'>
        <a
          href='https://mikhailov.in/'
          target='_blank'
          rel='nofollow noopener noreferrer'
          className='link portfolio-link'
        >
          Персональный мультиязычный сайт
        </a>
      </li>
      {/* <li className='portfolio__list-item'> */}
      {/*  <a */}
      {/*    href='/' */}
      {/*    target='_blank' */}
      {/*    rel='nofollow noopener noreferrer' */}
      {/*    className='portfolio-link' */}
      {/*  > */}
      {/*    Одностраничное приложение */}
      {/*  </a> */}
      {/* </li> */}
    </ul>
  </>
);

export default Portfolio;
