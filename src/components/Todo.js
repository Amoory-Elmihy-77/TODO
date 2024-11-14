import { Container, Divider } from "@mui/material";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import Grid from '@mui/material/Grid2';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
//style
import '../App.css';
// uuid
import { v4 as uuid } from "uuid";
// Components
import Task from "./task";
//hooks
import { useContext, useMemo, useState } from "react";
import { TasksContext } from "../contexts/tasksContext";

export default function Todo() {
    const [newTaskInput, setNewTaskInput] = useState('');
    const [showType, setShowType] = useState('all');
    const {tasks, setTasks} = useContext(TasksContext);
    let allTasks = [];
    const notDone = useMemo(() => {
        return tasks.filter((t) => {
            return !t.done;
        })
    }, [tasks]);
    const done = useMemo(() => {
        return tasks.filter((t) => {
            return t.done;
        })
    }, [tasks]);
        let shownType = tasks;
        if (showType === 'done')
            shownType = done ?? [];
        else if (showType === 'notDone')
            shownType = notDone ?? [];
        else
            shownType = tasks;
    allTasks = shownType.map((t) => {
        return (<Task key={t.id ?? 0} task={t} />)
    })
    return (
        <Container maxWidth={"sm"}>
            <Card sx={{ minWidth: 275 }}>
                <CardContent>
                    <Typography variant="h2" style={{ fontWeight: 'bold' }}>
                        مهامي
                    </Typography>
                    <Divider />
                    <ToggleButtonGroup
                        style={{ direction: "ltr", margin: "30px 0" }}
                        color="primary"
                        value={showType}
                        exclusive
                        onChange={handleShowType}
                        aria-label="Platform"
                    >
                        <ToggleButton value="notDone">غير المنجز</ToggleButton>
                        <ToggleButton value="done">منجز</ToggleButton>
                        <ToggleButton value="all">الكل</ToggleButton>
                    </ToggleButtonGroup>
                    {/* todos */}
                    <div className="all-tasks">
                        {allTasks}
                    </div>
                    {/* add task */}
                    <Grid container spacing={2} style={{marginTop: '20px'}}>
                        <Grid size={8}>
                            <TextField
                                value={newTaskInput}
                                onChange={(e)=> setNewTaskInput(e.target.value)}
                                id="outlined-basic" label="عنوان المهمة" variant="outlined" style={{ width: '100%' }} />
                        </Grid>
                        <Grid size={4}>
                            <Button disabled={newTaskInput.length < 2} onClick={handleAdd} variant="contained" style={{ width: '100%', height: '100%' }}>اضافة</Button>
                        </Grid>
                    </Grid>
                </CardContent>
            </Card>
        </Container>
    );
    function handleAdd() {
        const newTask = {
            id: uuid(),
            title: newTaskInput,
            details: '',
            done: false
        };
        let updatedTasks = [];
        if (tasks) {
            updatedTasks = [...tasks, newTask];
        } else
            updatedTasks = [newTask];
        setTasks(updatedTasks);
        localStorage.setItem('tasks', JSON.stringify(updatedTasks));
        setNewTaskInput('');
    }
    function handleShowType(e) {
        setShowType(e.target.value);
    }
}