import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Navbar = ({ setIsOpenLibrary, isOpenLibrary }) => {
  const handleClickLibrary = () => {
    setIsOpenLibrary(!isOpenLibrary);
  };

  return (
    <nav className='navbar'>
      <div className='navbar__container'>
        <h2 className='title'>Waves</h2>
        <button className='library-button' onClick={handleClickLibrary}>
          <FontAwesomeIcon className='library-button__icon' icon='music' />
          <span className='library-button__text'>Library</span>
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
