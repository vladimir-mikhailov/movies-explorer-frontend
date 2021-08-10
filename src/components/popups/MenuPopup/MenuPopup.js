import './MenuPopup.css';
import Popup from '../Popup/Popup';
import Navigation from '../../common/Navigation/Navigation';
import Account from '../../common/Account/Account';

const MenuPopup = ({ isOpen, onClose }) => (
  <Popup isOpen={isOpen} onClose={onClose}>
    <div className='menu-popup-container'>
      <Navigation type='burger-menu' showMain visibility='mobile'/>
      <Account visibility='mobile' />
    </div>

  </Popup>
);

export default MenuPopup;
