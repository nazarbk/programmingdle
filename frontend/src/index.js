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
import Palabra from './Palabra';

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
    path: "/palabra",
    element: <Palabra/>
  }
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <RouterProvider router={router}/>
);