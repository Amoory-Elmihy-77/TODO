import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid2';
import IconButton from '@mui/material/IconButton';
import TextField from '@mui/material/TextField';

// style
import '../App.css';

// Dialog
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

// icons
import CheckIcon from '@mui/icons-material/Check';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { useContext, useState } from 'react';
import { TasksContext } from '../contexts/tasksContext';
import { Button } from '@mui/material';


export default function Task({ task }) {
    const { tasks, setTasks } = useContext(TasksContext);
    const [showDeleteDialog, setShowDeleteDialog] = useState(false);
    const [showUpdateDialog, setShowUpdateDialog] = useState(false);
    const [titleInUpdate, setTitleInUpdate] = useState(task.title);
    const [detailsInUpdate, setdetailsInUpdate] = useState(task.details);
    
    const deleteDialog = <Dialog
        style={{direction: "rtl"}}
        open={showDeleteDialog}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        onClose={()=> setShowDeleteDialog(false)}
    >
        <DialogTitle id="alert-dialog-title">
            {"هل أنت متأكد من حذف المهمة"}
        </DialogTitle>
        <DialogContent>
            <DialogContentText id="alert-dialog-description">
                عند التأكيد لا يمكنك استرجاع المهمة مرة أخرى
            </DialogContentText>
        </DialogContent>
        <DialogActions>
            <Button onClick={()=> setShowDeleteDialog(false)}>لا</Button>
            <Button autoFocus
                onClick={handleDeleteConfirm}
                style={{ background: '#b23c17', color: 'white' }}>
                نعم, تأكيد الحذف
            </Button>
        </DialogActions>
    </Dialog>;
    
    const updateDialog = <Dialog
        style={{ direction: "rtl" }}
        open={showUpdateDialog}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        onClose={() => setShowUpdateDialog(false)}
    >
        <DialogTitle id="alert-dialog-title">
            {"تعديل المهمة"}
        </DialogTitle>
        <DialogContent>
            <TextField
                autoFocus
                required
                margin="dense"
                label="Title"
                fullWidth
                variant="standard"
                value={titleInUpdate}
                onChange={(e)=> setTitleInUpdate(e.target.value)}
            />
            <TextField
                autoFocus
                required
                margin="dense"
                label="Details"
                fullWidth
                variant="standard"
                value={detailsInUpdate}
                onChange={(e)=> setdetailsInUpdate(e.target.value)}
            />
        </DialogContent>
        <DialogActions>
            <Button onClick={() => setShowUpdateDialog(false)}>الرجوع</Button>
            <Button autoFocus
                onClick={handleEditTask}
                style={{ background: '#1769aa', color: 'white' }}>
                تأكيد التعديل
            </Button>
        </DialogActions>
    </Dialog>;
    return (
        <>
            <Card className='task-card'
                sx={{ minWidth: 275, background: "#0b2b76", color: "white" }}>
                <CardContent>
                    <Grid container spacing={2} className="task-grid">
                        <Grid size={8}>
                            <Typography variant='h5' sx={{ textAlign: "right" }} style={{textDecoration:task.done?"line-through": 'none'}}>{task.title}</Typography>
                            <Typography variant='h6' sx={{ textAlign: "right" }}>{task.details}</Typography>
                        </Grid>
                        <Grid size={4} display="flex" justifyContent="space-around" alignItems="center">
                            <IconButton
                                onClick={()=> handleCheck(task.id)}
                                className='icon-btn check-icon'
                                style={{ color: task.done ? "white" : "#8bc34a", background: task.done ? "#8bc34a" : "white", border: "solid 3px #8bc34a" }}
                            >
                                <CheckIcon/>
                            </IconButton>
                            <IconButton className='icon-btn edit-icon'
                                onClick={()=> setShowUpdateDialog(true)}
                                style={{ color: "#1769aa", background: "white", border: "solid 3px #1769aa" }}
                            >
                                <EditIcon/>
                            </IconButton>
                            <IconButton className='icon-btn delete-icon'
                                style={{ color: "#b23c17", background: "white", border: "solid 3px #b23c17" }}
                                onClick={()=> setShowDeleteDialog(true)}
                            >
                                <DeleteIcon/>
                            </IconButton>
                        </Grid>
                    </Grid>
                </CardContent>
            </Card>
            {deleteDialog}
            {updateDialog}
        </>
    );
    function handleCheck(id) {
        setTasks(tasks.map((t) => {
            if (t.id === id) {
                // t.done = t.done === false ? true : false;
                t.done = !t.done;
            }
            return t;
        }))
        const updatedTasks = tasks;
        localStorage.setItem('tasks', JSON.stringify(updatedTasks));
    }
    function handleDeleteConfirm() {
        const updatedTasks = tasks.filter((t) => {
            return t.id !== task.id;
        });
        setTasks(updatedTasks);
        localStorage.setItem('tasks', JSON.stringify(updatedTasks));
    }
    function handleEditTask() {
        const updatedTasks = tasks.map((t) => {
            if (t.id === task.id)
                return ({ ...t, title: titleInUpdate, details: detailsInUpdate });
            else
                return t;
        });
        setTasks(updatedTasks)
        localStorage.setItem('tasks', JSON.stringify(updatedTasks));
        setShowUpdateDialog(false);
    }
}