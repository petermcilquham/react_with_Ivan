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
  const [count, setCount] = useState(0);
  const [isEditing, setIsEditing] = useState(false);

  function onDelete(id: number): void {
    // const taskToBeDeleted = taskList.filter((task)=>task.name != name)
    // const taskToBeDeletedID = taskList.findIndex((task)=> task.name === name)
    setTaskList([...taskList].filter((task) => task.id != id));
  }

  function onEdit(e: React.ChangeEvent<HTMLInputElement>) {
    setInputValue(e.currentTarget.value);
  }

  function onCheck(id: number): void {
    const newTaskList = taskList.map((task) => {
      if (task.id === id) task.checked = !task.checked;
      return task;
    });
    setTaskList(newTaskList);
  }

  function addTask() {
    // e: React.FormEvent<HTMLButtonElement>
    // e.preventDefault();
    setTaskList([...taskList, { id: count, name: inputValue, checked: false } as ITask]);
    setCount((prevCount) => prevCount + 1);
    setInputValue('');
  }

  function onEditTask(id: number, name: string) {
    const newTaskList = taskList.map((task) => {
      if (task.id === id) task.name = name;
      return task;
    });
    setTaskList(newTaskList);
  }

  return (
    <>
      <h1>Groceries</h1>
      <ul>
        <input value={inputValue} onChange={onEdit} />
        <button onClick={addTask}>Add task</button>
        {taskList.map((task, index) => {
          return (
            <li key={index}>
              <TaskList
                id={task.id}
                checked={task.checked}
                name={task.name}
                onCheck={onCheck}
                isEditing={isEditing}
                onEditTask={onEditTask}
                setIsEditing={setIsEditing}
                onDelete={onDelete}
              />
            </li>
          );
        })}
      </ul>
    </>
  );
}

export default App;

// const tasks = [{ name: 'task 1' }, { name: 'task 1' }, { name: 'task 1' }, { name: 'task 1' }, { name: 'task 1' }];
