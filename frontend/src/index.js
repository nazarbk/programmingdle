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
import Framework from './Framework';

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
    path: "/framework",
    element: <Framework/>
  }
  ,
  {
    path: "/sugerencia",
    element: <Sugerencia/>
  }
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <RouterProvider router={router}/>
);