// eslint-disable-next-line no-unused-vars
import React, { useContext, useEffect, useState } from 'react'
import { Button, Modal } from 'react-bootstrap'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { SERVER_URL } from '../services/server_url';
import { editUserProjectAPI } from '../services/allAPI';
import { editProjectResponseContext } from '../ContextApi/ContextShare';

function EditProject({project}) {
    console.log(project);
    //getContext
    // eslint-disable-next-line no-unused-vars
    const{editProjectResponse,setEditProjectResponse}=useContext(editProjectResponseContext)
    const[preview,setpreview]=useState("")
    const[projectData,setProjectData]=useState({
        id:project._id,
        title:project.title,
        languages:project.languages,
        github:project.github,
        website:project.website,
        overview:project.overview,
        projectImage: "",
    });

    useEffect(()=>{
      if(projectData.projectImage){
        setpreview(URL.createObjectURL(projectData.projectImage))
      }else{
        setpreview("")
      }
    },[projectData.projectImage])
    const [show, setShow] = useState(false);
    const handleClose = () => {
      setShow(false);
      setProjectData({
        id:project._id,
        title:project.title,
        languages:project.languages,
        github:project.github,
        website:project.website,
        overview:project.overview,
        projectImage: "",
      })
      setpreview("")
    }
    const handleShow = () => setShow(true);

    // eslint-disable-next-line no-unused-vars
    const handleUpdate = async()=>{
      const{id,title,languages,github,website,overview,projectImage}=projectData;
      if(!title || !languages || !github || !website || !overview || !projectImage){
        toast.info("please fill missing fields")
      }else{
        const reqBody = new FormData()
        reqBody.append("title",title)
        reqBody.append("languages",languages)
         reqBody.append("github",github)
         reqBody.append("website",website)
         reqBody.append("oveview",overview)
         preview ? reqBody.append("projectImage",projectImage):reqBody.append("projectImage",project.projectImage)

         //reHeader
         const token = sessionStorage.getItem("token")
         console.log(token);
         if(token){
          const reqHeader ={
            "Content-Type":preview ? "multipart/form-data":"application/json",
            "Authorization":`bearer ${token}`
          }
          //api call
          try{
           const result = await editUserProjectAPI(id,reqBody,reqHeader)
           console.log(result);
           if(result.status===200){
            setEditProjectResponse(result.data)
            handleClose()
           }
           toast.warning(result.response.data)
          }catch(err){
            console.log(err);
          }
      }

    }

  return (
    <div>
        <button className='btn text-dark' onClick={handleShow}><i className="fa-solid fa-pen-to-square"></i></button>

      <Modal show={show} onHide={handleClose} backdrop="static" keyboard={false} size='lg'>
        <Modal.Header closeButton>
          <Modal.Title>Project Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <div className="row">
                <div className="col-6">
                  <label>
                    <input type="file" style={{display:'none'}} onChange={(e)=>setProjectData({...projectData,projectImage:e.target.files[0],})}/>
                    <img width={'300px'} src={preview?preview:`${SERVER_URL}/uploads/${project?.projectImage}`} alt='imgplaceholder'/>
                  </label>
                  
                </div>
                <div className="col-6">
                    <div className="mb-3">
                        <input type="text" className='form-control' placeholder='Project Title' value={projectData.title} onChange={(e)=>setProjectData({...projectData,title:e.target.value,})}/>
                    </div>
                    <div className="mb-3">
                        <input type="text" className='form-control' placeholder='Language' value={projectData.languages} onChange={(e)=>setProjectData({...projectData,languages:e.target.value,})}/>
                    </div>
                    <div className="mb-3">
                        <input type="text" className='form-control' placeholder='Github' value={projectData.github} onChange={(e)=>setProjectData({...projectData,github:e.target.value,})}/>
                    </div>
                    <div className="mb-3">
                        <input type="text" className='form-control' placeholder='Website Link' value={projectData.website} onChange={(e)=>setProjectData({...projectData,website:e.target.value,})}/>
                    </div>
                    <div className="mb-3">
                        <input type="text" className='form-control' placeholder='Project Overview' value={projectData.overview} onChange={(e)=>setProjectData({...projectData,overview:e.target.value,})}/>
                    </div>
                </div>
            </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
           cancel
          </Button>
          <Button  variant="primary" onClick={handleUpdate}>
          Update
          </Button>
        </Modal.Footer>
      </Modal>
      <ToastContainer position='top-right' autoClose={3000} theme="colored"/>
    </div>
  )
}
}

export default EditProject