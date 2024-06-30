import './App.css'
import { Text } from '@chakra-ui/react'
import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Cart from './pages/Cart'
import Error from './pages/Error'
import Signup from './pages/Authentication/Signup'
import Login from './pages/Authentication/Login'
import AuthUser from './pages/Authentication/AuthUser'
import Navbar from './components/Navbar'
function App() {

  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/cart" element={<Cart />}></Route>
        <Route path="/my-account/user" element={<AuthUser />}></Route>
        <Route path="*" element={<Error />}></Route>
      </Routes>
    </>
  )
}

export default App
