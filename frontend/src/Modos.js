import React from 'react';
import './App.css';
import { Link } from 'react-router-dom';

const Modos = () => {
    return(
        <div className='modos'>
            <div className='modo'>
                <div className='icono'>
                    <i className='bx bx-laptop'></i>
                </div>
                <Link to="/clasico">
                <div className='nombre'>
                    <h1>Clásico</h1>
                    <p>Adivina el personaje con pistas en cada intento</p>
                </div>
                </Link>
            </div>

            <div className='modo'>
                <div className='icono'>
                    <i className='bx bx-trophy'></i>
                </div>
                <Link to="/logro">
                <div className='nombre'>
                    <h1>Logro</h1>
                    <p>Adivina el personaje según su logro</p>
                </div>
                </Link>
            </div>

            <div className='modo'>
                <div className='icono'>
                    <i className='bx bx-code-block'></i>
                </div>
                <Link to="/lenguaje">
                <div className='nombre'>
                    <h1>Lenguaje</h1>
                    <p>Adivina el lenguaje de programación</p>
                </div>
                </Link>
            </div>

            <div className='modo'>
                <div className='icono'>
                    <i className='bx bx-image-alt'></i>
                </div>
                <Link to="/palabra">
                <div className='nombre'>
                    <h1>Framework</h1>
                    <p>Adivina el Framework segín su logo</p>
                </div>
                </Link>
            </div>
        </div>
    )
}

export default Modos;