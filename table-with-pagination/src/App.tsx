import { useState, type ChangeEvent } from 'react';
import users from './users';

type User = (typeof users)[0];
function paginate(usersList: User[], page: number, pageSize: number) {
  const start = (page - 1) * pageSize;
  const end = start + pageSize;
  const totalPages = Math.ceil(usersList.length / pageSize);
  const pageUsers = usersList.slice(start, end);
  return { pageUsers, totalPages };
}

export default function App2() {
  const [page, setPage] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(5);

  const { pageUsers, totalPages } = paginate(users, page, pageSize);

  function prevPage() {
    if (page > 0) setPage((prev) => prev - 1);
  }
  function nextPage() {
    if (page < totalPages) setPage((prev) => prev + 1);
  }

  function changeSelect(e: ChangeEvent<HTMLSelectElement>) {
    setPageSize(Number(e.currentTarget.value));
    setPage(1);
  }

  return (
    <div className="container">
      <table>
        <thead>
          <tr>
            {labels.map(({ label, key }) => {
              return <th key={key}>{label}</th>;
            })}
          </tr>
        </thead>
        <tbody>
          {pageUsers.map(({ id, name, age, occupation }) => (
            <tr key={id}>
              <td>{name}</td>
              <td>{age}</td>
              <td>{occupation}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <hr />
      <div className="buttonsRow">
        <select name="pageSize" id="pageSize" onChange={(e) => changeSelect(e)}>
          <option value={5}>5</option>
          <option value={10}>10</option>
          <option value={15}>15</option>
        </select>
        <button onClick={prevPage} disabled={page === 1}>
          Prev
        </button>
        <p>
          Page {page} of {totalPages}
        </p>
        <button onClick={nextPage} disabled={page === totalPages}>
          Next
        </button>
      </div>
    </div>
  );
}

const labels = [
  { label: 'ID', key: 'id' },
  { label: 'Name', key: 'name' },
  { label: 'Age', key: 'age' },
  { label: 'Occupation', key: 'occupation' },
];
