// eslint-disable-next-line no-unused-vars
import React, { createContext, useEffect, useState } from 'react'
export const TokenAuthenticationResponseContext = createContext()

// eslint-disable-next-line react/prop-types
function TokenAuth({children}) {
    const [isAuthorized,setIsAuthorized]=useState(false)

    useEffect(()=>{
        if(sessionStorage.getItem("token")){
            setIsAuthorized(true)
        }else{
            setIsAuthorized(false)
        }
    },[isAuthorized])
  return (
    <>
     <TokenAuthenticationResponseContext.Provider value={{isAuthorized,setIsAuthorized}}>
        {children}
     </TokenAuthenticationResponseContext.Provider>
    </>
  )
}

export default TokenAuth