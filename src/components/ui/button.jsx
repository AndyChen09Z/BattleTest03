import React from "react";

export const Button = ({ children, className = "", ...props }) => (
  <button
    {...props}
    className={`bg-purple-500 hover:bg-purple-600 text-white font-semibold py-2 px-4 rounded ${className}`}
  >
    {children}
  </button>
);
