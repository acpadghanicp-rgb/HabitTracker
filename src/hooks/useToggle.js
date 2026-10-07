/**
 * useToggle.js
 * Custom Hook demonstrating state encapsulation as studied in Practical No. 09.
 * Takes an optional initial boolean value and returns the current state and a toggle function.
 */
import { useState, useCallback } from 'react';

export const useToggle = (initialValue = false) => {
  const [value, setValue] = useState(initialValue);

  const toggle = useCallback((forcedValue) => {
    if (typeof forcedValue === 'boolean') {
      setValue(forcedValue);
    } else {
      setValue((prev) => !prev);
    }
  }, []);

  return [value, toggle];
};

export default useToggle;
