import { useEffect, useState } from "react";

export function useCharacterCount(value: string, maxCharacter: number) {
  const [characterCount, setCharacterCount] = useState(0);
  const [isExceeded, setIsExceeded] = useState(false);

  useEffect(() => {
    const count = value.length;
    setCharacterCount(count);
    setIsExceeded(count > maxCharacter);
  }, [value, maxCharacter]);

  return { characterCount, isExceeded };
}
