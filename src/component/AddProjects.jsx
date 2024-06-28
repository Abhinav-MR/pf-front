// eslint-disable-next-line no-unused-vars
import React, { useContext, useEffect, useState } from 'react'
import { Button, Modal } from 'react-bootstrap';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { AddProjectAPI } from '../services/allAPI';
import { addProjectResponseContext } from '../ContextApi/ContextShare';

function AddProjects() {
  //get context
  // eslint-disable-next-line no-unused-vars
  const{AddProjectResponse,setAddProjectResponse}=useContext(addProjectResponseContext)
  const[preview,setpreview]=useState("")
const [fileStatus,setFilestatus]=useState(false)
  const[projectData,setProjectData]=useState({
    title:"",languages:"",github:"",website:"",overview:"",projectImage:""
  })

  console.log(projectData);
    const [show, setShow] = useState(false);

    const handleClose = () => {
      setShow(false);
      setProjectData({
        title:"",languages:"",github:"",website:"",overview:"",projectImage:""
      })

      setpreview("")
    }
    const handleShow = () => setShow(true);

    useEffect(()=>{
      if(projectData.projectImage.type=="image/png"||projectData.projectImage.type=="image/jpg"||projectData.projectImage.type=="image/jpeg"){
        console.log("genarate url");
        setpreview(URL.createObjectURL(projectData.projectImage));
        setFilestatus(false)
      }else{
        console.log("please upload following formats [jpeg/png/jpg] only...");
        setFilestatus(true)
        setpreview("")
        setProjectData({...projectData,projectImage:""})
      }

    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[projectData.projectImage])

    const handleAddProject= async()=>{
      const{title,languages,github,website,overview,projectImage}=projectData;
      if(!title || !languages || !github || !website || !overview || !projectImage){
        toast.info("please fill missing fields")
      }else{
        //api call-req body
        const reqBody = new FormData()
        reqBody.append("title",title)
        reqBody.append("languages",languages)
         reqBody.append("github",github)
         reqBody.append("website",website)
         reqBody.append("overview",overview)
         reqBody.append("projectImage",projectImage)

         //reHeader
         const token = sessionStorage.getItem("token")
         console.log(token);
         if(token){
          const reqHeader ={
            "Content-Type": "multipart/form-data",
            "Authorization":`bearer ${token}`
          }
          //api call
          try{
            const result = await AddProjectAPI(reqBody,reqHeader)
            console.log(result);
            if(result.status===200){
              console.log(result.data);
              handleClose()
              setAddProjectResponse(result.data)
            }else{
              toast.warning(result.response.data)
            }
          }catch(err){
            // eslint-disable-next-line no-undef
            console.log(result);
          }
         }
      }
    }
  return (
    <>
<Button variant="primary" onClick={handleShow}>
        Add Projects
      </Button>

      <Modal show={show} onHide={handleClose} backdrop="static" keyboard={false} size='lg'>
        <Modal.Header closeButton>
          <Modal.Title>Project Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <div className="row">
                <div className="col-6">
                  <label>
                    <input type="file" style={{display:'none'}} onChange={e=>setProjectData({...projectData,projectImage:e.target.files[0]})}/>
                    <img width={'300px'} src={preview?preview:"https://t4.ftcdn.net/jpg/04/81/13/43/360_F_481134373_0W4kg2yKeBRHNEklk4F9UXtGHdub3tYk.jpg" } alt='imgplaceholder'/>
                  </label>
                  { fileStatus&& <div className="mt-2 text-danger">
                  please upload following formats [jpeg/png/jpg] only..
                  </div>}
                </div>
                <div className="col-6">
                    <div className="mb-3">
                        <input type="text" className='form-control' placeholder='Project Title' value={projectData.title} onChange={e=>setProjectData({...projectData,title:e.target.value})}/>
                    </div>
                    <div className="mb-3">
                        <input type="text" className='form-control' placeholder='Language' value={projectData.languages} onChange={e=>setProjectData({...projectData,languages:e.target.value})}/>
                    </div>
                    <div className="mb-3">
                        <input type="text" className='form-control' placeholder='Github' value={projectData.github} onChange={e=>setProjectData({...projectData,github:e.target.value})}/>
                    </div>
                    <div className="mb-3">
                        <input type="text" className='form-control' placeholder='Website Link' value={projectData.website} onChange={e=>setProjectData({...projectData,website:e.target.value})}/>
                    </div>
                    <div className="mb-3">
                        <input type="text" className='form-control' placeholder='Project Overview' value={projectData.overview} onChange={e=>setProjectData({...projectData,overview:e.target.value})}/>
                    </div>
                </div>
            </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
           cancel
          </Button>
          <Button  variant="primary" onClick={handleAddProject}>
          Add
          </Button>
        </Modal.Footer>
      </Modal>
      <ToastContainer position='top-center' autoClose={3000} theme="colored"/>
    </>
  )
}

export default AddProjects