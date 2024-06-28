import { commonAPI } from "./commonAPI"
import { SERVER_URL } from "./server_url"


//register api
export const registerAPI = async(users)=>{
    return await commonAPI('POST',`${SERVER_URL}/user/register`,users,"")
}

//login api
export const loginAPI = async(user)=>{
    return await commonAPI('POST',`${SERVER_URL}/user/login`,user,"")
}

//add project api
export const AddProjectAPI = async(reqBody,reqHeader)=>{
    return await commonAPI('POST',`${SERVER_URL}/addprojects`,reqBody,reqHeader)
}

//getHomeproject API
export const getHomeProjectAPI = async()=>{
    return await commonAPI('GET',`${SERVER_URL}/homeprojects`,"","")
}

//getAllUserproject API
export const getAllUserProjectAPI = async(searchkey,reqHeader)=>{
    return await commonAPI('GET',`${SERVER_URL}/alluserprojects?search=${searchkey}`,"",reqHeader)
}

//getHomeproject API
export const getUserProjectAPI = async(reqHeader)=>{
    return await commonAPI('GET',`${SERVER_URL}/userprojects`,"",reqHeader)
}

//editprojects
export const editUserProjectAPI = async(id,reqBody,reqHeader)=>{
    return await commonAPI('PUT',`${SERVER_URL}/projects/edit/${id}`,reqBody,reqHeader)
}

//deleteprojects
export const deleteUserProjectAPI = async(id,reqHeader)=>{
    return await commonAPI('DELETE',`${SERVER_URL}/projects/remove/${id}`,{},reqHeader)
}