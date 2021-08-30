import './AuthHeader.css';

const AuthHeader = ({ headingText }) => (
  <header className='auth-header'>
    <h1 className='auth-header__heading'>{headingText}</h1>
  </header>
);

export default AuthHeader;
