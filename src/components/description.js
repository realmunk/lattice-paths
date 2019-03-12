import React from "react";

import "./grid.css";

export const Description = ({ currentPath, currentIndex, possiblePaths }) => {
  if (!possiblePaths) {
    return null;
  }

  if (!currentPath) {
    return <p>Possible paths: {possiblePaths}</p>;
  } else {
    return (
      <p>
        Showing {currentIndex} of {possiblePaths}:{" "}
        {!!currentPath && currentPath}
      </p>
    );
  }
};
