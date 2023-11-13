import React from 'react';

import { useStateContext } from '../contexts/ContextProvider';

const Button = ({ icon, bgColor, color, bgHoverColor, size, text, borderRadius, width, onClick, isLogout  }) => {
  const { setIsClicked, initialState } = useStateContext();


  const handleClick = () => {
    // If the button is configured for logout, perform logout action
    if (isLogout) {
      // Your logout logic here, e.g., calling a function passed as a prop


      onClick && onClick();
      // Additional logout logic if needed
    } else {
      // For other buttons, setIsClicked with initialState
      setIsClicked(initialState);
      // Call the onClick function if provided for non-logout buttons
      onClick && onClick();
    }
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      style={{ backgroundColor: bgColor, color, borderRadius }}
      className={` text-${size} p-3 w-${width} hover:drop-shadow-xl hover:bg-${bgHoverColor}`}
    >
      {icon} {text}
    </button>
  );
};

export default Button;