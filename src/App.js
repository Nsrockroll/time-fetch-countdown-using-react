import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [currentTime, setCurrentTime] = useState('');
  const [countdown, setCountdown] = useState(0);
  const [isCounting, setIsCounting] = useState(false);
  const [inputValue, setInputValue] = useState('');

  // Function to fetch current time
  const fetchCurrentTime = () => {
    const now = new Date();
    setCurrentTime(now.toLocaleTimeString());
  };

  // Function to start countdown
  const startCountdown = () => {
    const seconds = parseInt(inputValue);
    if (isNaN(seconds) || seconds <= 0) {
      alert('Please enter a valid positive integer.');
      return;
    }

    setCountdown(seconds);
    setIsCounting(true);
    setInputValue('');

    const countdownInterval = setInterval(() => {
      setCountdown((prevCountdown) => {
        if (prevCountdown <= 1) {
          clearInterval(countdownInterval);
          setIsCounting(false);
          return 0;
        }
        return prevCountdown - 1;
      });
    }, 1000);
  };

  // Effect to update the countdown timer
  useEffect(() => {
    if (isCounting && countdown <= 0) {
      setIsCounting(false);
    }
  }, [countdown, isCounting]);

  return (
    <div className="App">
      <h1>System Time Fetch and Countdown Application</h1>
      <button onClick={fetchCurrentTime}>Fetch Current Time</button>
      <p>Current Time: {currentTime}</p>

      <input
        type="number"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        placeholder="Enter seconds"
        disabled={isCounting}
      />
      <button onClick={startCountdown} disabled={isCounting}>
        Start Countdown
      </button>
      <p>Countdown: {isCounting ? countdown : 'Stopped'}</p>
    </div>
  );
}

export default App;