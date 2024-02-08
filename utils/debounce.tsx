const debounce = (
  fn: (...args: any[]) => void,
  delay: number,
  timer: NodeJS.Timeout | null,
  setTimer: React.Dispatch<React.SetStateAction<NodeJS.Timeout | null>>
): ((...args: any[]) => void) => {
  const debouncedFn = (...args: any[]): void => {
    if (timer) {
      clearTimeout(timer);
      setTimer(null);
      return;
    }

    setTimer(
      setTimeout(() => {
        fn(...args);
        setTimer(null);
      }, delay)
    );
  };

  return debouncedFn;
};

export default debounce;
