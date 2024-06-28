/* eslint-disable no-unused-vars */
import React, { useContext, useState } from 'react'
import { Form, Spinner } from 'react-bootstrap'
import { Link, useNavigate } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { loginAPI, registerAPI } from '../services/allAPI';
import { TokenAuthenticationResponseContext } from '../ContextApi/TokenAuth';

// eslint-disable-next-line react/prop-types
function Auth({register}) {
  const {isAuthorized,setIsAuthorized}=useContext(TokenAuthenticationResponseContext)
  const isRegisterForm = register?true:false
  const[loginStatus,setloginStatus]=useState(false)
  
  const [userData,setUserData]=useState({
    username:"",email:"",password:""
  })
  const navigate = useNavigate()
// console.log(userData);
const handleRegister=async(e)=>{
  e.preventDefault()
  const{username,email,password}=userData
  if(!username|| !email || !password){
    toast.info("please fll missing fields")
  }else{
    // toast.success("proceed to api call")
    try{
    const result = await registerAPI(userData)
    // console.log(result);
    if(result.status===200){
      toast.success(`${result.data.username} has successfully registered`)
      setUserData({
        username:"",email:"",password:""
      })
      setTimeout(()=>{
        navigate('/login')
      },3000);
      
    }else{
      toast.warning(result.response.data)
    }
  }catch(err){
    console.log(err);
  }
  }
}

const handlelogin=async(e)=>{
  e.preventDefault()
  console.log(userData);
  const{email,password}=userData
  if(!email || !password){
    toast.info("please fll missing fields")
  }else{
    // toast.success("proceed to api call")
    try{
    const result = await loginAPI(userData)
    console.log(result);
    if(result.status===200){
      setloginStatus(true)
      sessionStorage.setItem("username",result.data.existingUser.username)
      sessionStorage.setItem("token",result.data.token)
      setIsAuthorized(true)
      setUserData({
        email:"",password:""
      })
      setTimeout(()=>{
        navigate('/')
        setloginStatus(false)
      },2000);
     
      
    }else{
      toast.warning(result.response.data)
    }
  }catch(err){
    console.log(err);
  }
  }
}

  return (
    <>
      <div className='d-flex justify-content-center align-items-center '>
        <div className="w-75 p-5 container">
           <Link to={'/'} style={{textDecoration:'none', color:'blue',fontWeight:'bolder' }}><i className="fa-solid fa-arrow-left"></i>Back to Home</Link>
           <div className="card shadow p-3 bg-info">
              <div className="row align-items-cxenter ">
                <div className="col-lg-6">
                   <img src='https://i.pinimg.com/originals/2a/53/65/2a53651a35816f499270d8275fd5318f.gif' className='rounded-start w-100' height={'500px'} alt=''/>
                </div>
                 <div className="col-lg-6">
                  {/*<div className="d-flex align-tems-center flex-column">*/}
                      <h1 className='fw-bolder text-light mt-2'><i className='fa-solid fa-list-check me-2'></i>Project Fair</h1>
                      <h5 className='fw-bolder text-light text-center mt-3'>
                        {
                          isRegisterForm?'sign up to your account':'sign in to your account'
                        }
                      </h5>
                      <Form className='text-light w-100'>
                        {
                          isRegisterForm&&
                          <Form.Group className="mb-3" controlId="formBasicName">

                            <Form.Control type="text" placeholder="Enter your username" onChange={e=>setUserData({...userData,username:e.target.value})} value={userData.username}/>
                            </Form.Group>
                        }
                         <Form.Group className="mb-3" controlId="Email">

                            <Form.Control type="email" placeholder="Enter your Email" onChange={e=>setUserData({...userData,email:e.target.value})} value={userData.email}/>
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="formBasicPassword">
                            <Form.Control type="password" placeholder="Enter your Password" onChange={e=>setUserData({...userData,password:e.target.value})} value={userData.password}/>
                            </Form.Group>
                            {
                              isRegisterForm?
                              <div>
                                <button onClick={handleRegister} className='btn btn-dark mb-2'>Register</button>
                                <p>Already have an account? Click here to <Link to={'/login'} style={{textDecoration:'none' ,color:'green'}}>login</Link></p>
                              </div>:
                              <div>
                              <button onClick={handlelogin} className='btn btn-dark mb-2'>{loginStatus&& <Spinner animation="border" variant="warning" />}Login</button>
                              <p>New User ? Click here to <Link to={'/register'} style={{textDecoration:'none' ,color:'red'}}>Register</Link></p>
                            </div>
                            }
                      </Form>
                      {/* </div> */}
                   </div>
                 </div>
              </div>
        </div>
        <ToastContainer position='top-left' autoClose={3000} theme="colored"/>
      </div>  
      
    </>
  )
}

export default Auth