var init = { count: 0 };
const reducer = (state = init, action) => {
  switch (action.type) {
    case 'increment':
      return {
        count: state.count + 1
      }
    case 'subtract':
      return {
        count: state.count - 1
      }
    default:
      return state;
  }
}

export default reducer;