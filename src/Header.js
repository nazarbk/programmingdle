import React from 'react';
import './App.css';
import Typed from 'typed.js';

const Header = () => {
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
        //revisar
        typed.destroy();
    };

    return (
        <header className="header">
          <div className="menu">
            <i className='bx bx-menu'></i>
          </div>

          <div className='title'
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            <h1>
              &lt;<span className="multiple-text"></span>/&gt;
            </h1>
          </div>

          <div className="settings">
            <i className='bx bx-cog' ></i>
          </div>
        </header>
    );
}

export default Header;