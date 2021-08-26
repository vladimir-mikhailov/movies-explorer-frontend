import './ShowMoreButton.css';

const ShowMoreButton = ({ onClick }) => (
    <button
      className='show-more-button'
      onClick={onClick}
      type='button'
      aria-label='Показать ещё'
    >
      Ещё
    </button>
  );

export default ShowMoreButton;
