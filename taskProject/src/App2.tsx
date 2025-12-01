import { useState } from 'react';

interface ITask {
  id: number;
  name: string;
  checked: boolean;
}

export default function App2() {
  const [taskList, setTaskList] = useState<ITask[]>([]);
  const [arr, setArr] = useState<string[]>([]);

  function addArr() {
    setArr([...arr, '']);
  }
  function addTask() {
    setTaskList([...taskList, { id: 1, name: '', checked: false } as ITask]);
  }

  function editArr(newValue: string, value: string, index?: number) {
    if (index) {
      setArr(
        arr.map((el, i) => {
          if (i === index) {
            el = newValue;
          }
          return el;
        })
      );
    } else {
      setArr(
        arr.map((el) => {
          if (el === value) {
            el = newValue;
          }
          return el;
        })
      );
    }
  }
  function editTask(id: number, newName: string) {
    setTaskList(
      taskList.map((task) => {
        if (task.id === id) task.name = newName;
        return task;
      })
    );
  }

  function deleteArr(index: number) {
    setArr(arr.filter((el, i) => i != index));
  }
  function deleteTask(id: number) {
    setTaskList(taskList.filter((task) => task.id != id));
  }

  return (
    <div>
      {taskList.map((task, index) => {
        return <div key={index}>{task.name}</div>;
      })}
      <div>
        <button onClick={addTask}></button>
        <button onClick={() => editTask(1, '')}></button>
        <button onClick={() => deleteTask(1)}></button>
      </div>
      {arr.map((el, index) => {
        return <div key={index}>{el}</div>;
      })}
      <div>
        <button onClick={addArr}></button>
        <button onClick={() => editArr('', '')}></button>
        <button onClick={() => deleteArr(1)}></button>
      </div>
    </div>
  );
}
