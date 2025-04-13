import React, { useEffect, useRef } from 'react';

const HeaderLeft = ({ toggle, setToggle }) => {
  const menuRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setToggle(false);
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [setToggle]);

  return (
    <div className="header-left">
      <div className="header-logo">
        <strong>Salla7 bleedi</strong>
        <i className="bi bi-emoji-angry"></i>
      </div>
      <div ref={menuRef} onClick={() => setToggle(prev => !prev)} className="header-menu">
        {toggle ? (
          <i className="bi bi-x-lg"></i>
        ) : (
          <i className="bi bi-list"></i>
        )}
      </div>
    </div>
  );
};

export default HeaderLeft;
