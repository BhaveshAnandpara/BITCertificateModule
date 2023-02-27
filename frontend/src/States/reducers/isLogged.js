const initialState = {
    isAuthenticated:false,
    msg:{},
    accessToken:""
}

const loggedReducer = (state = initialState , action)=>{
    switch (action.type) {
        case 'LOGIN':
            return action.payload
        default:
            return state
    }
}

export default loggedReducer