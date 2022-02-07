import React, { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [typedText, setTypedText] = useState("");
  const [wordCount, setWordCount] = useState(0);
  const [isTimeRunning, setIsTimeRunning] = useState(false)
  const [timeRemaining, setTimeRemaining] = useState(15);

  function handleChange(event) {
    const { value } = event.target;
    setTypedText(value);
  }

  function countWords(str) {
    // regex to rreduce multiple spaces to a single space.
    str = str.replace(/[ ]{2,}/gi, " ");
    // trim() will take away any spaces at start or end of strinf
    str = str.trim();
    // split returns array with space between which we then .length
    setWordCount(str.split(" ").length);
    if (str === "") {
      setWordCount(0);
    }
  }

  function handleStartTimer() {
    setIsTimeRunning(!isTimeRunning)
  }

  useEffect(() => {
    if(timeRemaining > 0 && isTimeRunning) {
      setTimeout(() => {
        setTimeRemaining(prevtime => prevtime - 1)
      }, 1000)
    } else if(timeRemaining === 0) {
      countWords(typedText)
      setIsTimeRunning(!isTimeRunning)
    }
  }, [isTimeRunning, timeRemaining])

  return (
    <div>
      <h1>Speed Typing Game</h1>
      <textarea onChange={handleChange} value={typedText} />
      <h4>Time reminaing: {timeRemaining}</h4>
      <button onClick={() => handleStartTimer()}>Start</button>
      <h1>Word count: {wordCount}</h1>
    </div>
  );
}

export default App;
