import React, { Fragment } from "react";

export const Description = ({ possiblePaths }) => {
  return (
    <Fragment>
      <p>How many such routes are possible in a 12x12 grid?</p>
      <h3>{possiblePaths}</h3>
    </Fragment>
  );
};
