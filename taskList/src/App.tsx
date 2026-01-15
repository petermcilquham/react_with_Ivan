import { useState } from 'react';
import './App.css';
import TaskList from './components/TaskList';

export interface Task {
  id: number;
  name: string;
  checked: boolean;
}

function App() {
  const [taskList, setTaskList] = useState<Task[]>([]);
  const [taskInput, setTaskInput] = useState<string>('');
  const [id, setId] = useState<number>(0);

  function check(id: number) {
    setTaskList(
      taskList.map((task) => {
        if (task.id == id) task.checked = !task.checked;
        return task;
      })
    );
  }

  function createTask() {
    setTaskList([...taskList, { id: id, name: taskInput, checked: false } as Task]);
    setId((id) => id + 1);
    setTaskInput('');
  }

  function editTask(id: number, newTaskName: string) {
    setTaskList(
      taskList.map((task) => {
        if (task.id == id) task.name = newTaskName;
        return task;
      })
    );
  }

  function deleteTask(id: number) {
    setTaskList(taskList.filter((task) => task.id != id));
  }

  return (
    <>
      <form action={createTask}>
        <input type="text" value={taskInput} onChange={(e) => setTaskInput(e.currentTarget.value)} />
        <button type="submit">Add Task</button>
      </form>
      {taskList.map(({ id, name, checked }) => (
        <TaskList id={id} name={name} checked={checked} check={check} editTask={editTask} deleteTask={deleteTask} />
      ))}
    </>
  );
}

export default App;
