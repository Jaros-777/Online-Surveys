import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Auth from "./Auth.jsx"
import MainPage from './MainPage.jsx'
import UserPanel from './UserPanel.jsx'
import NavBar from './NavBar/NavBar.jsx'

function App() {

  return (
    <>
    <BrowserRouter>
      <NavBar></NavBar>
      <div>
      <Routes>
        <Route path='/'  element={<MainPage />}></Route>
        <Route path='/auth'  element={<Auth />}></Route>
        <Route path='/panel'  element={<UserPanel />}></Route>
      </Routes>
      </div>
    </BrowserRouter>
      
    </>
  )
}

export default App
