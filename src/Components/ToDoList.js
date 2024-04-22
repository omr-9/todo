
import Container from '@mui/material/Container';
import * as React from 'react';
import Card from '@mui/material/Card';
// import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { Divider, ToggleButtonGroup, ToggleButton} from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle'

// component 
import Todo from '../Todo';

//others 
// import { v4 as uuidv4 } from 'uuid';
import { TodosContext } from '../contexts/todosContext';
import { useToast } from '../contexts/ToastContext';
import { useState, useContext, useEffect, useMemo, useReducer } from 'react';

// import reducer from '../Reducers/todosReducer';
import todosReducer from '../Reducers/todosReducer'
export default function ToDoList() {


  const {todos2,setTodos} = useContext(TodosContext)
const [todos, dispatch] = useReducer(todosReducer, [])
  const {showHideToast} = useToast()
  const [displayTodoType,setDisplayTodoType] = useState("all")
  const [titleInput, setTitleInput] = useState("")
  const [showDeleteDialog,setShowDeleteDialog] = useState(false)
  const [showUpdateDialog,setShowUpdateDialog] = useState(false)
  const [dialogTodo,setDialogTodo] = useState(null)

  
  
  const completedTodos = useMemo(() => {
    return todos.filter((t) => {
      console.log("completed");
      return t.isCompleted
    })
  },[todos])


  const notCompletedTodos =useMemo(() => {
    
    return todos.filter((t) => {
      console.log("non completed");
      return !t.isCompleted
    })
  },[todos]) 


  
  

  let todosToBeRendered = todos
 if (displayTodoType === "completed") {
  todosToBeRendered = completedTodos
 } else if (displayTodoType === "non-completed") {
  todosToBeRendered = notCompletedTodos
 }else{
  todosToBeRendered = todos
 }
 
 useEffect(() => {
    console.log("calling from use effect");
    const storageTodos = JSON.parse(localStorage.getItem("todos")) ?? []
    setTodos(storageTodos)
   }, [])


  function handleAddClicked(){
    dispatch({type:'added',payload:{newTitle:titleInput}})
    setTitleInput("")
    showHideToast("تمت الاضافة بنجاح")
  }
  
  function changeDisplayType(e){
    setDisplayTodoType(e.target.value)
  }
   // handlers 
   function handleDeleteClose(){
     setShowDeleteDialog(false)
    }
    
    function handleDeleteConfirm(){
      dispatch({type:'deleted',payload:dialogTodo})
      setShowDeleteDialog(false)
      showHideToast("تم الحذف بنجاح")
    }
function openDeleteDialo(todo){
     setDialogTodo(todo)
      setShowDeleteDialog(true)
    }
function openUpdateDialog(todo){
     setDialogTodo(todo)
      setShowUpdateDialog(true)
    }

function handleUpdateClose(){
  setShowUpdateDialog(false)
}
function handleUpdateConfirm(){
  const updatedTodos = todos.map((t) => {
      if(t.id === dialogTodo.id){
          return {...t , title:dialogTodo.title ,details:dialogTodo.details}
      }else{
          return t
      }
  })
  setTodos(updatedTodos)
  setShowUpdateDialog(false)
  localStorage.setItem("todos",JSON.stringify(updatedTodos))
  showHideToast("تم التحديث بنجاح")
}
const todosJSX = todosToBeRendered.map((t) => {
  return <Todo key={t.id} todo={t} showDelete={openDeleteDialo} showUpdate={openUpdateDialog}/>
})
return (
  <>
        {/* delete dilog */}
        <Dialog
            style={{direction:'rtl'}}
            open={showDeleteDialog}
            onClose={handleDeleteClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
              >       
            <DialogTitle id="alert-dialog-title">
            {"هل انت متأكد من رغبتك في حذف المهمه؟"}
            </DialogTitle>
            <DialogContent>
            <DialogContentText id="alert-dialog-description">
               لا يمكنك التراجع عن الحذف بعد اتمامه
            </DialogContentText>
            </DialogContent>
            <DialogActions>
            <Button onClick={handleDeleteClose} >اغلاق</Button>
            <Button  autoFocus onClick={handleDeleteConfirm}>
                حذف</Button>
            </DialogActions>
        </Dialog>
        {/*== delete dilog == */}
         {/* update dialog */}
         <Dialog
            style={{direction:'rtl'}}
            open={showUpdateDialog}
            onClose={handleUpdateClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
              >       
            <DialogTitle id="alert-dialog-title">
            {"تعديل مهمة"}
            </DialogTitle>
            <DialogContent>
            <DialogContentText id="alert-dialog-description">
                <TextField
                autoFocus
                required
                margin="dense"
                id="name"            
                label="عنوان المهمة"
                fullWidth
                variant="standard"
                value={dialogTodo.title}
                onChange={((e) => {
                    setDialogTodo({...dialogTodo,title:e.target.value})
                })}
                />
                
                <TextField
                autoFocus
                required
                margin="dense"
                id="name"
                label="التفاصيل"
                fullWidth
                variant="standard"
                value={dialogTodo.details}
                onChange={((e) => {
                    setDialogTodo({...dialogTodo, details:e.target.value})
                })}
                />
            </DialogContentText>
            </DialogContent>
            <DialogActions>
            <Button onClick={handleUpdateClose} >اغلاق</Button>
            <Button  autoFocus onClick={handleUpdateConfirm}>
                تأكيد</Button>
            </DialogActions>
            </Dialog>
        {/* ==update dilog== */}
      <Container maxWidth="sm">
          <Card sx={{ minWidth: 275 }} style={{
            maxHeight:'80vh',
            overflow:'scroll',
          }}>
          <CardContent>
            <Typography variant="h1" style={{ fontWeight:'bold',marginBottom:'50px'}}>
              مهامي
            </Typography>
            <Divider />
                    <ToggleButtonGroup
              value={displayTodoType}
              exclusive
              onChange={changeDisplayType}
              aria-label="text alignment"
              style={{marginTop:'30px',direction:'ltr'}}
            >
              <ToggleButton value="non-completed" aria-label="right aligned">
                غير المنجز 
              </ToggleButton>
              <ToggleButton value="completed" aria-label="centered">
                المنجز
              </ToggleButton>
              <ToggleButton value="all" aria-label="left aligned">
                الكل
              </ToggleButton>
            </ToggleButtonGroup> 
            {/* all to do  */}
            {todosJSX}
            {/*=========== all to do =========== */}
            {/* inputs  */}
            <Grid container spacing={2} style={{marginTop:'20px'}}>
                    <Grid xs={8} >
                       <TextField style={{width:'100%'}} id="outlined-basic" label="عنوان المهمة" variant="outlined" value={titleInput} onChange={(e) =>{setTitleInput(e.target.value)}} /> 
                    </Grid>
                    <Grid xs={4} >
                       <Button style={{width:'100%', height:'100%'}} disabled={titleInput.length === 0} variant="contained" onClick={handleAddClicked}>اضافة</Button>
                    </Grid>
                    
            </Grid>
            {/*===== inputs ===== */}
          </CardContent>
        </Card>
    
      </Container>
    </>
  );
}