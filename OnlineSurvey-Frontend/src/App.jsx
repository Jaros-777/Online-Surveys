import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import MainPage from './MainPage.jsx'
import UserPanel from './UserPanel/UserPanel.jsx'
import NavBar from './NavBar/NavBar.jsx'
import Survey from './Survey/Survey.jsx'
import {createContext, useState } from 'react'

export const User = createContext();

function App() {

  const[user, setUser] = useState(
    {
      id:0,
      email:"",
      token: null
    })

  return (
    <>
    <User.Provider value={[user,setUser]}>
    <BrowserRouter>
      <NavBar></NavBar>
      <div>
      <Routes>
        <Route path='/'  element={<MainPage />}></Route>
        <Route path='/panel'  element={<UserPanel />}></Route>
        <Route path='/survey/:id'  element={<Survey />}></Route>
      </Routes>
      </div>
    </BrowserRouter>
    </User.Provider>
      
    </>
  )
}

export default App
