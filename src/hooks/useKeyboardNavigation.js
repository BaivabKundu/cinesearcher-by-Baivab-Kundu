import { useEffect } from "react";

const useKeyboardNavigation = (key, ref) => {
  useEffect(() => {
    const handleKeyPress = event => {
      if (event.key === key && event.target.tagName !== "INPUT") {
        event.preventDefault();
        ref.current?.focus();
      }
    };

    document.addEventListener("keydown", handleKeyPress);

    return () => document.removeEventListener("keydown", handleKeyPress);
  }, [key, ref]);
};

export default useKeyboardNavigation;
