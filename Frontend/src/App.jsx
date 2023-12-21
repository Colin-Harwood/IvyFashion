import { useState } from 'react'
import React from 'react'
import {Routes, Route} from 'react-router-dom'
import './App.css'
import Home from './pages/Home';
import Men from './pages/MenAll';
import Women from './pages/WomenAll';
import WomenTops from './pages/WomenTops';
import WomenOuterwear from './pages/WomenOuterwear';
import WomenBottoms from './pages/WomenBottoms';
import WomenDetails from './pages/WomenDetails'
import MenTops from './pages/MenTops'
import MenOuterwear from './pages/MenOuterwear'
import MenBottoms from './pages/MenBottoms'
import MenDetails from './pages/MenDetails'
import Wishlist from './pages/Wishlist'
import Login from './pages/Login'
import Logout from './pages/Logout'
import Register from './pages/Register'

export const App = () => {
  return (
    <Routes>
      <Route path='/' element={<Home />}/>
      <Route path='/men' element={<Men />}/>
      <Route path='/men/tops' element={<MenTops />}/>
      <Route path='/men/outerwear' element={<MenOuterwear />}/>
      <Route path='/men/bottoms' element={<MenBottoms />}/>
      <Route path='/male/:id' element={<MenDetails />}/>
      <Route path='/women' element={<Women />}/>
      <Route path='/women/tops' element={<WomenTops />}/>
      <Route path='/women/outerwear' element={<WomenOuterwear />}/>
      <Route path='/women/bottoms' element={<WomenBottoms />}/>
      <Route path='/female/:id' element={<WomenDetails />}/>
      <Route path='/wishlist' element={<Wishlist />}/>
      <Route path='/login' element={<Login />}/>
      <Route path='/register' element={<Register />}/>
      <Route path='/logout' element={<Logout />}/>
    </Routes>
  )
}

export default App
