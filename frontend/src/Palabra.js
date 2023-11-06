import React, { useState, useEffect } from 'react';
import Header from './Header';
import CountdownClock from './CountdownClock';

const Palabra = () => {
  const palabras = ["manzana", "pera", "naranja", "uva", "limón", "kiwi"];
  const [palabraSeleccionada, setPalabraSeleccionada] = useState(palabras[Math.floor(Math.random() * palabras.length)]);
  const [adivinanza, setAdivinanza] = useState("");
  const [resultado, setResultado] = useState([]);
  const [hasGanado, setHasGanado] = useState(false);

  useEffect(() => {
    setPalabraSeleccionada(palabras[Math.floor(Math.random() * palabras.length)]);
    setAdivinanza("");
    setResultado([]);
    setHasGanado(false);
  }, [palabraSeleccionada]);

  const manejarAdivinanza = () => {
    const coincidencias = [];
    for (let i = 0; i < palabraSeleccionada.length; i++) {
      const letraAdivinanza = adivinanza[i];
      const letraCorrecta = palabraSeleccionada[i];
      if (letraAdivinanza === letraCorrecta) {
        coincidencias.push(letraCorrecta);
      }
    }

    const coincidenciasIncorrectas = adivinanza.split('').filter((letra, index) => {
      return letra !== palabraSeleccionada[index] && palabraSeleccionada.includes(letra);
    });

    const letrasNoCoinciden = adivinanza.split('').filter((letra, index) => {
      return letra !== palabraSeleccionada[index] && !palabraSeleccionada.includes(letra);
    });

    setResultado([
      `Letras en la posición correcta: ${coincidencias.join(', ')}`,
      `Letras que coinciden pero en posición incorrecta: ${coincidenciasIncorrectas.join(', ')}`,
      `Letras que no coinciden: ${letrasNoCoinciden.join(', ')}`,
    ]);

    if (adivinanza === palabraSeleccionada) {
      setHasGanado(true);
    }
  };

  return (
    <div>
      <Header />
      <h2>¡Adivina la palabra!</h2>
      <p>Palabra: {palabraSeleccionada}</p>
      {hasGanado ? (
        <p>¡Has ganado! La palabra es "{palabraSeleccionada}".</p>
      ) : (
        <div>
          <input
            type="text"
            value={adivinanza}
            onChange={(e) => setAdivinanza(e.target.value.toLowerCase())}
            placeholder="Adivina la palabra"
          />
          <button onClick={manejarAdivinanza}>Adivinar</button>
        </div>
      )}
      {resultado.length > 0 && (
        <div>
          <h3>Retroalimentación:</h3>
          <ul>
            {resultado.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Palabra;
