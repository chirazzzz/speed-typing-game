import React, { useState, useEffect, useRef } from "react";
import "./App.css";
import useGameLogic from "./hooks/useGameLogic";

function App() {

  const {
    handleChange, 
    handleGameStart, 
    typedText,
    wordCount,
    isTimeRunning,
    timeRemaining,
    textareaRef
  } = useGameLogic()


  return (
    <div>
      <h1>Speed Typing Game</h1>
      <textarea 
        ref={textareaRef} 
        disabled={!isTimeRunning} 
        onChange={handleChange} 
        value={typedText} 
      />
      <h4>Time reminaing: {timeRemaining}</h4>
      <button 
        disabled={isTimeRunning} 
        onClick={handleGameStart}
      >Start</button>
      <h1>Word count: {wordCount}</h1>
    </div>
  );
}

export default App;
