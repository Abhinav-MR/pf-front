/* eslint-disable no-undef */
// eslint-disable-next-line no-unused-vars
import React, { createContext, useState } from 'react'
// eslint-disable-next-line react-refresh/only-export-components
export const addProjectResponseContext = createContext()
// eslint-disable-next-line react-refresh/only-export-components
export const editProjectResponseContext = createContext()


// eslint-disable-next-line react/prop-types
function ContextShare({children}) {
    const[addProjectResponse,setAddProjectResponse]=useState("")
    const[editProjectResponse,setEditProjectResponse]=useState("")
  return (
    <>
    <addProjectResponseContext.Provider value={{addProjectResponse,setAddProjectResponse}}>
    <editProjectResponseContext.Provider value={{editProjectResponse,setEditProjectResponse}}>
    {children}
    </editProjectResponseContext.Provider>
    </addProjectResponseContext.Provider>

    </>
  )
}

export default ContextShare