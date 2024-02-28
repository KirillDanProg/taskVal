import { useState } from "react";

export const useDebounce = (callback, delay = 300) => {
  const [timerId, setTimerId] = useState();

  const debouncedCallback = (...args) => {
    if (timerId) {
      clearTimeout(timerId);
    }

    setTimerId(
      setTimeout(() => {
        callback(...args);
      }, delay)
    );
  };

  return debouncedCallback;
};
