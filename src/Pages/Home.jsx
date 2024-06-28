/* eslint-disable react/no-unknown-property */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react'
import titleimage from '../assets/images/alam.gif'
import { Col, Row } from 'react-bootstrap'
import ProjectCard from '../component/ProjectCard'
import { Link, useNavigate } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { getHomeProjectAPI } from '../services/allAPI'
import Projects from './Projects'
function Home() {

  const[isLoggedIn,setIsLoggedIn]=useState(false)
  const[allprojects,setAllProjects]=useState([])
  const navigate = useNavigate()

  const getHomeProjects=async()=>{
    const result = await getHomeProjectAPI()
    if(result.status===200){
      setAllProjects(result.data)
    }else{
      console.log(result);
    }
  }
  console.log(allprojects);

  useEffect(()=>{
    getHomeProjects()
      if(sessionStorage.getItem("token")){
        setIsLoggedIn(true)
      }else{
        setIsLoggedIn(false)
      }
  },[])

const handleProjectPage =()=>{
    if(sessionStorage.getItem("token")){
      navigate('/projects')
    }else{
      toast.warning("please login")
    }
}

  return (
    <>
    <div style={{height:'85vh'}} className='container-fluid rounded bg-info'>
    <Row className='align-items-center p-5 ms-2'>
    <Col sm={12} md={6}>
        <h1 style={{fontSize:'80px'}} className='fw-bolder text-light'>Project-Fair</h1>
        <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Voluptates doloremque nihil architecto pariatur incidunt sequi, ex alias provident vitae reprehenderit ad sapiente repellat et veniam consequuntur. Repellat quibusdam magnam eaque!</p>
        {isLoggedIn? <Link to={'/dashboard'} className='btn btn-warning'>Manage Your Projects</Link>:
        <Link to={'/login'} className='btn btn-warning'>Start Explore</Link>}
    </Col>
    <Col sm={12} md={6}>
        <img width={'500px'} src={titleimage} alt=''/>
    </Col>

    </Row>
    </div>
    {/* all projects */}
    <div className='all-projects mt-5'>
    <h1 className='text-primary fw-bolder text-center'>Explore your projects</h1>
    
    <marquee scrollAmount={25}>
    <Row>
       {allprojects.length>0?
       allprojects.map((project,index)=>(
        <Col key={index} sm={12} md={6} lg={4}>
        <ProjectCard project={project}/>
        </Col>
       )):null
      }


    </Row>
    </marquee>
    <div className='d-flex justify-content-center text-dark mt-5 btn'><p onClick={handleProjectPage}>View more projects</p></div>
    <ToastContainer position='top-center' autoClose={3000} theme="colored"/>
    </div>
    </>
  )
}

export default Home