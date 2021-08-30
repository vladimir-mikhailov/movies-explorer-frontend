import { useEffect, useState } from 'react';
import AuthForm from '../AuthForm/AuthForm';
import AuthHeader from '../AuthHeader/AuthHeader';
import AuthButton from '../AuthButton/AuthButton';
import Input from '../Input/Input';
import './Login.css';

const Login = ({ handleLogin }) => {
  const [isFormValid, setIsFormValid] = useState(true);
  const [values, setValues] = useState({});
  const [errors, setErrors] = useState({});

  useEffect(() => {
    setIsFormValid(true);
    setErrors({});
  }, []);

  const onSubmit = (e) => {
    e.preventDefault();
    handleLogin(values);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
    setErrors({ ...errors, [name]: e.target.validationMessage });
    setIsFormValid(e.target.closest('form').checkValidity());
  };

  return (
    <div className='login'>
      <AuthHeader headingText='Рады видеть!' />
      <main className='main'>
        <AuthForm onSubmit={onSubmit}>
          <div className='login__form-inputs-container'>
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
            buttonText='Войти'
            spanText='Ещё не зарегистрированы?'
            linkText='Регистрация'
            linkUrl='/signup'
            disabled={!isFormValid}
          />
        </AuthForm>
      </main>
    </div>
  );
};

export default Login;
