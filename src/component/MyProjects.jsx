// eslint-disable-next-line no-unused-vars
import React, { useContext, useEffect, useState } from 'react'
import AddProjects from './AddProjects'
import { addProjectResponseContext, editProjectResponseContext } from '../ContextApi/ContextShare'
import EditProject from './EditProject'
import { deleteUserProjectAPI, getUserProjectAPI } from '../services/allAPI'
import { toast } from 'react-toastify'

function MyProjects() {
  // eslint-disable-next-line no-unused-vars
  const{editProjectResponse,setEditProjectResponse}=useContext(editProjectResponseContext)
  // eslint-disable-next-line no-unused-vars
  const{addProjectResponse,setAddProjectResponse}=useContext(addProjectResponseContext)
  const [allprojects,setAllProjects]=useState([])

  const getUserProject=async()=>{
    const token = sessionStorage.getItem("token")
    if(token){
      const reqHeader ={
        "Content-Type": "multipart/form-data",
        "Authorization":`bearer ${token}`
      }
      const result = await getUserProjectAPI(reqHeader)
      if(result.status===200){
        setAllProjects(result.data)
      }else{
        console.log(result);
      }
    }
  }
  useEffect(()=>{
    getUserProject()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[addProjectResponse,editProjectResponse])

const handleDelete = async(pid)=>{
  const token = sessionStorage.getItem("token")
  if(token){
    const reqHeader ={
      "Content-Type": "multipart/form-data",
      "Authorization":`Bearer ${token}`
    }
    const result = await deleteUserProjectAPI(pid,reqHeader)
    if(result.status===200){
      getUserProject()
    }else{
      toast.warning(result.response.data)
    }
  }
}
  return (
    <>
    <div className="card shadow p-3 mt-5">
        <div className="d-flex">
            <h2>My Projects</h2>
        </div>
        <div className="ms-auto">
          <AddProjects/>  
        </div>
        <div className="mt-4">
            {/* collection of user projects*/}
            { allprojects.length>0?
            // eslint-disable-next-line no-unused-vars
            allprojects.map((project,index)=>(
              // eslint-disable-next-line react/jsx-key
              <div className="border d-flex align-items-center rounded p-3">
              <h5>{project?.title}</h5>
              <div className="d-flex ms-auto">
                <EditProject project={project}/>
                  <a href={project?.github} target='_blank' className='me-3 btn text-dark'><i className="fa-brands fa-github fa-2x"></i></a>
                  <button onClick={()=>handleDelete(project?._id)} className='btn text-dark'><i className="fa-solid fa-trash"></i></button>
              </div>
              </div>
            )):<p className='text-danger fw-bolder'>No Projects Added Yet!!</p>}
            
        </div>
    </div>
    </>
  )
}

export default MyProjects