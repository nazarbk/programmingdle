import React from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Clasico from './Views/Clasico';
import Logro from './Views/Logro';

const Modos = () => {
    return(
        <div className='modos'>
            <Router>
                <nav>
                <ul>
                    <li><Link to="/clasico">Clasico</Link></li>
                    <li><Link to="/logro">Logro</Link></li>
                </ul>
                </nav>
                <Routes>
                    <Route path="/clasico" element={<Clasico />} />
                    <Route path="/logro" element={<Logro />} />
                </Routes>
            </Router>

            <div className='modo'>
                <div className='icono'>
                    <i class='bx bx-laptop'></i>
                </div>
                <div className='nombre'>
                    <h1>Clásico</h1>
                    <p>Adivina el personaje con pistas en cada intento</p>
                </div>
            </div>

            <div className='modo'>
                <div className='icono'>
                    <i class='bx bx-trophy'></i>
                </div>
                <div className='nombre'>
                    <h1>Logro</h1>
                    <p>Adivina el personaje según su logro</p>
                </div>
            </div>

            <div className='modo'>
                <div className='icono'>
                    <i class='bx bx-code-block'></i>
                </div>
                <div className='nombre'>
                    <h1>Lenguaje</h1>
                    <p>Adivina el lenguaje de programación</p>
                </div>
            </div>

            <div className='modo'>
                <div className='icono'>
                    <i class='bx bx-image-alt'></i>
                </div>
                <div className='nombre'>
                    <h1>Framework</h1>
                    <p>Adivina el Framework segín su logo</p>
                </div>
            </div>
        </div>
    )
}

export default Modos;