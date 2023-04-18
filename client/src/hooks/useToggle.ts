import { useCallback, useMemo, useState } from 'react';

type ToggleState = boolean;
type ToggleHandler = () => void;

type ToggleOn = () => void;
type ToggleOff = () => void;

type ToggleTools = {
  toggleOn: ToggleOn;
  toggleOff: ToggleOff;
};

const useToggle = (initialState?: boolean): [ToggleState, ToggleHandler, ToggleTools] => {
  const [toggle, setToggle] = useState(initialState ?? false);

  const handleToggleClick = useCallback(() => {
    setToggle((prev) => !prev);
  }, []);

  const toggleOn = useCallback(() => {
    setToggle(true);
  }, []);

  const toggleOff = useCallback(() => {
    setToggle(false);
  }, []);

  const tools = useMemo(() => {
    return { toggleOn, toggleOff };
  }, [toggleOff, toggleOn]);

  return [toggle, handleToggleClick, tools];
};

export default useToggle;
