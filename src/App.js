import React, { Component } from "react";
import "./App.css";

import test from "./model";

class App extends Component {
  constructor(props) {
    super(props);

    const x = 12;
    const y = 12;

    const grid = Array(x)
      .fill()
      .map(() => Array(y).fill());

    this.state = {
      grid,
      x,
      y
    };
    this.findPaths(x, y);
  }

  visualizePath = (path, x = 0, y = 0) => {
    const myGrid = this.state.grid;
    if (!path) {
      return;
    }
    console.log(myGrid, y, x, path[0], path);
    myGrid[y][x] = path[0];

    if (path[0] === "E") {
      x++;
    } else {
      y++;
    }

    this.setState(
      {
        grid: myGrid
      },
      () => {
        setTimeout(() => {
          this.visualizePath(path.substr(1, path.length), x, y);
          console.log(path[0], x, y);
        }, 250);
      }
    );
    console.log(myGrid);
  };

  findPaths = async () => {
    const result = await test(this.state.x, this.state.y);
    this.visualizePath(result[13371]);
  };

  render() {
    const Representation = this.state.grid.map((row, index) => {
      return (
        <tr key={`row${index}`} style={{ height: `${60 / this.state.x}vh` }}>
          {row.map((item, subIndex) => {
            return <td key={`column${index}-${subIndex}`} className={item} />;
          })}
        </tr>
      );
    });
    return (
      <table className="table">
        <tbody>{Representation}</tbody>
      </table>
    );
  }
}

export default App;

// Ideen er enkel: Vi representerer alle radene i matrisen med en tabell.
// Vi går videre og setter opp en
