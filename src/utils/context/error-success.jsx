// Toggle Voiler Popup

import { createContext } from "react";
import { useState } from "react";

export const ErrorSuccessContext = createContext();

export const ErrorSuccessProvider = ({ children }) => {
  // Show/Hide Popup
  const [error, setError] = useState();
  const [success, setSuccess] = useState();

  return (
    <ErrorSuccessContext.Provider
      value={{ error, setError, success, setSuccess }}
    >
      {children}
    </ErrorSuccessContext.Provider>
  );
};
