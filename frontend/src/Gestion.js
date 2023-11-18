import React from 'react';
import './App.css';
import Header from './Header';
import { useEffect, useState } from 'react';

const Gestion = () => {
    const [personajes, setPersonajes] = useState([]);
    const [showContent, setShowContent] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        //Personajes
        fetch('https://programmingdle.onrender.com/Sugerencias')
        .then(response => {
          if (!response.ok) {
            throw new Error('La solicitud no pudo ser completada.');
          }
          return response.json();
        })
        .then(data => {
            console.log('PERSONAJES SUGERIDOS: ', data.resultado);
            setPersonajes(data.resultado);
        })
        .catch(error => {
          console.error(error);
        });
  
        setTimeout(() => {
          setLoading(false);
          setShowContent(true);
        }, 1000);
    }, []);

    const handleInputChange = (index, field, value) => {
        const updatedPersonajes = [...personajes];
        updatedPersonajes[index][field] = value;
        setPersonajes(updatedPersonajes);
    };

    return(
        <div className='clasico'>
            <Header/>

            
            {showContent ? (
                <div>
                    <h2 className='gestiontitle'><i class='bx bx-user-pin'></i> Últimos personajes sugeridos</h2>
                    <div className="personajes-row">
                    {personajes.slice(0, 6).map((personaje, index) => (
                    <div key={index} className="personaje-card">
                        <label htmlFor={`nombre-${index}`}>Nombre:</label>
                        <input
                            id={`nombre-${index}`}
                            type="text"
                            value={personaje.nombre}
                            onChange={(e) => handleInputChange(index, 'nombre', e.target.value)}
                        />

                        <label htmlFor={`genero-${index}`}>Género:</label>
                        <input
                            id={`genero-${index}`}
                            type="text"
                            value={personaje.genero}
                            onChange={(e) => handleInputChange(index, 'genero', e.target.value)}
                        />

                        <label htmlFor={`ambito-${index}`}>Ámbito:</label>
                        <input
                            id={`ambito-${index}`}
                            type="text"
                            value={personaje.ambito}
                            onChange={(e) => handleInputChange(index, 'ambito', e.target.value)}
                        />

                        <label htmlFor={`adjetivo-${index}`}>Adjetivo:</label>
                        <input
                            id={`adjetivo-${index}`}
                            type="text"
                            value={personaje.adjetivo}
                            onChange={(e) => handleInputChange(index, 'adjetivo', e.target.value)}
                        />

                        <label htmlFor={`año-${index}`}>Año:</label>
                        <input
                            id={`año-${index}`}
                            type="text"
                            value={personaje.año}
                            onChange={(e) => handleInputChange(index, 'año', e.target.value)}
                        />

                        <label htmlFor={`pais-${index}`}>País:</label>
                        <input
                            id={`pais-${index}`}
                            type="text"
                            value={personaje.pais}
                            onChange={(e) => handleInputChange(index, 'pais', e.target.value)}
                        />
                        
                        <div className='botones-container'>
                            <button className='delete' type="button"><i className='bx bx-trash'></i></button>
                            <button className='add' type="button"><i className='bx bxs-user-plus'></i></button>
                        </div>
                    </div>
                    ))}
                    </div>
                </div>
            ) : (
                <div className='loading'>
                    <i className='bx bx-loader-circle bx-spin'></i>
                </div>
            )}
        </div>
    )

}

export default Gestion