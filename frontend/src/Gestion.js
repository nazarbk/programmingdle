import React from 'react';
import './App.css';
import Header from './Header';
import { useEffect, useState } from 'react';

const Gestion = () => {
    const [personajes, setPersonajes] = useState([]);
    const [showContent, setShowContent] = useState(false);
    const [loading, setLoading] = useState(true);
    const [personajedeldia, setpersonajedeldia] = useState([]);
    const [personajedeldialogro, setpersonajedeldialogro] = useState([]);
    const [lenguajedeldia, setlenguajedeldia] = useState([]);
    const [iconodeldia, seticonodeldia] = useState([]);
    const [nombre, setNombre] = useState('');
    const [genero, setGenero] = useState('');
    const [ambito, setAmbito] = useState([]);
    const [adjetivo, setAdjetivo] = useState('');
    const [año, setaño] = useState('');
    const [dato, setDato] = useState('');
    const [pista, setPista] = useState('');
    const [pais, setPais] = useState('');
    const [enviadoConExito, setEnviadoConExito] = useState(false);

    const [lenguaje, setlenguaje] = useState('');
    const [codigo, setcodigo] = useState('');
    const [datocodigo, setdatocodigo] = useState('');
    const [pistacodigo, setpistacodigo] = useState('');

    const [nombretecnologia, setnombretecnologia] = useState('');
    const [icono, seticono] = useState('');
    const [datoicono, setdatoicono] = useState('');

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

    const handleLenguajeChange = (e) => {
        setlenguaje(e.target.value);
    };

    const handleCodigoChange = (e) => {
        setcodigo(e.target.value);
    };

    const handlePistaCodigoChange = (e) => {
        setpistacodigo(e.target.value);
    };

    const handleDatoCodigoChange = (e) => {
        setdatocodigo(e.target.value);
    };

    const handleNombreIcono = (e) => {
        setnombretecnologia(e.target.value);
    };

    const handleIcono = (e) => {
        seticono(e.target.value);
    };

    const handleDatoIcono = (e) => {
        setdatoicono(e.target.value);
    };


    const handlePopupToggle = () => {
        setEnviadoConExito(!enviadoConExito);
    };

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

        fetch('https://programmingdle.onrender.com/Personajes')
        .then(response => {
          if (!response.ok) {
            throw new Error('La solicitud no pudo ser completada.');
          }
          return response.json();
        })
        .then(data => {
            const personajeDelDia = data.resultado.find(personaje => personaje.deldia === true);
            const personajeDelDiaLogro = data.resultado.find(personaje => personaje.deldialogro === true);

            console.log('PERSONAJDE DL DIA: ', personajeDelDia)
            if (personajeDelDia) {
                setpersonajedeldia(personajeDelDia);
            } else {
                console.warn('No se encontró un personaje del día en los resultados.');
            }

            console.log('PERSONAJDE DL DIA: ', personajeDelDiaLogro)
            if (personajeDelDiaLogro) {
                setpersonajedeldialogro(personajeDelDiaLogro);
            } else {
                console.warn('No se encontró un personaje del día en los resultados.');
            }
        })
        .catch(error => {
          console.error(error);
        });

        fetch('https://programmingdle.onrender.com/Lenguajes')
        .then(response => {
          if (!response.ok) {
            throw new Error('La solicitud no pudo ser completada.');
          }
          return response.json();
        })
        .then(data => {
            const lenguajeDelDia = data.resultado.find(lenguaje => lenguaje.deldia === true);

            console.log('Lenguaje DL DIA: ', lenguajeDelDia)
            if (lenguajeDelDia) {
                setlenguajedeldia(lenguajeDelDia);
            } else {
                console.warn('No se encontró un lenguaje del día en los resultados.');
            }
        })
        .catch(error => {
          console.error(error);
        });

        fetch('https://programmingdle.onrender.com/Frameworks')
        .then(response => {
          if (!response.ok) {
            throw new Error('La solicitud no pudo ser completada.');
          }
          return response.json();
        })
        .then(data => {
            const iconoDelDia = data.resultado.find(icono => icono.deldia === true);

            console.log('Lenguaje DL DIA: ', iconoDelDia)
            if (iconoDelDia) {
                seticonodeldia(iconoDelDia);
            } else {
                console.warn('No se encontró un lenguaje del día en los resultados.');
            }
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

    const handleAddClick = async (index) => {
        const personajeToAdd = personajes[index];
    
        try {
          const response = await fetch('https://programmingdle.onrender.com/Personajes', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(personajeToAdd),
          });
    
          if (!response.ok) {
            console.log('RESPONSE: ', response);
            throw new Error('La solicitud POST para agregar el personaje no fue exitosa.');
          }

            const nuevoPersonajeId = personajeToAdd._id;
            console.log('PERSONAJE ID: ', personajeToAdd._id);
            const deleteResponse = await fetch(`https://programmingdle.onrender.com/Sugerencias/${nuevoPersonajeId}`, {
                method: 'DELETE',
            });

            if (!deleteResponse.ok) {
                console.error('Error al eliminar la sugerencia después de agregar el personaje:', deleteResponse.status);
            }
    
            // Eliminar el personaje de la lista local
            const updatedPersonajes = [...personajes];
            updatedPersonajes.splice(index, 1);
            setPersonajes(updatedPersonajes);
        } catch (error) {
          console.error('Error al agregar el personaje:', error);
        }
      };

      const handleDeleteClick = async (index) => {
        const personajeToDelete = personajes[index];
    
        try {
            const nuevoPersonajeId = personajeToDelete._id;
            console.log('PERSONAJE ID: ', personajeToDelete._id);
            const deleteResponse = await fetch(`https://programmingdle.onrender.com/Sugerencias/${nuevoPersonajeId}`, {
                method: 'DELETE',
            });

            if (!deleteResponse.ok) {
                console.error('Error al eliminar la sugerencia después de agregar el personaje:', deleteResponse.status);
            }

            // Eliminar el personaje de la lista local
            const updatedPersonajes = [...personajes];
            updatedPersonajes.splice(index, 1);
            setPersonajes(updatedPersonajes);
        } catch (error) {
          console.error('Error al agregar el personaje:', error);
        }
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
    
          fetch('https://programmingdle.onrender.com/Personajes', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(nuevoPersonaje),
          })
            .then(response => response.json())
            .then(data => {
                if (data.ok) {
                    setEnviadoConExito(true);
                    setNombre('');
                    setGenero('');
                    setAmbito([]);
                    setAdjetivo('');
                    setaño('');
                    setDato('');
                    setPista('');
                    setPais('');
                  } else {
                    setEnviadoConExito(false);
                  }
            })
            .catch(error => {
              console.error('Error al hacer la solicitud:', error);
            });
        } else {
            alert('Debes rellenar todos los campos');
        }
      };

      const handleEnviarLenguajeClick= () => {
        if (
          lenguaje &&
          codigo &&
          datocodigo &&
          pistacodigo
        ) {
          const nuevoLenguaje = {
            lenguaje,
            codigo,
            datocodigo,
            pistacodigo,
          };
    
          fetch('https://programmingdle.onrender.com/Lenguajes', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(nuevoLenguaje),
          })
            .then(response => response.json())
            .then(data => {
                if (data.ok) {
                    setEnviadoConExito(true);
                    setlenguaje('');
                    setcodigo('');
                    setpistacodigo('');
                    setdatocodigo('');
                  } else {
                    setEnviadoConExito(false);
                  }
            })
            .catch(error => {
              console.error('Error al hacer la solicitud:', error);
            });
        } else {
            alert('Debes rellenar todos los campos');
        }
      };

      const handleEnviarIconoClick= () => {

        if (
          nombretecnologia &&
          icono &&
          datoicono
        ) {
          const nuevoIcono = {
            nombretecnologia,
            icono,
            datoicono,
          };
    
          fetch('https://programmingdle.onrender.com/Frameworks', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(nuevoIcono),
          })
            .then(response => response.json())
            .then(data => {
                if (data.ok) {
                    setEnviadoConExito(true);
                    setnombretecnologia('');
                    seticono('');
                    setdatoicono('');
                  } else {
                    setEnviadoConExito(false);
                  }
            })
            .catch(error => {
              console.error('Error al hacer la solicitud:', error);
            });
        } else {
            alert('Debes rellenar todos los campos');
        }
      };
    return(
        <div className='clasico'>
            <Header/>

            
            {showContent ? (
                <div>
                    <h2 className='gestiontitle'><i className='bx bx-user-pin'></i> Últimos personajes sugeridos</h2>
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

                        <label htmlFor={`dato-${index}`}>Dato:</label>
                        <input
                            id={`dato-${index}`}
                            type="text"
                            value={personaje.dato}
                            onChange={(e) => handleInputChange(index, 'dato', e.target.value)}
                        />

                        <label htmlFor={`pista-${index}`}>País:</label>
                        <input
                            id={`pista-${index}`}
                            type="text"
                            value={personaje.pista}
                            onChange={(e) => handleInputChange(index, 'pista', e.target.value)}
                        />

                        <label htmlFor={`pais-${index}`}>País:</label>
                        <input
                            id={`pais-${index}`}
                            type="text"
                            value={personaje.pais}
                            onChange={(e) => handleInputChange(index, 'pais', e.target.value)}
                        />
                        
                        <div className='botones-container'>
                            <button className='delete' type="button" onClick={() => handleDeleteClick(index)}><i className='bx bx-trash'></i></button>
                            <button className='add' type="button" onClick={() => handleAddClick(index)}><i className='bx bxs-user-plus'></i></button>
                        </div>
                    </div>
                    ))}
                    </div>

                    <h2 className='gestiontitle'><i className='bx bx-notepad'></i> Añadir </h2>
                    <div className="personajes-row">
                    
                        <div className="personaje-card2">
                            <h3>Personaje</h3>
                            <label>Nombre:</label>
                            <input
                                type="text" value={nombre} onChange={handleNombreChange}
                            />

                            <label>Género:</label>
                            <select value={genero} onChange={handleGeneroChange}>
                                <option value="">Selecciona...</option>
                                <option value="Masculino">Masculino</option>
                                <option value="Femenino">Femenino</option>
                                <option value="Otro">Otro</option>
                            </select>

                            <label>Ámbito:</label>
                            <select multiple value={ambito} onChange={handleAmbitoChange}>
                                <option value="Programación">Programación</option>
                                <option value="Desarrollo Web">Desarrollo web</option>
                                <option value="Videojuegos">Videojuegos</option>
                            </select>

                            <label>Adjetivo:</label>
                            <input
                                type="text"
                                value={adjetivo} onChange={handleAdjetivoChange}
                            />

                            <label>Año:</label>
                            <input
                                type="text"
                                value={año} onChange={handleanioChange}
                            />

                            <label>Dato:</label>
                            <input
                                type="text"
                                value={dato} onChange={handleDatoChange}
                            />

                            <label>Pista:</label>
                            <input
                                type="text"
                                value={pista} onChange={handlePistaChange}
                            />

                            <label>País:</label>
                            <input
                                type="text"
                                value={pais} onChange={handlePaisChange}
                            />
                            
                            <div className='botones-container'>
                                <button className='add' type="button" onClick={handleEnviarClick}><i className='bx bxs-user-plus'></i></button>
                            </div>
                        </div>

                        <div className="personaje-card2">
                            <h3>Lenguaje</h3>
                            <label>Nombre:</label>
                            <input
                                type="text" value={lenguaje} onChange={handleLenguajeChange}
                            />

                            <label>Código:</label>
                            <textarea
                                value={codigo}
                                onChange={handleCodigoChange}
                                style={{ minHeight: '30px', maxHeight: '200px', overflow: 'auto' }}
                            />

                            <label>Dato:</label>
                            <input
                                type="text"
                                value={datocodigo} onChange={handleDatoCodigoChange}
                            />

                            <label>Pista:</label>
                            <input
                                type="text"
                                value={pistacodigo} onChange={handlePistaCodigoChange}
                            />
                            
                            <div className='botones-container'>
                                <button className='add' type="button" onClick={handleEnviarLenguajeClick}><i className='bx bxs-user-plus'></i></button>
                            </div>
                        </div>

                        <div className="personaje-card2">
                            <h3>Tecnologías</h3>
                            <label>Nombre:</label>
                            <input
                                type="text" value={nombretecnologia} onChange={handleNombreIcono}
                            />

                            <label>Icon:</label>
                            <input
                                type="text"
                                value={icono} onChange={handleIcono}
                            />

                            <label>Dato:</label>
                            <input
                                type="text"
                                value={datoicono} onChange={handleDatoIcono}
                            />
                            
                            <div className='botones-container'>
                                <button className='add' type="button" onClick={handleEnviarIconoClick}><i className='bx bxs-user-plus'></i></button>
                            </div>
                        </div>
                    </div>

                    {enviadoConExito && (
                        <div className="overlay">
                            <div className="popup3">
                            <button className="close-button" onClick={handlePopupToggle}>
                                <i className="bx bx-x"></i>
                            </button>
                            <h2>Almacenado con éxito</h2>
                            </div>
                        </div>
                    )}
                    
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