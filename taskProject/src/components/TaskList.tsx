import { useState } from 'react';

export default function TaskList(props: {
  id: number;
  checked: boolean;
  name: string;
  onCheck: (id: number) => void;
  onDelete: (id: number) => void;
  onEditTask: (id: number, name: string) => void;
}) {
  const { id, checked, name, onCheck, onEditTask, onDelete } = props;
  const [isEditing, setIsEditing] = useState(false);
  const [inputValue, setInputValue] = useState(name);

  return (
    <div className='row'>
      <input type='checkbox' checked={checked} onChange={() => onCheck(id)} />
      {isEditing ? (
        <>
          <input
            value={inputValue}
            onChange={(e) => {
              setInputValue(e.target.value);
            }}
          />
          <button
            onClick={() => {
              onEditTask(id, inputValue);
              setIsEditing(false);
            }}
          >
            Save edit
          </button>
          <button
            onClick={() => {
              setIsEditing(false);
              setInputValue(name);
            }}
          >
            Cancel edit
          </button>
        </>
      ) : (
        <>
          <p>{name}</p>
          <button onClick={() => setIsEditing(true)}>Edit</button>
          <button onClick={() => onDelete(id)}>Delete</button>
        </>
      )}
    </div>
  );
}
