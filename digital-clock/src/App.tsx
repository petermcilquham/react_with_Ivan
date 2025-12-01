import { useEffect, useRef, useState } from 'react';
import './App.css';

function App() {
  const [date, setDate] = useState<Date>(new Date());
  const [timer, setTimer] = useState<number>(0);
  const [timerIsStarted, setTimerIsStarted] = useState<boolean>(false);
  const tick = useRef<number>(0);

  /// Clock useEffect, run on page render
  useEffect(() => {
    const interval = setInterval(() => {
      setDate(new Date());
    }, 1);
    return () => clearInterval(interval);
  }, []);

  /// Timer useEffect, run when timerIsStarted is changed
  useEffect(() => {
    if (timerIsStarted) {
      tick.current = setInterval(() => {
        setTimer((prev) => prev + 1);
      }, 1000);
    } else {
      clearInterval(tick.current);
    }
  }, [timerIsStarted]);

  const startTimer = () => {
    setTimerIsStarted(true);
  };

  const pauseTimer = () => {
    setTimerIsStarted(false);
  };

  const resetTimer = () => {
    setTimer(0);
    setTimerIsStarted(false);
  };

  return (
    <>
      <h3>Clock:</h3>
      <div className="row">
        <p>Hours: {date?.getHours()}</p>
        <p>Minutes: {date?.getMinutes()}</p>
        <p>Seconds: {date?.getSeconds()}</p>
        <p>Milliseconds: {date?.getMilliseconds()}</p>
      </div>
      <h3>Timer:</h3>
      <div className="row">
        <p>Time: {timer}</p>
        <button onClick={startTimer}>Start</button>
        <button onClick={pauseTimer}>Stop</button>
        <button onClick={resetTimer}>Reset</button>
      </div>
    </>
  );
}

export default App;
