import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import {
  createBrowserRouter,
  RouterProvider
} from "react-router-dom";
import Clasico from './Clasico';
import Logro from './Logro';
import Lenguaje from './Lenguaje';
import Sugerencia from './Sugerencia';
import Icono from './Icono';
import Gestion from './Gestion';
import Privacidad from './Privacidad';

const router = createBrowserRouter([
  {
     path: "/",
     element: <App/>
  },
  {
    path: "/clasico",
    element: <Clasico/>
  },
  {
    path: "/logro",
    element: <Logro/>
  },
  {
    path: "/lenguaje",
    element: <Lenguaje/>
  },
  {
    path: "/icono",
    element: <Icono/>
  }
  ,
  {
    path: "/sugerencia",
    element: <Sugerencia/>
  },
  {
    path: "/gestion",
    element: <Gestion/>
  },
  {
    path: "/privacidad",
    element: <Privacidad/>
  }
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <RouterProvider router={router}/>
);