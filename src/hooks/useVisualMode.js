import { useState } from 'react';

const useVisualMode = (initial, replace) => {
  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]);

  const transition = (newMode) => {
    setMode(newMode); 
    if (!replace) {
      setHistory([...history, newMode]);
    } else {
      setHistory(history.splice(-1,1,newMode));
    }

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