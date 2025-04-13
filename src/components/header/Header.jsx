import React, { useState } from 'react';
import HeaderRight from './HeaderRight';
import HeaderLeft from './HeaderLeft';
import Navbar from '../header/Navbar';

import "./header.css";

export const Header = () => {
  const [toggle, setToggle] = useState(false);

  return (
    <div className='header'>
      <HeaderLeft toggle={toggle} setToggle={setToggle} />
      <Navbar toggle={toggle} setToggle={setToggle} />
      <HeaderRight />
    </div>
  );
};
