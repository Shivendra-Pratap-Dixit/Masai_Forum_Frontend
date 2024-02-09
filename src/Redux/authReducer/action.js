import axios from "axios"
import { LOGINFAILED, LOGINSUCCESS, LOGOUT } from "./actiontype"

export const getlog=(userData)=>(dispatch)=>{
    let login=axios.post("https://masai-forum-sy4l.onrender.com/api/login",userData).then((res)=>{
        dispatch({type:LOGINSUCCESS,payload:res.data})
    }).catch((err)=>{
        dispatch({type:LOGINFAILED,payload:err.response.data.message})
        throw err;
    })
    return login;
}

export const logout = () => async dispatch => {
    dispatch({ type: LOGOUT });
  };