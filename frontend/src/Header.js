import React, { useState } from 'react';
import './App.css';
import Typed from 'typed.js';
import { Link } from 'react-router-dom';
import { useEffect } from 'react';


const Header = () => {
    const [menuVisible, setMenuVisible] = useState(false);
    const [rol, setRol] = useState('');

    useEffect(() => {
      fetch('https://programmingdle.onrender.com/')
        .then(response => response.text())
        .then(data => {
  
          const nuevoUsuario = {
            ip: data,
          };
    
          const options = {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(nuevoUsuario),
          };
  
          const ipToSearch = data.toString();
  
          console.log('IP: ', ipToSearch);
  
          fetch(`https://programmingdle.onrender.com/Usuarios/${ipToSearch}`)
            .then(response => {
              if (!response.ok) {
                fetch('https://programmingdle.onrender.com/Usuarios', options)
                .then(response => {
                  if (!response.ok) {
                    throw new Error('La solicitud no pudo ser completada.');
                  }
                  return response.json();
                })
                .then(data => {
                  console.log('Usuario creado con éxito:', data);
                })
                .catch(error => {
                  console.error('Error al crear el usuario:', error);
                });
              }
              return response.json();
            })
            .then(data => {
              if (data.ok) {
                console.log('Usuario encontrado:', data.usuario);
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
                <Link to="/framework">Framework</Link>
              </li>
            </ul>
          </div>
        )}
      </div>
    );
}

export default Header;