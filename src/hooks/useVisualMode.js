import { useState } from 'react';
const useVisualMode = (initial) => {
  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]);

  const transition = (newMode) => {
    return setMode(newMode) && setHistory([...history, newMode])
  };
  const back = () => {};
  return {
    mode,
    transition,
    back
  }
}

export default useVisualMode;