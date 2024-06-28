/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react'
import Header from '../component/Header'
import { Col, Row } from 'react-bootstrap'
import ProjectCard from '../component/ProjectCard'
import { getAllUserProjectAPI } from '../services/allAPI'

function Projects() {
  const[searchkey,setsearchkey]=useState("")
  const[allprojects,setAllProjects]=useState([])
  const getAllUserProjects=async()=>{
    const token = sessionStorage.getItem("token")
    if(token){
      const reqHeader ={
        "Content-Type": "multipart/form-data",
        "Authorization":`bearer ${token}`
      }
      const result = await getAllUserProjectAPI(searchkey,reqHeader)
      if(result.status===200){
        setAllProjects(result.data)
      }else{
        console.log(result);
      }
    }

  }
  useEffect(()=>{
    getAllUserProjects()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[searchkey])
  return (
    <>
  <Header/>
  <div className='projects mt-5'>
   <div className="text-center mb-5">
   All Projects
   </div>
   <div className="d-flex justify-content-center align-items-center">
   <div className='d-flex border w-50 rounded mb-3'>
   <input type="text" className='form-control' placeholder='search by technologies'onChange={e=>setsearchkey(e.target.value)}/>
    <i style={{marginLeft:'-50px'}} className="fa-solid fa-magnifying-glass fa-rotate-90"></i>
   </div>
   </div>
  </div>

  <Row className='mt-5 container-fluid'>
   {allprojects.length>0?
   allprojects.map((project,index)=>(
    <Col key={index} sm={12} md={6} lg={4}>
   <ProjectCard project={project}/>
   </Col>
   )):<div className='text-danger fw-bolder fs-3'>Nothing to Display</div>
   }
  </Row>

    </>
  )
}

export default Projects