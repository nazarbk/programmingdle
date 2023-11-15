import React, { useState } from 'react';
import './App.css';
import Typed from 'typed.js';
import { Link } from 'react-router-dom';
import { useEffect } from 'react';


const Header = () => {
    const [menuVisible, setMenuVisible] = useState(false);

    const toggleMenu = () => {
      setMenuVisible(!menuVisible);
    };

    let typed = null;

    const handleMouseEnter = () => {
        typed = new Typed('.multiple-text', {
        strings: ['Programmingdle'],
        typeSpeed: 100,
        backSpeed: 100,
        backDelay: 1000,
        loop: false
        });
    };

    const handleMouseLeave = () => {
        if(typed){
          typed.destroy();
        }
    };

    return (
      <div className="header-container">
        <header className="header">
          <div className="menu" onClick={toggleMenu}>
            <i className={`bx ${menuVisible ? 'bx-x' : 'bx-menu'}`}></i>
          </div>

          <div className='title'
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            <h1>
            <Link to="/">
              &lt;<span className="multiple-text"></span>/&gt;
            </Link>
            </h1>
          </div>

          <div className="settings">
            <Link to="/sugerencia">
              <i className='bx bx-add-to-queue'></i>
            </Link>
          </div>
        </header>

        {menuVisible && (
          <div className="menu-dropdown">
            <ul>
              <li>
                <Link to="/clasico">Clásico</Link>
              </li>
              <li>
                <Link to="/logro">Logro</Link>
              </li>
              <li>
                <Link to="/lenguaje">Lenguaje</Link>
              </li>
              <li>
                <Link to="/icono">Icono</Link>
              </li>
            </ul>
          </div>
        )}
      </div>
    );
}

export default Header;