export const todoAction ={
    todoGet:{
        fil:(data)=>({
            type:"GET",
            payload:data
        })
    },
    user:{
        fil:(data)=>({
            type:"USER",
            payload:data
        })
    }
}