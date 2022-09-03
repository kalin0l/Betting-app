import React, { useReducer } from "react";
import authReducer from "../authReducer";

export const AuthContext = React.createContext();

export const AuthProvider = ({children}) => {
 const getLocalStorageName = () => {
    const name = localStorage.getItem("name");
    if (name) {
      return JSON.parse(name);
    } else {
      return '';
    }
  };


    const initialState = {
        user:getLocalStorageName(),
        token:null,
        name:'',
        email:'',
        password:'',
        loading:false,
        error:''
    }
    const [state, dispatch] = useReducer(authReducer, initialState);
   

    const register = async(name,email,password) => {
        dispatch({type:'LOADING'})
        try {
            const res = await fetch(`/api/v1/auth/register`,{
                method:'POST',
                headers:{
                    "Content-Type": "application/json",
                },
                body:JSON.stringify({
                    name,email,password
                })
            });
            
            const data = await res.json();
            console.log(data.message);
            if(!res.ok){
                dispatch({type:'SET_ERROR',payload:data.message});
                throw new Error(data);          
            }
            console.log(data);
            dispatch({type:'REGISTER_USER',payload:data.user})
            dispatch({type:'LOADING'})
            dispatch({type:'SET_ERROR',payload:data.message})            
            
        } catch (error) {
            console.log(error);
            dispatch({type:'LOADING'})
        }

    }
   
    const login = async(email,password,history) => {
        dispatch({type:'LOADING'})
        try {
            const res = await fetch(`/api/v1/auth/login`,{
                method:"POST",
                headers:{
                    "Content-Type":"application/json"
                },
                body:JSON.stringify({
                    email,password
                })
            })
            const data = await res.json();
            dispatch({type:'LOGIN',payload:data.tokenUser})
            dispatch({type:'LOADING'})
            if(!res.ok){
                dispatch({type:'SET_ERROR',payload:data.message});
                throw new Error(data);          
            }
            history('/');
        } catch (error) {
            console.log(error);
            dispatch({type:'LOADING'})
            
        }
    }
    const logout = async () => {
        
        try {
            const res = await fetch(`/api/v1/auth/logout`,{
                method:'DELETE',
                headers:{
                    "Content-type":"application/json"
                }
            })
            const data = await res.json();
        } catch (error) {
            dispatch({type:'SET_ERROR',payload:error})
            console.log(error);
        }
    }
    
    

    return <AuthContext.Provider value={{...state,register,login,dispatch,logout}}>{children}</AuthContext.Provider>

}
