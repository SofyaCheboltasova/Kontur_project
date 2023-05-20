import React from 'react';

type ModeType = 'view' | 'edit';

export const useMode = (initMode: ModeType = 'view') => {
  const [mode, setMode] = React.useState<ModeType>(initMode);

  const toggleMode = () => {
    setMode(mode === 'edit' ? 'view' : 'edit');
  };

  return {
    mode,
    setMode,
    toggleMode,
  };
};
