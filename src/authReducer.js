
const authReducer = (state,action) => {
    if(action.type === 'ENTER_EMAIL'){
        return {...state,email:action.payload}
    }
    if(action.type === 'ENTER_NAME'){
        return {...state,name:action.payload}
    }
    if(action.type === 'ENTER_PASSWORD'){
        return {...state,password:action.payload}
    }
    if(action.type === 'LOGIN'){
        return {...state,user:action.payload}
    }
    if(action.type === 'REGISTER_USER'){
        return {...state,user:action.payload}
    }
    if(action.type === 'LOADING'){
        return {...state,loading:!state.loading}
    }
    if(action.type === 'SET_ERROR'){
        return {...state,error:action.payload}
    }
    if(action.type === 'LOGOUT'){
        return {...state,user:null,token:null}
    }
    if(action.type === 'SET_COOKIE'){
        return {...state,token:action.payload}
    }
    
    return state;
}

export default authReducer;