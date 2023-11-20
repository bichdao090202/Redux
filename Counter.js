import React from 'react';
import {useDispatch, useSelector } from 'react-redux';
import { increment } from './redux/actions';
import { decrement } from './redux/actions';
import { View,Text } from 'react-native';


const Counter = () => {
  var count = useSelector(state => state.count);
  var dispatch = useDispatch();


  const reset = () => {
    dispatch({ type: "RESET" })
  }


  return (
    <View>
      <Text>{count} <br /></Text>      
      <button onClick={()=>dispatch(increment)}>Increment </button>
      <button onClick={()=>dispatch(decrement)}> Decrement </button>
      <button onClick={reset} >Reset </button>
    </View>
  )
}
export default Counter;