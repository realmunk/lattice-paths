import React from "react";
import "./grid.css";
export const Grid = ({ grid }) => {
  let Representation = null;
  if (!grid || !grid.length) {
    return null;
  }

  Representation = grid.map((row, index) => {
    return (
      <tr key={`row${index}`}>
        {row.map((step, subIndex) => {
          return (
            <td key={`column${index}-${subIndex}`} className={`cell ${step}`} />
          );
        })}
      </tr>
    );
  });

  return (
    <table className="grid">
      <tbody>{Representation}</tbody>
    </table>
  );
};
