import { useHistory } from 'react-router-dom';
import './NotFound.css';

const NotFound = () => {
  const history = useHistory();

  return (
    <main className='main'>
      <section className='section'>
        <div className='section__container section__container_wide not-found'>
          <div className='not-found__container'>
            <h1 className='not-found__heading'>404</h1>
            <p className='not-found__subheading'>Страница не найдена</p>
          </div>
          <button
            className='link not-found__link'
            onClick={() => history.goBack()}
            type='button'
          >
            Назад
          </button>
        </div>
      </section>
    </main>
  );
};

export default NotFound;
