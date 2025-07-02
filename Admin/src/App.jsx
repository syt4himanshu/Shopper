import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Navbar from './Components/Navbar/Navbar'
import Sidebar from './Components/Sidebar/Sidebar'
import ListProduct from './Components/ListProduct/ListProduct'
import AddProduct from './Components/AddProduct/AddProduct'
import Admin from "./Pages/Admin/Admin"

const App = () => {
  return (
    <>
      <Navbar />
      <Admin />
    
      
    </>
  )
}

export default App