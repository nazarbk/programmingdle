import React from 'react';
import Header from './Header';
import Modos from './Modos';
import { useEffect, useState } from 'react';
import Footer from './Footer';
import ScrollToTop from './ScrollToTop';

function App() {

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetch('https://programmingdle.onrender.com/')
      .then(response => response.text())
      .then(data => {

        const nuevoUsuario = {
          ip: data,
        };

        setIsLoading(false);
  
        const options = {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(nuevoUsuario),
        };

        fetch(`https://programmingdle.onrender.com/Usuarios/${data}`)
          .then(response => {
            console.log('RESPONSE: ', response);
            if (!response.ok) {
              fetch('https://programmingdle.onrender.com/Usuarios', options)
              .then(response => {
                console.log('RESPONSE: ', response);

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
            if (data) {
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

  return (
      <div className="App">
        {isLoading ? (
          <div className="loading-overlay">
            <p>Conectando a la base de datos... </p>
            <div><i class='bx bx-loader-circle bx-spin'></i></div>
          </div>
        ) : (
          <>
            <Header />
            <Modos/>
          </>
        )}
      </div>
  );
}

export default App;
