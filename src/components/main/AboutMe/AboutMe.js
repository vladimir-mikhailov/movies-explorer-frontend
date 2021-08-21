import { AdvancedImage } from '@cloudinary/react';
import { Cloudinary } from '@cloudinary/base';
import { crop } from '@cloudinary/base/actions/resize';
import { format, quality } from '@cloudinary/base/actions/delivery';
import { auto } from '@cloudinary/base/qualifiers/format';
import { autoBest } from '@cloudinary/base/qualifiers/quality';
import Portfolio from '../Portfolio/Portfolio';
import './AboutMe.css';

const AboutMe = () => {
  const cld = new Cloudinary({
    cloud: {
      cloudName: 'vladimirmikhailov',
    },
  });

  const avatar = cld.image('avatar-w292');

  avatar
    .resize(crop().width(292).height(352))
    .delivery(format(auto()))
    .delivery(quality(autoBest()));

  return (
    <section id='about-me' className='about-me section'>
      <div className='section__container'>
        <h2 className='section__heading section__heading_underlined section__heading_underline-color_light'>
          Студент
        </h2>
        <figure className='about-me__container'>
          <AdvancedImage
            cldImg={avatar}
            className='about-me__photo'
            alt='Владимир Михайлов, студент и выпускник Яндекс Практикум, факультет Веб-разработки.'
          />
          <figcaption className='about-me__photo-caption'>
            <h3 className='about-me__photo-caption-heading'>Владимир</h3>
            <p className='about-me__photo-caption-subheading'>
              Фронтенд-разработчик, {new Date().getFullYear() - 1984} лет
            </p>
            <p className='about-me__photo-caption-text'>
              За&nbsp;курс в Яндекс Практикуме я научился делать сайты по самым
              современным технологиям. Я сделал этот сайт и много других.
              Я&nbsp;красавчик.
            </p>
            <p className='about-me__photo-caption-text'>
              Раньше я умел только настраивать системы управления сайтами и
              подгонять под себя шаблоны, написанные опытными разработчиками.
              Теперь я могу создавать сайты, веб-приложения и мобильные
              приложения с нуля.
            </p>
            <p className='about-me__photo-caption-text'>
              Да, и мобильные приложения тоже. Параллельно я&nbsp;изучил React
              Native. Оказалось, что он очень похож на React. И&nbsp;теперь я
              могу пилить всё, что захочу. И всё это будет работать на едином
              бэкенде, который я теперь тоже умею поднимать.
            </p>
            <p className='about-me__photo-caption-text'>Кайф!</p>
            <p className='about-me__photo-caption-text'>
              Спасибо всей команде Яндекс-Практикума, вы крутые!
            </p>

            <ul className='about-me__photo-caption-links-list'>
              <li className='about-me__photo-caption-links-list-item'>
                <a
                  href='https://www.facebook.com/mikhailov.vladimir/'
                  target='_blank'
                  rel='nofollow noopener noreferrer'
                  className='link about-me__photo-caption-link'
                >
                  Facebook
                </a>
              </li>
              <li className='about-me__photo-caption-links-list-item'>
                <a
                  href='https://github.com/vladimir-mikhailov'
                  target='_blank'
                  rel='nofollow noopener noreferrer'
                  className='link about-me__photo-caption-link'
                >
                  Github
                </a>
              </li>
            </ul>
          </figcaption>
        </figure>
        <Portfolio />
      </div>
    </section>
  );
};

export default AboutMe;
