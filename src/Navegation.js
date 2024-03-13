import React from 'react'
import { Routes, Route } from "react-router-dom";
import Graphics from './views/Graphics';
import Login from './views/Login';
import Operations from './views/Operations';
import Personal from './views/Personal';
import Reports from './views/Reports';
import Cortinas from './views/Cortinas';
import Products from './views/Products';
import Companies from './views/Companies';
import SideBar from './views/SideBar';


const Navegation = () => {
  return (
    <Routes>
          <Route index Component={Login} />
          <Route path="Login" Component={Login} /> 
          <Route path="Operations" Component={Operations}/> 
          <Route path='SideBar' Component={SideBar}/> 
          <Route path="Personal" Component={Personal } /> 
          <Route path="Reports" Component={Reports } /> 
          <Route path="Graphics" Component={Graphics } /> 
          <Route path="Cortinas" Component={Cortinas } /> 
          <Route path="Products" Component={Products } /> 
          <Route path="Companies" Component={Companies } />
      </Routes>
  )
}

export default Navegation
