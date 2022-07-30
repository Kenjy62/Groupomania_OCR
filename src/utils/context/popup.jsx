// Toggle Voiler Popup

import { createContext } from "react";
import { useState } from "react";

export const PopupContext = createContext();

export const PopupProvider = ({ children }) => {
  // Show/Hide Popup
  const [isOpen, setIsOpen] = useState(false);
  const [option, setOption] = useState();
  const [data, setData] = useState();
  const togglePopup = (action, data, me) => {
    setOption(action);
    setIsOpen(isOpen === false ? true : false);

    if (data) {
      setData(data);
    }
  };

  // Update
  // When post is create / update / delete
  const [update, setUpdate] = useState();
  const callUpdate = (data) => {
    setUpdate(data);
  };

  return (
    <PopupContext.Provider
      value={{ isOpen, togglePopup, update, callUpdate, option, data }}
    >
      {children}
    </PopupContext.Provider>
  );
};
