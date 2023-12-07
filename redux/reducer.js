export const init ={data:null}

export const reducer=(state=init, action)=>{
    switch (action.type) {
        case "GET":
            return {...state,data:action.payload}
        default:
            return state;
    }
}
export default reducer;