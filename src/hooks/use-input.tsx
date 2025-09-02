import { useState } from "react";

export function useInput(initial = "") {
  const [value, setValue] = useState(initial);
  return {
    value,
    bind: {
      value,
      onChange: (e: React.ChangeEvent<HTMLInputElement>) =>
        setValue(e.target.value),
    },
    reset: () => setValue(""),
  };
}
