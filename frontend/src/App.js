import React from 'react';
import Header from './Header';
import Modos from './Modos';
import { useEffect } from 'react';
import Footer from './Footer';

function App() {

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

  return (
      <div className="App">
        <Header />
        <Modos/>
        <Footer/>
      </div>
  );
}

export default App;
