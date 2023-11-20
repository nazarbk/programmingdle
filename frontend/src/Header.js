import React, { useState } from 'react';
import './App.css';
import Typed from 'typed.js';
import { Link } from 'react-router-dom';
import { useEffect } from 'react';


const Header = () => {
  const [admin, setAdmin] = useState(true);

  useEffect(() => {
    fetch('https://programmingdle.onrender.com/')
      .then(response => response.text())
      .then(data => {

        fetch(`https://programmingdle.onrender.com/Usuarios/${data}`)
          .then(response => {
            if (!response.ok) {
              console.log('RESPONSE: ', response);
            }
            return response.json();
          })
          .then(data => {
            if (data) {
              console.log('Usuario encontrado:', data.usuario[0].rol);
              if(data.usuario[0].rol === 'admin'){
                setAdmin(true);
              }
            } else {
              console.log('Usuario NO encontrado:', data.usuario);
            }
          })
          .catch(error => {
            console.error('Error al buscar el usuario:', error);
          });
        })
      .catch(error => {
        console.error('Error al obtener la dirección IP:', error);
      });
  }, []);

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

    const mostrarAlerta = () => {
      alert('No tienes acceso a este apartado :(');
    }

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
            <i className='bx bx-message-alt-add'></i>
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
              <li>
                {admin ? (
                  <div>
                    <Link to="/gestion"><i className='bx bx-lock-open-alt'></i> Gestión</Link>
                  </div>
                ) : (
                  <div>
                    <Link onClick={mostrarAlerta} className='nopermitido'><i className='bx bx-lock-alt'></i> Gestión</Link>
                  </div>
                )}
              </li>
            </ul>
          </div>
        )}
      </div>
    );
}

export default Header;