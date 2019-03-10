import React from "react";

import "./grid.css";

export const Counter = ({ current, nrOfPaths }) => {
  if (!current || !nrOfPaths) {
    return null;
  }
  return (
    <p>
      path {current} of {nrOfPaths.length}
    </p>
  );
};
