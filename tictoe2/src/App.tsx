import { useState } from 'react';
import './App.css';

type SquaresArray = [
  {
    id: number;
    value: string | null;
  },
  {
    id: number;
    value: string | null;
  },
  {
    id: number;
    value: string | null;
  }
];
function App() {
  const [isXPlayerTurn, setIsXPlayerTurn] = useState(true);
  const [infoMsg, setInfoMsg] = useState('');
  const [squaresArray, setSquaresArray] = useState<SquaresArray[]>([
    [
      { id: 0, value: null },
      { id: 1, value: null },
      { id: 2, value: null },
    ],
    [
      { id: 3, value: null },
      { id: 4, value: null },
      { id: 5, value: null },
    ],
    [
      { id: 6, value: null },
      { id: 7, value: null },
      { id: 8, value: null },
    ],
  ]);

  function checkGameState() {
    squaresArray.forEach((row) => {
      let xCounter = 0;
      let oCounter = 0;
      row.forEach((el) => {
        if (el.value === 'X') {
          xCounter++;
          oCounter = 0;
        } else if (el.value === 'O') {
          oCounter++;
          xCounter = 0;
        }
      });
      if (xCounter === 3) {
        setInfoMsg('X player wins');
        return;
      }
      if (oCounter === 3) {
        setInfoMsg('O player wins');
        return;
      }
    });
  }

  function handleClick(id: number) {
    setSquaresArray(
      squaresArray.map((row) => {
        row.map((square) => {
          if (square.id === id) {
            if (isXPlayerTurn) {
              square.value = 'X';
            } else {
              square.value = 'O';
            }
          }
          return square;
        });
        return row;
      })
    );

    setIsXPlayerTurn(!isXPlayerTurn);
    checkGameState();
  }

  return (
    <>
      {infoMsg && <p>{infoMsg}</p>}
      <div className="content">
        {squaresArray.map((row) =>
          row.map(({ id, value }) => (
            <div key={id} className="square" onClick={() => handleClick(id)}>
              {value}
            </div>
          ))
        )}
      </div>
    </>
  );
}

export default App;
