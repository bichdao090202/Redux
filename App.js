import { useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import store from "./redux/store";
import increment from "./redux/actions";
import { Provider } from 'react-redux';
import Counter from './Counter';

export default function App() {
  var [count, setCount] = useState(0);
  console.log(store.getState());
  return (
    <Provider store={store}>
      <View style={styles.container}>
      <Text>{count}</Text>
      <Pressable style={{width:60,height:40,borderWidth:1, borderColor:'black', alignItems:'center',justifyContent:'center'}}
        onPress={()=>{
          store.dispatch(increment);
          setCount(store.getState().count);
        }}
      > 
      </Pressable>
    </View>
      {/* <Counter /> */}
    </Provider>
  )


}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
