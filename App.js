import { FlatList, StyleSheet,TextInput,View } from 'react-native';
import { todoAction } from './redux/action';
import {store} from "./redux/store"
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Provider, useDispatch, useSelector } from 'react-redux';
import { NavigationContainer } from '@react-navigation/native';
import { useEffect, useState } from 'react';
import axios from 'axios';

const Stack = createNativeStackNavigator();
const url = `https://653f17299e8bd3be29dfede0.mockapi.io/user/`

function Screen0({ navigation }) {
  var [user,setuser] = useState("")
  var [pass,setpass] = useState("")
  var list =[];
  const dispatch = useDispatch();

  return (
    <View>
      <TextInput onChangeText={(data) => setuser(data)}></TextInput>
      <TextInput onChangeText={(data) => setpass(data)}></TextInput>
      <button onClick={() => {
        axios.get(url).then(res => list=res.data)
        list.forEach(item => {
          if (item.username === user && item.pass === pass) {            
            dispatch(todoAction.user.fil(item.id))
            navigation.navigate("Home")
          }
        })        
      }}>Go to Home</button>
    </View>
  )
}


function Screen1({navigation}){
  const dispatch = useDispatch();
  var [todos,setTodos]=useState();
  var {data:todos} = useSelector(state=>state.todo)
  var {id:id} = useSelector(state=>state.todo)
  var obj =[];

  const getData =()=>{
    axios.get(`${url}${id}`).then(res => dispatch(todoAction.todoGet.fil(res.data.todo)))
  }

  useEffect(()=>getData(),[])

  const putData=()=>{
    setTodos([...todos])
    obj = {todo:todos}
    axios.put(`${url}${id}`,obj)
    getData();
  }

  const deleteData =(index)=> {
    todos.splice(index, 1);
    putData();
  }

  return(
    <View style={{ justifyContent: 'center', alignItems: 'center' }}>
      <FlatList data={todos} renderItem={({ item, index }) => (
        <View style={{ height: 30, width: 300, borderColor: 'black', borderWidth: 1, margin: 10, flexDirection: 'row', justifyContent: 'space-around' }}>
          <TextInput value={item.content} onChangeText={(text) => {
            todos[index].content = text; 
            putData();
          }}></TextInput>
          <button onClick={() => deleteData(index)}>delete</button>
        </View>
      )}>
      </FlatList>
      <button onClick={() => navigation.navigate("AddJob")}>Add Job</button>
    </View>
  )
}

function Screen2({navigation}){
  var {data:todos} = useSelector(state=>state.todo)
  var {id:id} = useSelector(state=>state.todo)
  var obj =[];
  var [job, setJob] = useState("");
  var newJob;
  var newId;

  return (
    <View style={{ justifyContent: 'center', alignItems: 'center' }}>
      <TextInput style={{ height: 30, width: 300, borderColor: 'black', borderWidth: 1, margin: 10, flexDirection: 'row', justifyContent: 'space-around' }}
         onChangeText={(text) => setJob(text)}
      ></TextInput>
      <button onClick={() => {
        newId = Number(todos[todos.length-1].id)+1;
        newJob = { id:newId, content: job }
        todos.push(newJob)
        obj = {todo: todos}
        axios.put(`${url}${id}`,obj)
      }}>Add</button>
    </View>
  )
}

export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator>
        <Stack.Screen name="Screen0" component={Screen0}></Stack.Screen>
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
