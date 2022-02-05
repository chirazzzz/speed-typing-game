import React, { useState } from "react";
import "./App.css";

function App() {
  const [typedText, setTypedText] = useState("");

  function handleChange(event) {
    const {value} = event.target
    setTypedText(value);
  }

  return (
    <div>
      <h1>Speed Typing Game</h1>
      <textarea onChange={handleChange} value={typedText} />
      <h4>Time reminaing: ???</h4>
      <button>Start</button>
      <h1>Word count: ???</h1>
    </div>
  );
}

export default App;
