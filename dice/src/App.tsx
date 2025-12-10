import { useEffect, useState } from 'react';
import './App.css';

function App() {
  const [showDice, setShowDice] = useState<boolean>(false);
  const [diceCount, setDiceCount] = useState<number>(0);
  const [diceArray, setDiceArray] = useState<number[]>([]);
  const [totalValue, setTotalValue] = useState<number>(0);

  function reducer(prev: number, current: number): number {
    return prev + current;
  }
  function randomRoll() {
    return Math.floor(Math.random() * 6) + 1;
  }

  function onRollDice() {
    if (diceCount > 0) {
      setShowDice(true);

      setDiceArray(
        Array(diceCount)
          .fill(0)
          .map(() => randomRoll())
      );
    }
  }

  useEffect(() => {
    const setTotal = () => {
      setTotalValue(diceArray.reduce(reducer));
    };
    if (diceArray.length > 0) setTotal();
  }, [diceArray]);

  return (
    <div>
      <h3>Input number of dice:</h3>
      <input type="number" value={diceCount} onChange={(e) => setDiceCount(parseInt(e.currentTarget.value))} />
      <button onClick={onRollDice}>Roll dice</button>
      {showDice && (
        <div className="dice">
          {diceArray.map((die, index) => (
            <div className="die" key={index}>
              <p>{die}</p>
            </div>
          ))}
          <h3>Total value:</h3>
          <p>{totalValue}</p>
        </div>
      )}
    </div>
  );
}

export default App;
