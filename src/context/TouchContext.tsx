import React, { useState } from "react";

export const TouchContext = React.createContext(null);

export const TouchProvider = ({ children }) => {
  const touchStateHook = useState(false);
  return (
    <TouchContext.Provider value={touchStateHook}>
      {children}
    </TouchContext.Provider>
  );
};
