import { useEffect, useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import './Profile.css';
import Header from '../../common/Header/Header';
import CurrentUserContext from '../../../contexts/CurrentUserContext';
import { useFormValidation } from '../../../hooks/useFormValidation';

const Profile = ({
  handleUpdateUser,
  handleLogout,
  isSaving,
}) => {
  const user = useContext(CurrentUserContext);

  const { values, errors, isFormValid, handleChange, resetForm } =
    useFormValidation();

  const [isEditionMode, setIsEditionMode] = useState(false);
  const [disabled, setDisabled] = useState(false);
  const [buttonCaption, setButtonCaption] = useState('Редактировать');

  useEffect(() => {
    if (isSaving) {
      setButtonCaption('Сохранение...');
      return;
    }
    if (isEditionMode) {
      setButtonCaption('Сохранить');
    }
    if (!isEditionMode) {
      setButtonCaption('Редактировать');
    }
  }, [isSaving, isEditionMode]);

  useEffect(() => {
    resetForm(user, true);
  }, [resetForm, user]);

  const onSubmit = (e) => {
    e.preventDefault();
    if (isEditionMode && values !== user) {
      handleUpdateUser(values);
      setIsEditionMode(false);
      return;
    }
    if (isEditionMode && values === user) {
      setIsEditionMode(false);
      return;
    }
    setIsEditionMode(true);
    resetForm(user, false);
  };

  useEffect(() => {
    if (values.name === user.name && user.email === values.email) {
      setDisabled(true);
      return;
    }
    setDisabled(false);
  }, [user.email, user.name, values.email, values.name]);

  return (
    <>
      <Header />
      <main className='main'>
        <form className='profile form' onSubmit={onSubmit}>
          <div className='profile__container'>
            <h1 className='profile__heading'>{`Привет, ${user.name}!`}</h1>
            <label htmlFor='name' className='profile__input-label'>
              Имя
              <input
                id='name'
                name='name'
                placeholder='Имя'
                type='text'
                className='profile__input'
                disabled={!isEditionMode || isSaving}
                onChange={handleChange}
                value={values.name || ''}
                minLength='2'
                maxLength='100'
                required
              />
            </label>
            <span
              className={`profile__input-error${
                errors.name === '' ? '' : ' profile__input-error_visible'
              }`}
            >
              {errors.name}
            </span>
            <label htmlFor='name' className={`profile__input-label${isEditionMode ? ' profile__input-label_active' : ''}`}>
              <span className='profile__input-label-caption'>Email</span>
              <input
                type='email'
                id='email'
                name='email'
                placeholder='Email'
                className='profile__input'
                disabled={!isEditionMode || isSaving}
                onChange={handleChange}
                value={values.email || ''}
                required
              />
            </label>
            <span
              className={`profile__input-error${
                errors.email === '' ? '' : ' profile__input-error_visible'
              }`}
            >
              {errors.email}
            </span>
          </div>
          <div className='profile-button-container'>
            <button
              className={`profile__button profile__button_type_link link${
                (isEditionMode && (!isFormValid || disabled)) ? ' profile__button_disabled' : ''
              }`}
              type='submit'
              disabled={isEditionMode && (!isFormValid || disabled)}
            >
              {buttonCaption}
            </button>
            <Link
              to='/signin'
              className='profile__link link'
              onClick={handleLogout}
            >
              Выйти из аккаунта
            </Link>
          </div>
        </form>
      </main>
    </>
  );
};

export default Profile;
