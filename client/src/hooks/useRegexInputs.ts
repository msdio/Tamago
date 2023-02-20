import type { ChangeEvent } from 'react';
import { useState } from 'react';

const useRegexInputs = (initialState: Record<string, RegExp>) => {
  const [inputs, setInputs] = useState<Record<string, string>>(
    Object.fromEntries(Object.keys(initialState).map((key) => [key, ''])),
  );
  const [valids, setValids] = useState<Record<string, boolean>>(
    Object.fromEntries(Object.keys(initialState).map((key) => [key, false])),
  );

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const regex = initialState[name as string];
    const isValid = regex.test(value);
    setInputs({ ...inputs, [name]: value });
    setValids({ ...valids, [name]: isValid });
  };

  return [inputs, valids, handleChange] as [Record<string, string>, Record<string, boolean>, () => void];
};

export default useRegexInputs;
