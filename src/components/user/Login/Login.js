import { useEffect } from 'react';
import AuthForm from '../AuthForm/AuthForm';
import AuthHeader from '../AuthHeader/AuthHeader';
import AuthButton from '../AuthButton/AuthButton';
import Input from '../Input/Input';
import './Login.css';
import { useFormValidation } from '../../../hooks/useFormValidation';

const Login = ({ handleLogin, isSaving, message, setMessage }) => {
  const { values, errors, isFormValid, handleChange, resetForm } =
    useFormValidation();

  useEffect(() => {
    resetForm();
    setMessage('');
    return () => setMessage('');
  }, [setMessage, resetForm]);

  const onSubmit = (e) => {
    e.preventDefault();
    handleLogin(values);
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
            buttonText={`${isSaving ? 'Входим...' : 'Войти'}`}
            spanText='Ещё не зарегистрированы?'
            linkText='Регистрация'
            linkUrl='/signup'
            message={message}
            setMessage={setMessage}
            disabled={!isFormValid}
          />
        </AuthForm>
      </main>
    </div>
  );
};

export default Login;
