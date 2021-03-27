// Yarn
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

// Components
import Button from '../Button';

// Data
import { navbarData } from './navbarData.js';

// Styles
import './styles.scss';

const Navbar = () => {
  // state sidebar (open/close)
  const [sidebar, setSidebar] = useState(false);
  const toggleSidebar = () => setSidebar(!sidebar);

  // state header
  const [navbar, setNavbar] = useState('');

  const listenScrollEvent = event => {
    if (window.scrollY < 60) {
      return setNavbar('');
    } else if (window.scrollY > 70) {
      return setNavbar('plain');
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", listenScrollEvent);

    return () => window.removeEventListener("scroll", listenScrollEvent);
  }, []);
  return (
    <>
      {/* navbar desktop */}
      <div className={`navbar ${navbar}`}>
        <Link to='/' >
          <span className='navbar__logo'>Tuy'O</span>
        </Link>
        <ul className='navbar__menu__list'>
        {navbarData.map((item) => {
            return (
              <li key={item.id} className='navbar__menu__item'>
                <Link to={item.path}>
                {item.title}
                </Link>
              </li>
            )
          })}
        </ul>
        <div>
          <Link to="/inscription">
            <Button buttonStyle="btn--outline">S'identifier</Button>
          </Link>
        </div>


        {/* icon change from bars to cross on click */}
        <Link to='#' className='navbar__icon'>
        <i className={sidebar ? "fas fa-times" : "fas fa-bars"} onClick={toggleSidebar}></i>
        </Link>
      </div>

      {/* sidebar mobile */}
      <nav className={sidebar ? 'sidebar__menu active' : 'sidebar__menu'}>
        <ul className='sidebar__menu__list' onClick={toggleSidebar}>
          {navbarData.map((item) => {
            return (
              <li key={item.id} className='sidebar__menu__item'>
                <Link to={item.path}>
                  {item.icon}<span className="sidebar__menu__item__title">{item.title}</span>
                </Link>
              </li>
            )
          })}
        </ul>
      </nav>
    </>
  )
};

export default Navbar;
