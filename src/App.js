import React, { useState, useEffect, useRef } from "react";
import "./App.css";

function App() {
  const TIME_OF_GAME = 15

  const [typedText, setTypedText] = useState("");
  const [wordCount, setWordCount] = useState(0);
  const [isTimeRunning, setIsTimeRunning] = useState(false)
  const [timeRemaining, setTimeRemaining] = useState(TIME_OF_GAME);
  const textareaRef = useRef(null)

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

  function handleGameStart() {
    textareaRef.current.disabled = false
    textareaRef.current.focus()
    setIsTimeRunning(true)
    setTypedText("")
    // setWordCount(0) - only use if you want to reset the high score
    setTimeRemaining(TIME_OF_GAME)
  }

  function handleGameEnd() {
    countWords(typedText)
    setIsTimeRunning(false)
  }

  useEffect(() => {
    if(timeRemaining > 0 && isTimeRunning) {
      setTimeout(() => {
        setTimeRemaining(prevtime => prevtime - 1)
      }, 1000)
    } else if(timeRemaining === 0) {
      handleGameEnd()
    }
  }, [isTimeRunning, timeRemaining])

  return (
    <div>
      <h1>Speed Typing Game</h1>
      <textarea ref={textareaRef} disabled={!isTimeRunning} onChange={handleChange} value={typedText} />
      <h4>Time reminaing: {timeRemaining}</h4>
      <button disabled={isTimeRunning} onClick={handleGameStart}>Start</button>
      <h1>Word count: {wordCount}</h1>
    </div>
  );
}

export default App;
