import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import Navegation from './Navegation';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter basename="/~aarrey213/integradora/app/">
    < Navegation />
  </BrowserRouter>
);

