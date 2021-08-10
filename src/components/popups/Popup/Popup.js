import './Popup.css';

const Popup = ({ children, isOpen, onClose }) => {
  const handleClickOnOverlay = (e) => {
    if (e.target === e.currentTarget) onClose();
  };
  return (
    // eslint-disable-next-line jsx-a11y/interactive-supports-focus,jsx-a11y/click-events-have-key-events,jsx-a11y/no-static-element-interactions
    <div
      className={`popup ${isOpen ? ' popup_open' : ''}`}
      onClick={handleClickOnOverlay}
    >
      <div className='popup__container'>
        <button
          className='popup__button-close'
          type='button'
          aria-label='Закрыть попап'
          onClick={onClose}
        />
        {children}
      </div>
    </div>
  );
};

export default Popup;
