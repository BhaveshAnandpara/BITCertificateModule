export const setIsLogged = (state) =>{
    return (dispatch)=>{
        dispatch({
            type:'LOGIN',
            payload:state
        })
    }
}