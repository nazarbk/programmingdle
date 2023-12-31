import React from 'react';
import './App.css';
import Header from './Header';
import { useEffect, useState } from 'react';

const Gestion = () => {
    const [personajes, setPersonajes] = useState([]);
    const [personajesbd, setPersonajesbd] = useState([]);
    const [personajeSeleccionado, setPersonajeSeleccionado] = useState(null);
    const [personajeDelDiaNuevo, setPersonajeDelDiaNuevo] = useState(null);
    const [personajeDelDiaNuevoLogro, setPersonajeDelDiaNuevoLogro] = useState(null);

    const [lenguajesbd, setLenguajesbd] = useState([]);
    const [lenguajeDelDiaNuevo, setLenguajeDelDiaNuevo] = useState(null);
    const [lenguajeSeleccionado, setLenguajeSeleccionado] = useState(null);

    const [iconosbd, setIconosbd] = useState([]);
    const [iconoDelDiaNuevo, setIconoDelDiaNuevo] = useState(null);
    const [iconoSeleccionado, setIconoSeleccionado] = useState(null);

    const [mostrarContenido2, setMostrarContenido2] = useState(false);
    const [mostrarContenido3, setMostrarContenido3] = useState(false);
    const [mostrarContenido4, setMostrarContenido4] = useState(false);

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

    //Lenguaje

    const handleLenguajeUpdate = (e) => {
        setLenguajeSeleccionado({
            ...lenguajeSeleccionado,
            lenguaje: e.target.value,
        });
    };
    
      const handleCodigoUpdate = (e) => {
        setLenguajeSeleccionado({
          ...lenguajeSeleccionado,
          codigo: e.target.value,
        });
      };
    
      const handleDatoCodigoUpdate = (e) => {
        setLenguajeSeleccionado({
          ...lenguajeSeleccionado,
          dato: e.target.value,
        });
      };
    
      const handlePistaCodigoUpdate = (e) => {
        setLenguajeSeleccionado({
          ...lenguajeSeleccionado,
          pista: e.target.value,
        });
      };

      //Icono

      const handleIconoUpdate = (e) => {
        setIconoSeleccionado({
            ...iconoSeleccionado,
            nombre: e.target.value,
        });
    };
    
      const handleDatoIconoUpdate = (e) => {
        setIconoSeleccionado({
          ...iconoSeleccionado,
          dato: e.target.value,
        });
      };
    
      const handleIconIconoUpdate = (e) => {
        setIconoSeleccionado({
          ...iconoSeleccionado,
          icon: e.target.value,
        });
      };

      //Personaje
        const handlePersonajeUpdate = (e) => {
            setPersonajeSeleccionado({
                ...personajeSeleccionado,
                nombre: e.target.value,
            });
        };

        const handleGeneroUpdate = (e) => {
            setPersonajeSeleccionado({
                ...personajeSeleccionado,
                genero: e.target.value,
            });
        };

        const handleAmbitoUpdate = (e) => {
            setPersonajeSeleccionado({
                ...personajeSeleccionado,
                ambito: e.target.value,
            });
        };

        const handleAdjetivoUpdate = (e) => {
            setPersonajeSeleccionado({
                ...personajeSeleccionado,
                adjetivo: e.target.value,
            });
        };

        const handleAñoUpdate = (e) => {
            const inputValue = e.target.value;

            const numericValue = inputValue.replace(/[^0-9]/g, '');

            setPersonajeSeleccionado({
                ...personajeSeleccionado,
                año: numericValue,
            });
             
        };

        const handleDatoUpdate = (e) => {
            setPersonajeSeleccionado({
                ...personajeSeleccionado,
                dato: e.target.value,
            });
        };

        const handlePistaUpdate = (e) => {
            setPersonajeSeleccionado({
                ...personajeSeleccionado,
                pista: e.target.value,
            });
        };

        const handlePaisUpdate = (e) => {
            setPersonajeSeleccionado({
                ...personajeSeleccionado,
                pais: e.target.value,
            });
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
            setPersonajesbd(data.resultado);

            const personajeDelDia = data.resultado.find(personaje => personaje.deldia === true);
            const personajeDelDiaLogro = data.resultado.find(personaje => personaje.deldialogro === true);

            if (personajeDelDia) {
                setpersonajedeldia(personajeDelDia);

            } else {
                console.warn('No se encontró un personaje del día en los resultados.');
            }

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
            setLenguajesbd(data.resultado);

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
            setIconosbd(data.resultado);

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
            if (!personajeToAdd.nombre || !personajeToAdd.genero || !personajeToAdd.ambito || !personajeToAdd.adjetivo || !personajeToAdd.año || !personajeToAdd.dato || !personajeToAdd.pista || !personajeToAdd.pais) {
                alert('Debes rellenar todos los campos');
            }else{
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
                
                setEnviadoConExito(true);
                actualizarPersonaje();
                const updatedPersonajes = [...personajes];
                updatedPersonajes.splice(index, 1);
                setPersonajes(updatedPersonajes);
            }
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

            setEnviadoConExito(true);
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
                    actualizarPersonaje();
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
                    actualizarLenguaje();
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
                    actualizarIcono();
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

      const handleSaveClick = async () => {
        try {
            if (personajedeldia && personajeDelDiaNuevo) {
                const response = await fetch('https://programmingdle.onrender.com/Personajes', {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        personajeDelDia: personajedeldia,
                        personajeDelDiaNuevo: personajeDelDiaNuevo,
                    }),
                });
    
                if (!response.ok) {
                    throw new Error('La solicitud PUT no fue exitosa.');
                }
                actualizarPersonaje();
                setEnviadoConExito(true);
                console.log('Solicitud PUT exitosa');
            } else {
                console.error('Los personajes no están definidos correctamente');
            }
        } catch (error) {
            console.error('Error al hacer la solicitud PUT:', error);
        }
    };

    const handleSave2Click = async () => {
        try {
            if (personajedeldialogro && personajeDelDiaNuevoLogro) {
                const response = await fetch('https://programmingdle.onrender.com/Personajes', {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        personajeDelDiaLogro: personajedeldialogro,
                        personajeDelDiaNuevoLogro: personajeDelDiaNuevoLogro,
                    }),
                });
    
                if (!response.ok) {
                    throw new Error('La solicitud PUT no fue exitosa.');
                }
                actualizarPersonaje();
                setEnviadoConExito(true);
                console.log('Solicitud PUT exitosa');
            } else {
                console.error('Los personajes no están definidos correctamente');
            }
        } catch (error) {
            console.error('Error al hacer la solicitud PUT:', error);
        }
    };

    const handleSaveLenguajeClick = async () => {
        try {
            if (lenguajedeldia && lenguajeDelDiaNuevo) {
                const response = await fetch('https://programmingdle.onrender.com/Lenguajes', {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        lenguajeDelDia: lenguajedeldia,
                        lenguajeDelDiaNuevo: lenguajeDelDiaNuevo,
                    }),
                });
    
                if (!response.ok) {
                    throw new Error('La solicitud PUT no fue exitosa.');
                }
                actualizarLenguaje();
                setEnviadoConExito(true);
                console.log('Solicitud PUT exitosa');
            } else {
                console.error('Los lenguajes no están definidos correctamente');
            }
        } catch (error) {
            console.error('Error al hacer la solicitud PUT:', error);
        }
    };

    const handleSaveIconoClick = async () => {
        try {
            if (iconodeldia && iconoDelDiaNuevo) {
                const response = await fetch('https://programmingdle.onrender.com/Frameworks', {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        iconoDelDia: iconodeldia,
                        iconoDelDiaNuevo: iconoDelDiaNuevo,
                    }),
                });
    
                if (!response.ok) {
                    throw new Error('La solicitud PUT no fue exitosa.');
                }
                actualizarIcono();
                setEnviadoConExito(true);
                console.log('Solicitud PUT exitosa');
            } else {
                console.error('Los lenguajes no están definidos correctamente');
            }
        } catch (error) {
            console.error('Error al hacer la solicitud PUT:', error);
        }
    };

    const handleUpdatePersonaje= () => {
        console.log('Personaje sleeccionado :', personajeSeleccionado);

        if (
            personajeSeleccionado.nombre.trim() !== '' &&
            personajeSeleccionado.genero.trim() !== '' &&
            personajeSeleccionado.ambito.trim() !== '' &&
            personajeSeleccionado.adjetivo.trim() !== '' &&
            personajeSeleccionado.año !== '' &&
            personajeSeleccionado.dato.trim() !== '' &&
            personajeSeleccionado.pista.trim() !== '' &&
            personajeSeleccionado.pais.trim() !== ''
        ) {
          fetch('https://programmingdle.onrender.com/Personajes', {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                actualizarPersonaje: personajeSeleccionado,
            }),
          })
            .then(response => response.json())
            .then(data => {
                if (data.ok) {
                    actualizarPersonaje();
                    setPersonajeSeleccionado('');
                    setEnviadoConExito(true);
                  } else {
                    setEnviadoConExito(false);
                  }
            })
            .catch(error => {
              console.error('Error al hacer la solicitud:', error);
            });
        } else {
            alert('No puedes dejar ningun campo vacío');
        }
      };

    const handleUpdateCodigo= () => {
        console.log('HOLIII: ', lenguajeSeleccionado);

        if (
            lenguajeSeleccionado.lenguaje.trim() !== '' &&
            lenguajeSeleccionado.codigo.trim() !== '' &&
            lenguajeSeleccionado.dato.trim() !== '' &&
            lenguajeSeleccionado.pista.trim() !== ''
        ) {
          fetch('https://programmingdle.onrender.com/Lenguajes', {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                actualizarLenguaje: lenguajeSeleccionado,
            }),
          })
            .then(response => response.json())
            .then(data => {
                if (data.ok) {
                    actualizarLenguaje();
                    setLenguajeSeleccionado('');
                    setEnviadoConExito(true);
                  } else {
                    setEnviadoConExito(false);
                  }
            })
            .catch(error => {
              console.error('Error al hacer la solicitud:', error);
            });
        } else {
            alert('No puedes dejar ningun campo vacío');
        }
      };

      const handleUpdateIcono= () => {
        if (
            iconoSeleccionado.nombre.trim() !== '' &&
            iconoSeleccionado.icon.trim() !== '' &&
            iconoSeleccionado.dato.trim() !== ''
        ) {
          fetch('https://programmingdle.onrender.com/Frameworks', {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                actualizarIcono: iconoSeleccionado,
            }),
          })
            .then(response => response.json())
            .then(data => {
                if (data.ok) {
                    actualizarIcono();
                    setIconoSeleccionado('');
                    setEnviadoConExito(true);
                  } else {
                    setEnviadoConExito(false);
                  }
            })
            .catch(error => {
              console.error('Error al hacer la solicitud:', error);
            });
        } else {
            alert('No puedes dejar ningun campo vacío');
        }
      };

      const eliminarPersonaje = async () => {
        console.log('PERONSJAE: ',personajeSeleccionado);

        if(personajeSeleccionado.deldia === false && personajeSeleccionado.deldialogro === false){
            if(personajeSeleccionado._id){
                try {
                    const deleteResponse = await fetch(`https://programmingdle.onrender.com/Personajes/${personajeSeleccionado._id}`, {
                        method: 'DELETE',
                    });
        
                    if (!deleteResponse.ok) {
                        console.error('Error al eliminar la sugerencia después de agregar el personaje:', deleteResponse.status);
                    }

                    actualizarPersonaje();
                    setPersonajeSeleccionado('');
                    setEnviadoConExito(true);
                } catch (error) {
                  console.error('Error al agregar el personaje:', error);
                }
            }else{
                alert('Algo no ha ido como se esperaba');
            }
        }else{
            alert('No se puede elimar un personaje del día');
        }
      };

      const eliminarLenguaje = async () => {

        if(lenguajeSeleccionado.deldia === false){
            if(lenguajeSeleccionado._id){
                try {
                    const deleteResponse = await fetch(`https://programmingdle.onrender.com/Lenguajes/${lenguajeSeleccionado._id}`, {
                        method: 'DELETE',
                    });
        
                    if (!deleteResponse.ok) {
                        console.error('Error al eliminar la sugerencia después de agregar el personaje:', deleteResponse.status);
                    }

                    actualizarLenguaje();
                    setLenguajeSeleccionado('');
                    setEnviadoConExito(true);
                } catch (error) {
                  console.error('Error al agregar el personaje:', error);
                }
            }else{
                alert('Algo no ha ido como se esperaba');
            }
        }else{
            alert('No se puede elimar un lenguaje del día');
        }
      };

      const eliminarIcono = async () => {

        if(iconoSeleccionado.deldia === false){
            if(iconoSeleccionado._id){
                try {
                    const deleteResponse = await fetch(`https://programmingdle.onrender.com/Frameworks/${iconoSeleccionado._id}`, {
                        method: 'DELETE',
                    });
        
                    if (!deleteResponse.ok) {
                        console.error('Error al eliminar la sugerencia después de agregar el personaje:', deleteResponse.status);
                    }

                    actualizarIcono();
                    setIconoSeleccionado('');
                    setEnviadoConExito(true);
                } catch (error) {
                  console.error('Error al agregar el personaje:', error);
                }
            }else{
                alert('Algo no ha ido como se esperaba');
            }
        }else{
            alert('No se puede elimar un icono del día');
        }
      };

    const actualizarIcono = () => {
        fetch('https://programmingdle.onrender.com/Frameworks')
        .then(response => {
          if (!response.ok) {
            throw new Error('La solicitud no pudo ser completada.');
          }
          return response.json();
        })
        .then(data => {
            setIconosbd(data.resultado);
        })
        .catch(error => {
          console.error(error);
        });
    }

    const actualizarLenguaje = () => {
        fetch('https://programmingdle.onrender.com/Lenguajes')
        .then(response => {
          if (!response.ok) {
            throw new Error('La solicitud no pudo ser completada.');
          }
          return response.json();
        })
        .then(data => {
            setLenguajesbd(data.resultado);
        })
        .catch(error => {
          console.error(error);
        });
    }

    const actualizarPersonaje = () => {
        fetch('https://programmingdle.onrender.com/Personajes')
        .then(response => {
          if (!response.ok) {
            throw new Error('La solicitud no pudo ser completada.');
          }
          return response.json();
        })
        .then(data => {
            setPersonajesbd(data.resultado);
        })
        .catch(error => {
          console.error(error);
        });
    }

    console.log('ICONO SELECCIONADO: ', iconoSeleccionado);

    return(
        <div className='clasico'>
            <Header/>

            
            {showContent ? (
                <div>
                    <h2 className='gestiontitle'><i className='bx bx-user-pin'></i> Últimos personajes sugeridos</h2>
                    <div className='contenidoboton'>
                        <button className='botonmostrar' onClick={() => setMostrarContenido4(!mostrarContenido4)}>
                            {mostrarContenido4 ? <i className='bx bx-chevron-up'></i> : <i className='bx bx-chevron-down'></i>}
                        </button>
                    </div>

                    <div className={`contenido ${mostrarContenido4 ? 'mostrar' : ''}`}>
                    <div id='añadirsugerencias' className="personajes-row">
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
                    </div>

                    <h2 className='gestiontitle'><i className='bx bx-folder-plus'></i> Añadir </h2>
                    <div className='contenidoboton'>
                        <button className='botonmostrar' onClick={() => setMostrarContenido3(!mostrarContenido3)}>
                            {mostrarContenido3 ? <i className='bx bx-chevron-up'></i> : <i className='bx bx-chevron-down'></i>}
                        </button>
                    </div>

                    <div className={`contenido ${mostrarContenido3 ? 'mostrar' : ''}`}>
                    <div id='añadirpersonajes' className="personajes-row">
                    
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
                                style={{ minHeight: '30px', maxHeight: '400px', overflow: 'auto' }}
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
                    </div>

                    <h2 className='gestiontitle'><i className='bx bx-edit' ></i> Editar/Eliminar </h2>
                    <div className='contenidoboton'>
                        <button className='botonmostrar' onClick={() => setMostrarContenido2(!mostrarContenido2)}>
                            {mostrarContenido2 ? <i className='bx bx-chevron-up'></i> : <i className='bx bx-chevron-down'></i>}
                        </button>
                    </div>

                    <div className={`contenido ${mostrarContenido2 ? 'mostrar' : ''}`}>
                    <div id='editarpersonajes' className="personajes-row">
                        <div className="personaje-card3">
                        <h3>Personaje</h3>
                        
                        <label>Personaje del día modo Clásico:</label>
                        <select
                            id="selectPersonajesDelDia"
                            value={personajeDelDiaNuevo ? personajeDelDiaNuevo.nombre : personajedeldia ? personajedeldia.nombre : ''}
                            onChange={(e) => {
                            const selectedPersonaje = personajesbd.find((p) => p.nombre === e.target.value);
                            setPersonajeDelDiaNuevo(selectedPersonaje);
                            }}
                        >
                            {personajesbd.map((personaje) => (
                            <option key={personaje.id} value={personaje.nombre}>
                                {personaje.nombre}
                            </option>
                            ))}
                        </select>
                        <div className='botones-container'>
                            <button className='save' type="button" onClick={handleSaveClick}><i className='bx bx-save'></i></button>
                        </div>

                        <label>Personaje del día modo Logro:</label>
                        <select
                            id="selectPersonajesDelDia"
                            value={personajeDelDiaNuevoLogro ? personajeDelDiaNuevoLogro.nombre : personajedeldialogro ? personajedeldialogro.nombre : ''}
                            onChange={(e) => {
                            const selectedPersonaje = personajesbd.find((p) => p.nombre === e.target.value);
                            setPersonajeDelDiaNuevoLogro(selectedPersonaje);
                            }}
                        >
                            {personajesbd.map((personaje) => (
                            <option key={personaje.id} value={personaje.nombre}>
                                {personaje.nombre}
                            </option>
                            ))}
                        </select>
                        <div className='botones-container'>
                            <button className='save' type="button" onClick={handleSave2Click}><i className='bx bx-save'></i></button>
                        </div>

                        <label htmlFor="selectPersonajes">Selecciona un personaje:</label>
                            <select
                                id="selectPersonajes"
                                value={personajeSeleccionado ? personajeSeleccionado.nombre : ''}
                                onChange={(e) => {
                                const selectedPersonaje = personajesbd.find((p) => p.nombre === e.target.value);
                                setPersonajeSeleccionado(selectedPersonaje);
                                }}
                            >
                                <option value="">-</option>
                                {personajesbd.map((personaje) => (
                                <option key={personaje.id} value={personaje.nombre}>
                                    {personaje.nombre}
                                </option>
                                ))}
                            </select>
                            {personajeSeleccionado && (
                            <>
                            <label>Nombre:</label>
                            <input value={personajeSeleccionado.nombre} onChange={handlePersonajeUpdate}>
                            </input>

                            <label>Género:</label>
                            <select value={personajeSeleccionado.genero} onChange={handleGeneroUpdate}>
                                <option value="">Selecciona...</option>
                                <option value="Masculino">Masculino</option>
                                <option value="Femenino">Femenino</option>
                                <option value="Otro">Otro</option>
                            </select>

                            <label>Ámbito:</label>
                            <input multiple value={personajeSeleccionado.ambito} onChange={handleAmbitoUpdate}>
                            </input>

                            <label>Adjetivo:</label>
                            <input
                                type="text"
                                value={personajeSeleccionado.adjetivo} onChange={handleAdjetivoUpdate}
                            />

                            <label>Año:</label>
                            <input
                                type="text"
                                value={personajeSeleccionado.año} onChange={handleAñoUpdate}
                            />

                            <label>Dato:</label>
                            <input
                                type="text"
                                value={personajeSeleccionado.dato} onChange={handleDatoUpdate}
                            />

                            <label>Pista:</label>
                            <input
                                type="text"
                                value={personajeSeleccionado.pista} onChange={handlePistaUpdate}
                            />

                            <label>País:</label>
                            <input
                                type="text"
                                value={personajeSeleccionado.pais} onChange={handlePaisUpdate}
                            />
                            
                            <div className='botones-container'>
                                <button className='delete' type="button" onClick={eliminarPersonaje}><i className='bx bx-trash'></i></button>
                                <button className='save' type="button" onClick={handleUpdatePersonaje}><i className='bx bx-save'></i></button>
                            </div>
                            </>
                            )}
                        </div>

                        <div className="personaje-card3">
                        <h3>Lenguaje</h3>
                        
                        <label>Lenguaje del día:</label>
                        <select
                            id="selectLenguajesDelDia"
                            value={lenguajeDelDiaNuevo ? lenguajeDelDiaNuevo.lenguaje : lenguajedeldia ? lenguajedeldia.lenguaje : ''}
                            onChange={(e) => {
                            const selectedLenguaje = lenguajesbd.find((p) => p.lenguaje === e.target.value);
                            setLenguajeDelDiaNuevo(selectedLenguaje);
                            }}
                        >
                            {lenguajesbd.map((lenguaje) => (
                            <option key={lenguaje.id} value={lenguaje.lenguaje}>
                                {lenguaje.lenguaje}
                            </option>
                            ))}
                        </select>
                        <div className='botones-container'>
                            <button className='save' type="button" onClick={handleSaveLenguajeClick}><i className='bx bx-save'></i></button>
                        </div>

                        <label htmlFor="selectLenguajes">Selecciona un lenguaje:</label>
                            <select
                                id="selectLenguajes"
                                value={lenguajeSeleccionado ? lenguajeSeleccionado.lenguaje : ''}
                                    onChange={(e) => {
                                    const selectedPersonaje = lenguajesbd.find((p) => p.lenguaje === e.target.value);
                                    setLenguajeSeleccionado(selectedPersonaje);
                                }}
                            >
                                <option value="">-</option>
                                {lenguajesbd.map((lenguaje) => (
                                <option key={lenguaje.id} value={lenguaje.lenguaje}>
                                    {lenguaje.lenguaje}
                                </option>
                                ))}
                            </select>

                            {lenguajeSeleccionado && (
                            <>
                                <label>Nombre:</label>
                                <input
                                    type="text"
                                    value={lenguajeSeleccionado.lenguaje}
                                    onChange={handleLenguajeUpdate}
                                />

                                <label>Código:</label>
                                <textarea
                                    value={lenguajeSeleccionado.codigo}
                                    onChange={handleCodigoUpdate}
                                    style={{ minHeight: '30px', maxHeight: '400px', overflow: 'auto' }}
                                />

                                <label>Dato:</label>
                                <input
                                    type="text"
                                    value={lenguajeSeleccionado.dato}
                                    onChange={handleDatoCodigoUpdate}
                                />

                                <label>Pista:</label>
                                <input
                                    type="text"
                                    value={lenguajeSeleccionado.pista}
                                    onChange={handlePistaCodigoUpdate}
                                />
                                
                                <div className='botones-container'>
                                <button className='delete' type="button" onClick={eliminarLenguaje}><i className='bx bx-trash'></i></button>
                                    <button className='save' type="button" onClick={handleUpdateCodigo}><i className='bx bx-save'></i></button>
                                </div>
                            </>
                            )}
                        </div>

                        <div className="personaje-card3">
                        <h3>Icono</h3>
                        
                        <label>Icono del día:</label>
                        <select
                            id="selectIconosDelDia"
                            value={iconoDelDiaNuevo ? iconoDelDiaNuevo.nombre : iconodeldia ? iconodeldia.nombre : ''}
                            onChange={(e) => {
                            const selectedIcono = iconosbd.find((p) => p.nombre === e.target.value);
                            setIconoDelDiaNuevo(selectedIcono);
                            }}
                        >
                            {iconosbd.map((icono) => (
                            <option key={icono.id} value={icono.nombre}>
                                {icono.nombre}
                            </option>
                            ))}
                        </select>
                        <div className='botones-container'>
                            <button className='save' type="button" onClick={handleSaveIconoClick}><i className='bx bx-save'></i></button>
                        </div>

                        <label htmlFor="selectIconos">Selecciona un icono:</label>
                            <select
                                id="selectIconos"
                                value={iconoSeleccionado ? iconoSeleccionado.nombre : ''}
                                onChange={(e) => {
                                const selectedPersonaje = iconosbd.find((p) => p.nombre === e.target.value);
                                console.log('ICONOS : ', selectedPersonaje);
                                setIconoSeleccionado(selectedPersonaje);
                                }}
                            >
                                <option value="">-</option>
                                {iconosbd.map((icono) => (
                                <option key={icono.id} value={icono.nombre}>
                                    {icono.nombre}
                                </option>
                                ))}
                            </select>

                            {iconoSeleccionado && (
                            <>
                                <label>Nombre:</label>
                                <input
                                    type="text"
                                    value={iconoSeleccionado.nombre} onChange={handleIconoUpdate}
                                />

                                <label>Icon:</label>
                                <input
                                    type="text"
                                    value={iconoSeleccionado.icon} onChange={handleIconIconoUpdate}
                                />

                                <label>Dato:</label>
                                <input
                                    type="text"
                                    value={iconoSeleccionado.dato} onChange={handleDatoIconoUpdate}
                                />
                                
                                <div className='botones-container'>
                                <button className='delete' type="button" onClick={eliminarIcono}><i className='bx bx-trash'></i></button>
                                    <button className='save' type="button" onClick={handleUpdateIcono}><i className='bx bx-save'></i></button>
                                </div>
                            </>
                            )}
                        </div>
                    </div>
                    </div>

                    {enviadoConExito && (
                        <div className="overlay">
                            <div className="popup3">
                            <button className="close-button" onClick={handlePopupToggle}>
                                <i className="bx bx-x"></i>
                            </button>
                            <h2>Operación Exitosa</h2>
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