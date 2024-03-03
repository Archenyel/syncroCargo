import React, { Component } from 'react'
import { Routes, Route } from "react-router-dom";
import Graphics from './views/Graphics';
import Home from './views/Home';
import Login from './views/Login';
import Operations from './views/Operations';
import Personal from './views/Personal';
import Reports from './views/Reports';
import Layout from './views/Layout';
import Cortinas from './views/Cortinas';
import Products from './views/Products';
import Companies from './views/Companies';


const Navegation = () => {
  return (
    <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="Login" element={<Login />} />
          <Route path="Operations" element={<Operations />} />
          <Route path="Personal" element={<Personal />} />
          <Route path="Reports" element={<Reports />} />
          <Route path="Graphics" element={<Graphics />} />
          <Route path="Cortinas" element={<Cortinas />} />
          <Route path="Products" element={<Products />} />
          <Route path="Companies" element={<Companies />} />
        </Route>
      </Routes>
  )
}

export default Navegation
