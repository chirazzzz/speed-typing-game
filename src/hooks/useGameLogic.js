import {useState, useEffect, useRef} from 'react'

function useGameLogic() {
  const TIME_OF_GAME = 10

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
    // regex to reduce multiple spaces to a single space.
    str = str.replace(/[ ]{2,}/gi, " ");
    // trim() will take away any spaces at start or end of string
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
  // eslint-disable-next-line    
  }, [isTimeRunning, timeRemaining])

  return {
    handleChange, 
    handleGameStart, 
    typedText,
    wordCount,
    isTimeRunning,
    timeRemaining,
    textareaRef
  }
}

export default useGameLogic