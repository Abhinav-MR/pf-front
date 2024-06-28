/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react'
import Header from '../component/Header'
import { Col, Row } from 'react-bootstrap'
import MyProjects from '../component/MyProjects'
import Profile from '../component/Profile'

function Dashboard() {
  const[username,setusername]=useState("")
  useEffect(()=>{
    if(sessionStorage.getItem("username")){
      setusername(sessionStorage.getItem("username"))
    }else{
      setusername("")
    }
  },[])
  
  return (
    <>
      <Header insideDashBoard/>
      <Row>
        {/*-my projects--*/}
        <Col sm={12} md={8}>
        <h2>Welcome<span className='text-warning fw-bolder'>User</span></h2>
        <MyProjects/>
        </Col>

        {/*-my profile--*/}
        <Col sm={12} md={4}>
          <Profile/>
        </Col>
      </Row>
    </>
  )
}

export default Dashboard