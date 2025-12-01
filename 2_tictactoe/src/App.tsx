import { useState } from 'react';
// import Square from './components/Square';

export interface ISquares {
  square: boolean | null;
}
function App() {
  // const [square, setSquare] = useState<ISquares[]>([{ square: null }, { square: null }, { square: null }, { square: null }]);
  const [square2, setSquare2] = useState<(boolean | null)[]>(Array(8).fill(null));
  // const [isXPlayerTurn, setIsXPlayerTurn] = useState<boolean>(true);

  // function takeTurn(index: number) {
  //   setSquare(
  //     square.map((s, i) => {
  //       if (i === index) {
  //         if (isXPlayerTurn) {
  //           s.square = true;
  //         } else {
  //           s.square = false;
  //         }
  //       }
  //       return s;
  //     })
  //   );
  //   setIsXPlayerTurn((prevIsXPlayerTurn) => !prevIsXPlayerTurn);
  // }
  function updateSquare(index: number) {
    setSquare2(
      square2.map((s, i) => {
        if (i === index) {
          s = !s;
        }
        return s;
      })
    );
  }
  return (
    <div className='container'>
      <div className='boxContainer'>
        {/* {square.map((s, index) => (
          <Square s={s} takeTurn={() => takeTurn(index)} />
        ))} */}

        <div className='box' onClick={() => updateSquare(0)}>
          {square2[0] === true ? 'X' : square2[0] === false ? 'O' : null}
        </div>
        <div className='box'>{square2[1]}</div>
        <div className='box'>{square2[2]}</div>
        <div className='box'>{square2[3]}</div>
        <div className='box'>{square2[4]}</div>
        <div className='box'>{square2[5]}</div>
        <div className='box'>{square2[6]}</div>
        <div className='box'>{square2[7]}</div>
        <div className='box'>{square2[8]}</div>
      </div>
    </div>
  );
}

export default App;
