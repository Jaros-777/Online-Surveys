import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import MainPage from './MainPage.jsx'
import UserPanel from './UserPanel/UserPanel.jsx'
import NavBar from './NavBar/NavBar.jsx'
import {createContext, useState } from 'react'

export const UserMail = createContext();

function App() {

  const[userMail, setUserMail] = useState("email@email.com")

  return (
    <>
    <UserMail.Provider value={[userMail,setUserMail]}>
    <BrowserRouter>
      <NavBar></NavBar>
      <div>
      <Routes>
        <Route path='/'  element={<MainPage />}></Route>
        <Route path='/panel'  element={<UserPanel />}></Route>
      </Routes>
      </div>
    </BrowserRouter>
    </UserMail.Provider>
      
    </>
  )
}

export default App
