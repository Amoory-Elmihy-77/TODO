import { useEffect, useState } from 'react';
import './App.css';
import Todo from './components/Todo';
import { createTheme, ThemeProvider } from '@mui/material';
import { TasksContext } from './contexts/tasksContext';

// // uuid
// import { v4 as uuid } from "uuid";


const theme = createTheme({
  typography: {
    fontFamily: "Alex",
  },
});

function App() {
  const [tasks, setTasks] = useState([{}]);
  useEffect(() => {
    const localTasks = JSON.parse(localStorage.getItem('tasks') || "[]") ?? [];
    setTasks(localTasks);
  },[])
  return (
    <ThemeProvider theme={theme}>
      <div className="App">
        <TasksContext.Provider value={{tasks, setTasks}}>
          <Todo />
        </TasksContext.Provider>
      </div>
    </ThemeProvider>
  );
}

export default App;
