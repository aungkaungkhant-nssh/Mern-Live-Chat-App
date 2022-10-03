import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Auth from '../pages/Auth'

function MainRouter() {
  return (
    <Routes>
        <Route path='/' element={<Auth />}></Route>
    </Routes>
  )
}

export default MainRouter