import React from 'react';
import Header from './Header';
import { useState, useEffect } from 'react';

const Gestion = () => {
    const [showContent, setShowContent] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
          setTimeout(() => {
            setLoading(false);
            setShowContent(true);
          }, 1000);
      }, []);

  return (
    <div className="gestion-container">
      <Header />

      <div className="politica-privacidad">
        <h1>Programmingdle - Política de Privacidad</h1>

        <div className="section">
          <h2>Recopilación de Direcciones IP</h2>
          <p>
            En nuestra aplicación, recopilamos la dirección IP de los usuarios con el único propósito de almacenar el estado de su partida. Esta información se utiliza exclusivamente para mejorar la experiencia del usuario y no se comparte con terceros con fines lucrativos. No realizamos un seguimiento de la dirección IP con el objetivo de identificar o rastrear a usuarios individualmente fuera del contexto de la aplicación.
          </p>
        </div>

        <div className="section">
          <h2>Eliminación Diaria de Datos</h2>
          <p>
            Garantizamos la privacidad de los usuarios mediante la eliminación diaria de las direcciones IP almacenadas en nuestra base de datos. Este proceso asegura que la información recopilada se elimine regularmente y no se retenga más allá de lo necesario para el funcionamiento de la aplicación.
          </p>
        </div>

        <p>Para más detalles o preguntas relacionadas con nuestra política de privacidad, no dudes en <a href="mailto:quizmizdevs@gmail.com"><span className='enlase'>contactarnos</span></a>.</p>
      </div>
    </div>
  );
}

export default Gestion;
