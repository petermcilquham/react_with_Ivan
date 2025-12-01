import React from 'react';
import type { ISquares } from '../App';

export default function Box(props: { square: ISquares; handlePlayerTurn: React.MouseEventHandler<HTMLDivElement> }) {
  const { square, handlePlayerTurn } = props;
  return (
    <div className='box' onClick={() => handlePlayerTurn(square.id)}>
      <p className=''>{square.value}</p>
    </div>
  );
}
