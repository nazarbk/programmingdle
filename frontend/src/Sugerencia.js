import React, { useState } from 'react';
import Header from './Header';
import { useEffect } from 'react';

const Sugerencia = () => {
  const [nombre, setNombre] = useState('');
  const [genero, setGenero] = useState('');
  const [ambito, setAmbito] = useState([]);
  const [adjetivo, setAdjetivo] = useState('');
  const [año, setaño] = useState('');
  const [dato, setDato] = useState('');
  const [pista, setPista] = useState('');
  const [pais, setPais] = useState('');

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
            console.log('DATA: ', data)
        })
        .catch(error => {
            console.error(error);
        });
    }, []);

  const handleNombreChange = (e) => {
    const nuevoNombre = e.target.value.replace(/[^A-Za-z]/g, '');
    setNombre(nuevoNombre);
  };

  const handleGeneroChange = (e) => {
    setGenero(e.target.value);
  };

  const handleAmbitoChange = (e) => {
    const opcionesSeleccionadas = Array.from(e.target.selectedOptions, (option) => option.value);
    setAmbito(opcionesSeleccionadas);
  };

  const handleAdjetivoChange = (e) => {
    const nuevoAdjetivo = e.target.value.replace(/[^A-Za-z]/g, '');
    setAdjetivo(nuevoAdjetivo);
  };

  const handleanioChange = (e) => {
    const nuevoanio = e.target.value.replace(/[^0-9]/g, '');
    setaño(nuevoanio);
  };

  const handleDatoChange = (e) => {
    setDato(e.target.value);
  };

  const handlePistaChange = (e) => {
    setPista(e.target.value);
  };

  const handlePaisChange = (e) => {
    setPais(e.target.value);
  };

  const handleEnviarClick = () => {
    if (
      nombre &&
      genero &&
      ambito.length > 0 &&
      adjetivo &&
      año &&
      dato &&
      pista &&
      pais
    ) {
      const ambitoString = ambito.length > 1 ? `${ambito.slice(0, -1).join(', ')} y ${ambito.slice(-1)}` : ambito[0];
      const nuevoPersonaje = {
        nombre,
        genero,
        ambito: ambitoString,
        adjetivo,
        año,
        dato,
        pista,
        pais,
      };

      console.log('NUEVO PERSONAJE: ', nuevoPersonaje);

      fetch('https://programmingdle.onrender.com/Sugerencias', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(nuevoPersonaje),
      })
        .then(response => response.json())
        .then(data => {
          console.log('Respuesta del servidor:', data);
        })
        .catch(error => {
          console.error('Error al hacer la solicitud:', error);
        });
    } else {
        alert('Debes rellenar todos los campos');
    }
  };

  return (
    <div className='clasico'>
        <Header/>
        <div className="sugerencia-container">
            <h2>Sugerencia</h2>
            <div className="input-container">
                <label className="sugerencia-label">Nombre:</label>
                <input className="sugerencia-input" type="text" value={nombre} onChange={handleNombreChange} />
            </div>
            <div className="input-container">
                <label className="sugerencia-label">Género:</label>
                <select className="sugerencia-input" value={genero} onChange={handleGeneroChange}>
                <option value="">Selecciona...</option>
                <option value="Masculino">Masculino</option>
                <option value="Femenino">Femenino</option>
                <option value="Otro">Otro</option>
                </select>
            </div>
            <div className="input-container">
                <label className="sugerencia-label">Ámbito:</label>
                <select multiple className="sugerencia-input" value={ambito} onChange={handleAmbitoChange}>
                <option value="Programación">Programación</option>
                <option value="Desarrollo Web">Desarrollo web</option>
                <option value="Videojuegos">Videojuegos</option>
                </select>
            </div>
            <div className="input-container">
                <label className="sugerencia-label">Adjetivo:</label>
                <input className="sugerencia-input" type="text" value={adjetivo} onChange={handleAdjetivoChange} />
            </div>
            <div className="input-container">
                <label className="sugerencia-label">Año:</label>
                <input className="sugerencia-input" type="text" value={año} onChange={handleanioChange} />
            </div>
            <div className="input-container">
                <label className="sugerencia-label">Dato interesante:</label>
                <input className="sugerencia-input" type="text" value={dato} onChange={handleDatoChange} />
            </div>
            <div className="input-container">
                <label className="sugerencia-label">Pista:</label>
                <input className="sugerencia-input" type="text" value={pista} onChange={handlePistaChange} />
            </div>
            <div className="input-container">
                <label className="sugerencia-label">País:</label>
                <input className="sugerencia-input" type="text" value={pais} onChange={handlePaisChange} />
            </div>
            <div className="input-container">
            <button onClick={handleEnviarClick}>Enviar</button>
      </div>
        </div>
    </div>
  );
};

export default Sugerencia;
