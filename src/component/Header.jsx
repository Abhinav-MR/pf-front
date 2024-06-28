/* eslint-disable no-unused-vars */
import React, { useContext } from 'react'
import { Container, Navbar } from 'react-bootstrap'
import { Link, useNavigate } from 'react-router-dom'
import { TokenAuthenticationResponseContext } from '../ContextApi/TokenAuth'

// eslint-disable-next-line react/prop-types
function Header({insideDashBoard}) {
  const {isAuthorized,setIsAuthorized}=useContext(TokenAuthenticationResponseContext)
  const navigate = useNavigate()
  const handleLogout=()=>{
    sessionStorage.removeItem("token")
    sessionStorage.removeItem("username")
    navigate('/')
  }
  return (
    <>
     <Navbar className="bg-info">
      <Container>
        <Navbar.Brand >
        <Link to={'/'} style={{textDecoration:'none',color:'white'}}>
        <i className="fa-solid fa-list-check me-2"></i>
        Project-Fair</Link>
         </Navbar.Brand>
      {
        insideDashBoard&&
        <button className='btn text-dark border' onClick={handleLogout}>Logout</button>

      }
      </Container>
    </Navbar>
    </>
  )
}

export default Header