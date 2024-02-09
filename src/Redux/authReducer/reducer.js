
import { LOGINFAILED, LOGINSUCCESS, LOGOUT} from './actiontype'

const init={
    isAuth:false,
    isError:false,
    errorMessage:"",
    token:localStorage.getItem("token"),
    user:""
}
const authReducer = (state=init,{type,payload}) => {
  switch(type){
    case LOGINSUCCESS:{
        localStorage.setItem("token",payload.token)
        return{...state,isAuth:true,token:payload.token,user:payload,isError:false,errorMessage:""}
        
    }
    case LOGINFAILED:{
        return{...state,isAuth:false,token:"",user:"",isError:true,errorMessage:payload}
    }
    case LOGOUT:{
        localStorage.removeItem("token")
        return{...state,isAuth:false,token:"",isError:false,user:""}
    }
    default:{
        return state
    }
  }
}

export default authReducer