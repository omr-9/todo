import * as React from 'react';
import Card from '@mui/material/Card';
// import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Unstable_Grid2';
// import Button from '@mui/material/Button';
// import TextField from '@mui/material/TextField';
// import Dialog from '@mui/material/Dialog';
// import DialogActions from '@mui/material/DialogActions';
// import DialogContent from '@mui/material/DialogContent';
// import DialogContentText from '@mui/material/DialogContentText';
// import DialogTitle from '@mui/material/DialogTitle';

// icons
import CheckIcon from '@mui/icons-material/Check';
import { IconButton } from '@mui/material';
import ModeEditOutlineOutlinedIcon from '@mui/icons-material/ModeEditOutlineOutlined';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';

//other
import { useContext } from 'react';
import { TodosContext } from './contexts/todosContext';
import { useToast } from './contexts/ToastContext';

export default function Todo({todo, showDelete, showUpdate}){

   
    
    // const [updatedTodo,setUpdatedTodo] =useState({title:todo.title,details:todo.details})
    const {todos,setTodos} = useContext(TodosContext)
    const {showHideToast} = useToast()

    // handel funcitons
    function handleCheckClick(){
        const updatedTodos = todos.map((t) => {
            if (t.id === todo.id){
                t.isCompleted = !t.isCompleted
            }
            return t
        })
        setTodos(updatedTodos)
        localStorage.setItem("todos",JSON.stringify(updatedTodos))
        showHideToast("تم التعديل بنجاح")
    }
    // delete functions 
    function handleDeleteClick(){
        showDelete(todo)
    }
    
   
    // == delete functions ==
    // update functions 
  
    function handleUpdateClick(){
        showUpdate(todo)
    }
    //== update functions ==

    // ==handel funcitons==
    return(
        <>
      

           
            <Card className='todoCard' sx={{ minWidth: 275, marginTop:5,color:'white',background:'#283593' }}>
            <CardContent>
                <Grid container spacing={2}>
                    <Grid xs={8} >
                    
                        <Typography variant="h5" sx={{textAlign:'right',textDecoration:todo.isCompleted? 'line-through':'none'}} >
                              {todo.title}
                        </Typography>
                        <Typography variant="h6" sx={{textAlign:'right',textDecoration:todo.isCompleted? 'line-through':'none'}} >
                                {todo.details}
                        </Typography>
                    </Grid>
                    <Grid xs={4} display='flex' justifyContent='space-around' alignItems='center'>
                    <IconButton className='iconButton' style={{background: todo.isCompleted?'#8bc34a':'white',color:todo.isCompleted?'white':'#8bc34a' ,border:'3px solid #8bc34a'}} onClick={handleCheckClick}>
                        <CheckIcon />
                    </IconButton>
                    <IconButton onClick={handleUpdateClick} className='iconButton' style={{background:'white',color:'#1769aa' ,border:'3px solid #1769aa'}}>
                        <ModeEditOutlineOutlinedIcon />
                    </IconButton>
                    <IconButton onClick={handleDeleteClick} className='iconButton' style={{background:'white',color:'#b23c17' ,border:'3px solid #b23c17'}}>
                        <DeleteOutlineOutlinedIcon />
                    </IconButton>
                    </Grid>
                    
                </Grid>
            </CardContent>
            </Card>
        </>
    )
}