import React from "react";

import "./grid.css";

export const Description = ({ currentPath, possiblePaths }) => {
  if (!possiblePaths) {
    return null;
  }

  if (currentPath === null) {
    return <p>Possible paths: {possiblePaths}</p>;
  } else {
    return (
      <p>
        Showing {currentPath} of {possiblePaths}
      </p>
    );
  }
};
