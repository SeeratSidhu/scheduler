import { useState } from 'react';

const useVisualMode = (initial) => {
  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]);


  const transition = (newMode, replace = false) => {
    if (replace) {
      const newHistory = history;
      newHistory.pop();
      setHistory(newHistory);
    }
    
    setMode(newMode); 
    setHistory([...history, newMode]);
  };

  const back = () => {
      if (history.length > 1) {
        const newHistory = [...history];
        newHistory.pop();
        setHistory(newHistory);
        setMode(newHistory[newHistory.length - 1]);
      }
  };

  return {
    mode,
    transition,
    back,
    history
  }
}

export default useVisualMode;