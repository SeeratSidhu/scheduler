import { useState } from "react";

const useVisualMode = (initial) => {
  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]);

  //transition to a new mode after an action
  const transition = (newMode, replace = false) => {
    setMode(newMode);

    if (replace) {
      return setHistory((prev) => [...prev.slice(0, prev.length - 1), newMode]);
    }

    setHistory((prev) => [...prev, newMode]);
  };

  //go back to previous mode on cancel
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
    history,
  };
};

export default useVisualMode;
