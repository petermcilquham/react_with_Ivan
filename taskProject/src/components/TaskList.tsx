export default function TaskList(props: {
  id: number;
  checked: boolean;
  name: string;
  onCheck: (id: number) => void;
  onDelete: (id: number) => void;
  isEditing: boolean;
  onEditTask: (id: number, name: string) => void;
  setIsEditing: (isEditing: boolean) => void;
}) {
  const { id, checked, name, onCheck, isEditing, onEditTask, setIsEditing, onDelete } = props;
  return (
    <div className='row'>
      <input type='checkbox' checked={checked} onChange={() => onCheck(id)} />
      <p>{name}</p>
      {isEditing && (
        <input
          value={name}
          onChange={(e) => {
            onEditTask(id, e.target.value);
          }}
        />
      )}
      <button onClick={() => setIsEditing(true)}>Edit</button>
      <button onClick={() => onDelete(id)}>Delete</button>
    </div>
  );
}
