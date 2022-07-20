// Dependencies
import React from "react";
import { useContext } from "react";

// Provider
import { PopupContext } from "../../utils/context/popup";

// Render Page
function ClosePopup() {
  // Context
  const { togglePopup } = useContext(PopupContext);

  return (
    <div
      onClick={() => {
        togglePopup();
      }}
      className="popup--close"
    >
      <i class="fa-solid fa-xmark"></i>
    </div>
  );
}

export default ClosePopup;
