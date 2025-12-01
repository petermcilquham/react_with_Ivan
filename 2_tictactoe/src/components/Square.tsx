import React from 'react';
import type { ISquares } from '../App';

export default function Square(props: { s: ISquares; takeTurn: React.MouseEventHandler<HTMLDivElement> }) {
  const { s, takeTurn } = props;
  return (
    <div className='box' onClick={takeTurn}>
      <p>{s.square === false ? 'O' : s.square === true ? 'X' : null}</p>
    </div>
  );
}
