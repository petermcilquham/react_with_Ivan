import { useState } from 'react';

interface TaskListProps {
  id: number;
  name: string;
  checked: boolean;
  check: (id: number) => void;
  editTask: (id: number, newTaskName: string) => void;
  deleteTask: (id: number) => void;
}

export default function TaskList({ id, name, checked, check, editTask, deleteTask }: TaskListProps) {
  const [editInput, setEditInput] = useState<string>('');
  const [isEditing, setIsEditing] = useState<boolean>(false);

  return (
    <div key={id} className="row">
      <p>{id}</p>
      <input type="checkbox" checked={checked} onChange={() => check(id)} />
      {isEditing ? (
        <div className="row">
          <input type="text" placeholder={name} value={editInput} onChange={(e) => setEditInput(e.currentTarget.value)} />
          <button
            onClick={() => {
              editTask(id, editInput);
              setIsEditing(false);
            }}
          >
            Complete Edit
          </button>
          <button
            onClick={() => {
              setEditInput('');
              setIsEditing(false);
            }}
          >
            Cancel Edit
          </button>
        </div>
      ) : (
        <div className="row">
          <p>{name}</p>
          <button onClick={() => setIsEditing(true)}>Edit</button>
          <button onClick={() => deleteTask(id)}>Delete</button>
        </div>
      )}
    </div>
  );
}
