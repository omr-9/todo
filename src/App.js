import logo from './logo.svg';
import './App.css';
import ToDoList from './Components/ToDoList';
import { createTheme,Theme } from '@mui/material';
import { ThemeProvider } from '@emotion/react';
import { v4 as uuidv4 } from 'uuid';
import { TodosContext } from './contexts/todosContext';
import { useState } from 'react';
// import MySnackBar from './Components/MySnackBar';
import { ToastContext, ToastProvider } from './contexts/ToastContext';
// console.log(uuidv4())
const theme = createTheme({
  typography:{
    fontFamily:["Alexandria"],
  },
  palette : {
    primary: {
      main:"#8bc34a"
    },
  }
})

const initialValue = [
  {
    id:uuidv4(),
    title:"قراءة كتاب",
    details:"نتبانينبتسانس",
    isCompleted:false,
  },
  {
    id:uuidv4(),
    title:"قراءة كتاب",
    details:"نتبانينبتسانس",
    isCompleted:false,
  },

]
function App() {
  const [todos,setTodos] = useState(initialValue)
 



  return (
    <ThemeProvider theme={theme}>
      <ToastProvider >

        <div className="App" style={{background:'#212121', height:'100vh', display:'flex', alignItems:'center',justifyContent:'center',direction:'rtl'}}>
          <TodosContext.Provider value={{todos,setTodos}}>

              <ToDoList />
          </TodosContext.Provider>
        </div>
      </ToastProvider>
    </ThemeProvider>
  );
}

export default App;
