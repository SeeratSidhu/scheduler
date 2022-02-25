import { useState } from 'react';

const useVisualMode = (initial) => {
  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]);

  const transition = (newMode, replace = false) => {
    if (replace) {
      history.pop();
    }
    
    setMode(newMode); 
    setHistory([...history, newMode]);
  };

  const back = () => {
      if (history.length > 1) {
        history.pop();
        const length = history.length - 1;
        setMode(history[length]);
      }
  };

  return {
    mode,
    transition,
    back
  }
}

export default useVisualMode;