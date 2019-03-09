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

  visualizePath = (path, x = 0, y = 0, initial = true) => {
    if (!path) {
      console.log("Finished");
      return;
    }

    const myGrid = this.state.grid;
    myGrid[x][y] = path[0];

    if (!initial) {
      if (myGrid[x][y] === "E") {
        x++;
      } else {
        y++;
      }
    }

    this.setState(
      {
        grid: myGrid
      },
      () => {
        setTimeout(() => {
          this.visualizePath(path.substring(1), x, y, false);
        }, 150);
      }
    );
    console.log(myGrid);
  };

  findPaths = async () => {
    const result = await test(this.state.x, this.state.y);
    this.visualizePath(result[3]);
  };

  render() {
    const Representation = this.state.grid.map((row, index) => {
      return (
        <tr key={`row${index}`} style={{ height: `${60 / this.state.x}vh` }}>
          {row.map((item, subIndex) => {
            return (
              <td
                key={`column${index}-${subIndex}`}
                className={`cell ${item}`}
              />
            );
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
