import { useState } from 'react';
import './App.css';

interface ISquares {
  id: number;
  value: string;
}
function App() {
  const [squares, setSquares] = useState<ISquares[]>([
    { id: 0, value: '' },
    { id: 1, value: '' },
    { id: 2, value: '' },
    { id: 3, value: '' },
    { id: 4, value: '' },
    { id: 5, value: '' },
    { id: 6, value: '' },
    { id: 7, value: '' },
    { id: 8, value: '' },
  ]);

  const [isXPlayerTurn, setIsXPlayerTurn] = useState(true);
  const [infoText, setInfoText] = useState('It is X player turn');

  function handlePlayerTurn(id: number) {
    checkBox(id);
    setIsXPlayerTurn(!isXPlayerTurn);
    if (!isXPlayerTurn) {
      setInfoText('It is X player turn');
    } else {
      setInfoText('It is O player turn');
    }
    checkIfGameWon();
    if (squares.every((squares) => squares.value != '')) {
      setInfoText('Draw');
    }
  }

  function checkIfGameWon() {
    if (squares[0].value === 'X' && squares[1].value === 'X' && squares[2].value === 'X') {
      setInfoText('Game over. X player won');
    }
    if (squares[3].value === 'X' && squares[4].value === 'X' && squares[5].value === 'X') {
      setInfoText('Game over. X player won');
    }
    if (squares[6].value === 'X' && squares[7].value === 'X' && squares[8].value === 'X') {
      setInfoText('Game over. X player won');
    }
    if (squares[0].value === 'X' && squares[3].value === 'X' && squares[6].value === 'X') {
      setInfoText('Game over. X player won');
    }
    if (squares[1].value === 'X' && squares[4].value === 'X' && squares[7].value === 'X') {
      setInfoText('Game over. X player won');
    }
    if (squares[3].value === 'X' && squares[5].value === 'X' && squares[8].value === 'X') {
      setInfoText('Game over. X player won');
    }
    if (squares[0].value === 'X' && squares[5].value === 'X' && squares[8].value === 'X') {
      setInfoText('Game over. X player won');
    }
    if (squares[3].value === 'X' && squares[5].value === 'X' && squares[6].value === 'X') {
      setInfoText('Game over. X player won');
    }

    if (squares[0].value === 'O' && squares[1].value === 'O' && squares[2].value === 'O') {
      setInfoText('Game over. O player won');
    }
    if (squares[3].value === 'O' && squares[4].value === 'O' && squares[5].value === 'O') {
      setInfoText('Game over. O player won');
    }
    if (squares[6].value === 'O' && squares[7].value === 'O' && squares[8].value === 'O') {
      setInfoText('Game over. O player won');
    }
    if (squares[0].value === 'O' && squares[3].value === 'O' && squares[6].value === 'O') {
      setInfoText('Game over. O player won');
    }
    if (squares[1].value === 'O' && squares[4].value === 'O' && squares[7].value === 'O') {
      setInfoText('Game over. O player won');
    }
    if (squares[3].value === 'O' && squares[5].value === 'O' && squares[8].value === 'O') {
      setInfoText('Game over. O player won');
    }
    if (squares[0].value === 'O' && squares[5].value === 'O' && squares[8].value === 'O') {
      setInfoText('Game over. O player won');
    }
    if (squares[3].value === 'O' && squares[5].value === 'O' && squares[6].value === 'O') {
      setInfoText('Game over. O player won');
    }
  }

  function checkBox(id: number) {
    const newSquares = squares.map((square) => {
      if (square.id === id) {
        if (isXPlayerTurn) {
          square.value = 'X';
        } else {
          square.value = 'O';
        }
      }
      return square;
    });
    setSquares(newSquares);
  }

  return (
    <>
      <div className='container'>
        <h1>{infoText}</h1>
        <div className='boxContainer'>
          {squares.map((square, index) => {
            return (
              <div className='box' key={index} onClick={() => handlePlayerTurn(square.id)}>
                <p className=''>{square.value}</p>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}

export default App;
