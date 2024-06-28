import { Navigate, Route, Routes } from 'react-router-dom'
import './App.css'
import Home from './Pages/Home'
import Dashboard from './Pages/Dashboard'
import Projects from './Pages/Projects'
import Footer from './component/Footer'
import Auth from './Pages/Auth'
import { useContext } from 'react'
import { TokenAuthenticationResponseContext } from './ContextApi/TokenAuth'

function App() {
  // eslint-disable-next-line no-unused-vars
  const{isAuthorized,setIsAuthorized}=useContext(TokenAuthenticationResponseContext)

  return (
    <>
   
    <Routes>
      <Route path='' element={<Home/>}/>
      <Route path='/dashboard' element={isAuthorized?<Dashboard/>:<Home/>}/>
      <Route path='/login' element={<Auth/>}/>
      <Route path='/register' element={<Auth register/>}/>
      <Route path='/projects' element={isAuthorized?<Projects/>:<Home/>}/>
      <Route path='/*' element={<Navigate to={'/'}/>}/>
    </Routes>
    <Footer/>
    </>
  )
}

export default App
