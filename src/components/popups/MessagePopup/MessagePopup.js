import './MessagePopup.css';

const MessagePopup = ({ isOpen, onClose, message }) => {
  const handleClickOnOverlay = (e) => {
    if (e.target === e.currentTarget) onClose();
  };

  return (
    // eslint-disable-next-line jsx-a11y/click-events-have-key-events,jsx-a11y/no-static-element-interactions
    <div
      className={`message-popup ${isOpen ? ' message-popup_open' : ''}`}
      onClick={handleClickOnOverlay}
    >
      <div className='message-popup__container'>
        <button
          className='message-popup__button-close'
          type='button'
          aria-label='Закрыть попап'
          onClick={onClose}
        />
        <p className='message-popup__text'>{message}</p>
      </div>
    </div>
  );
};

export default MessagePopup;
