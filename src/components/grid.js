import React from "react";
import "./grid.css";

export const Grid = ({ grid }) => {
  let Representation = null;
  if (!grid || !grid.length) {
    return null;
  }

  // todo: Implement a grid representation in JSX

  // 1. you can use <tr> to represent a row
  // 2. you can use <td> to represent a column
  // 3. you can use a className .E or .S to represent a move EAST or SOUTH in the column.
  Representation = grid.map((row, index) => {
    // hint: Start here
    return "";
  });

  return (
    //hint: the table is here for a reason
    <table className="grid">
      <tbody>{Representation}</tbody>
    </table>
  );
};
