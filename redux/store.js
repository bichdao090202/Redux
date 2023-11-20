import reducer from "./reducers"
import { createStore } from 'redux';

var store = createStore(reducer);

export default store;