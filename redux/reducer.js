export const init = {
    data: null,
    id: null
}

export const reducer = (state = init, action) => {
    switch (action.type) {
        case "GET":
            return { ...state, data: action.payload }
        case "USER":
            return { ...state, id: action.payload }
        default:
            return state;
    }
}
export default reducer;