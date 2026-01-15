import { useState } from 'react';

interface ITask {
  id: number;
  name: string;
  checked: boolean;
}

type TaskList = ITask[];

export default function App2() {
  const [taskList, setTaskList] = useState<TaskList>([]);
  const [taskInput, setTaskInput] = useState<string>('');
  const [editTaskInput, setEditTaskInput] = useState<string>('');
  const [isEditing, setEditing] = useState<boolean>(false);
  const [idCounter, setIdCounter] = useState<number>(0);

  function addTask() {
    if (taskInput) {
      setTaskList([...taskList, { id: idCounter, name: taskInput, checked: false } as ITask]);
      setIdCounter((prevId) => prevId + 1);
    }
    setTaskInput('');
  }

  function deleteTask(id: number) {
    setTaskList(taskList.filter((task) => task.id != id));
  }

  function editTask(id: number, newName: string) {
    const newTaskList = taskList.map((task) => {
      if (task.id === id) task.name = newName;
      return task;
    });
    setTaskList(newTaskList);
    setEditTaskInput('');
  }

  function checkTask(id: number) {
    const newTaskList = taskList.map((task) => {
      if (task.id === id) task.checked = !task.checked;
      return task;
    });
    setTaskList(newTaskList);
  }

  function cancelEdit() {
    setEditing(false);
    setEditTaskInput('');
  }

  return (
    <div className="">
      <h1>List of tasks:</h1>
      <input placeholder="task here" value={taskInput} onChange={(e) => setTaskInput(e.currentTarget.value)} />
      <button className="" onClick={addTask}>
        Add Task
      </button>
      <div className="row">
        {taskList?.map((task, index) => (
          <div key={index}>
            <input type="checkbox" checked={task.checked} onChange={() => checkTask(task.id)} />
            {isEditing ? (
              <div>
                <input placeholder={task.name} value={editTaskInput} onChange={(e) => setEditTaskInput(e.currentTarget.value)} />
                <button onClick={() => editTask(task.id, editTaskInput)}>Save edit</button>
                <button onClick={cancelEdit}>Cancel edit</button>
              </div>
            ) : (
              <div>
                <p>{task.name}</p>
                <button className="" onClick={() => setEditing(true)}>
                  Edit Task
                </button>
                <button className="" onClick={() => deleteTask(task.id)}>
                  Delete Task
                </button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
