import { useEffect, useState } from 'react';
import AuthForm from '../AuthForm/AuthForm';
import AuthHeader from '../AuthHeader/AuthHeader';
import AuthButton from '../AuthButton/AuthButton';
import Input from '../Input/Input';
import './Register.css';

const Register = ({ handleRegister, isSaving, message, setMessage }) => {
  const [isFormValid, setIsFormValid] = useState(true);
  const [values, setValues] = useState({});
  const [errors, setErrors] = useState({});

  const namePattern = /^[A-Za-zА-Яа-яЁё\s-]+$/;

  useEffect(() => {
    setIsFormValid(true);
    setErrors({});
    setMessage('');
    return () => setMessage('');
  }, [setMessage]);

  const onSubmit = (e) => {
      e.preventDefault();
      handleRegister(values);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
    setErrors({ ...errors, [name]: e.target.validationMessage });
    setIsFormValid(e.target.closest('form').checkValidity());
  };

  return (
    <div className='register'>
      <AuthHeader headingText='Добро пожаловать!' />
      <main className='main'>
        <AuthForm onSubmit={onSubmit}>
          <div className='register__form-inputs-container'>
            <Input
              type='text'
              name='name'
              id='name'
              label='Имя'
              value={values.name || ''}
              onchange={handleChange}
              required
              errorMessage={errors.name}
              pattern={namePattern.toString().slice(1, -1)}
            />
            <Input
              type='email'
              name='email'
              id='email'
              label='E-mail'
              value={values.email || ''}
              onchange={handleChange}
              required
              errorMessage={errors.email}
            />
            <Input
              type='password'
              name='password'
              id='password'
              label='Пароль'
              value={values.password || ''}
              onchange={handleChange}
              required
              minLength={8}
              maxLength={100}
              errorMessage={errors.password}
            />
          </div>
          <AuthButton
            className='login__button'
            buttonText={`${isSaving ? 'Регистрация...' : 'Зарегистрироваться'}`}
            spanText='Уже зарегистрированы?'
            linkText='Войти'
            linkUrl='/signin'
            message={message}
            setMessage={setMessage}
            disabled={!isFormValid}
          />
        </AuthForm>
      </main>
    </div>
  );
};

export default Register;
