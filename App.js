import { FlatList, StyleSheet,TextInput,View } from 'react-native';
import { todoAction } from './redux/action';
import {store} from "./redux/store"
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Provider, useDispatch, useSelector } from 'react-redux';
import { NavigationContainer } from '@react-navigation/native';
import { useEffect, useState } from 'react';
import { axios } from 'axios';


const Stack = createNativeStackNavigator();

function Screen1({navigation}){
  const dispatch = useDispatch();
  var [todos,setTodos]=useState();
  var {data:todos} = useSelector(state=>state.todo)
  const axios = require('axios');

  const getData =()=>{
    fetch('https://653f17299e8bd3be29dfede0.mockapi.io/todos')
    .then((res)=>res.json()).then((json)=> dispatch(todoAction.todoGet.fil(json)))
  }

  const putData=(item)=>{
    fetch(`https://653f17299e8bd3be29dfede0.mockapi.io/todos/${item.id}`,{
      method:"PUT",
      headers:{"Content-Type":"application/json"},
      body: JSON.stringify(item)
    })
    setTodos([...todos])
  }

  const deleteData =(id)=> {
    fetch(`https://653f17299e8bd3be29dfede0.mockapi.io/todos/${id}`,{
      method:"DELETE",
      headers:{"Content-Type":"application/json"},
    }).then(()=>getData())
  }

  useEffect(()=>getData(),[])

  return(
    <View style={{ justifyContent: 'center', alignItems: 'center' }}>
      <FlatList data={todos} renderItem={({ item, index }) => (
        <View style={{ height: 30, width: 300, borderColor: 'black', borderWidth: 1, margin: 10, flexDirection: 'row', justifyContent: 'space-around' }}>
          <TextInput value={item.content} onChangeText={(text) => {
            todos[index].content = text;
            putData(item);
          }}></TextInput>
          <button onClick={() => { deleteData(item.id) }}>delete</button>
        </View>
      )}>
      </FlatList>
      <button onClick={() => navigation.navigate("AddJob")}>Add Job</button>
    </View>

  )
}

function Screen2({navigation}){
  const dispatch = useDispatch();
  var [job, setJob] = useState("");
  var newJob;

  const addData = (job) => {
    fetch(`https://653f17299e8bd3be29dfede0.mockapi.io/todos`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(job)
    }).then(() => {
      fetch('https://653f17299e8bd3be29dfede0.mockapi.io/todos')
        .then((res) => res.json())
        .then((json) => dispatch(todoAction.todoGet.fil(json)))
    }).then(() => navigation.navigate("Home"))
  }

  return (
    <View style={{ justifyContent: 'center', alignItems: 'center' }}>
      <TextInput style={{ height: 30, width: 300, borderColor: 'black', borderWidth: 1, margin: 10, flexDirection: 'row', justifyContent: 'space-around' }}
        value={job} onChangeText={(text) => setJob(text)}
      ></TextInput>
      <button onClick={() => {
        newJob = { content: job }
        setJob(...job)
        addData(newJob);
      }}>Add</button>
    </View>
  )
}


export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Home" component={Screen1}></Stack.Screen>
          <Stack.Screen name="AddJob" component={Screen2}></Stack.Screen>
        </Stack.Navigator>
      </NavigationContainer>
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
