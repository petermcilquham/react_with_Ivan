import { useState } from 'react';
import './App.css';
import TaskList from './components/TaskList';

interface ITask {
  id: number;
  name: string;
  checked: boolean;
}

type ITaskList = ITask[];

function App() {
  const [taskList, setTaskList] = useState<ITaskList>([]);
  const [inputValue, setInputValue] = useState('');
  const [taskID, setTaskID] = useState(0);

  function addTask() {
    if (inputValue) {
      setTaskList([...taskList, { id: taskID, name: inputValue, checked: false } as ITask]);
      setTaskID((prevTaskID) => prevTaskID + 1);
    }
    setInputValue('');
  }

  function checkTask(id: number): void {
    const newTaskList = taskList.map((task) => {
      if (task.id === id) task.checked = !task.checked;
      return task;
    });
    setTaskList(newTaskList);
  }

  function editTask(id: number, name: string) {
    const newTaskList = taskList.map((task) => {
      if (task.id === id) task.name = name;
      return task;
    });
    setTaskList(newTaskList);
  }

  function deleteTask(id: number): void {
    setTaskList(taskList.filter((task) => task.id != id));
  }

  return (
    <>
      <h1>Groceries</h1>
      <ul>
        <input value={inputValue} onChange={(e) => setInputValue(e.currentTarget.value)} />
        <button onClick={addTask}>Add task</button>
        {taskList.map((task, index) => {
          return (
            <li key={index}>
              <TaskList id={task.id} checked={task.checked} name={task.name} onCheck={checkTask} onEditTask={editTask} onDelete={deleteTask} />
            </li>
          );
        })}
      </ul>
    </>
  );
}

export default App;
