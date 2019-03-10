import React, { Component } from "react";
import "./App.css";

import { findLatticePaths } from "./lattice-paths";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      gridSize: 4
    };
    this.findPaths(4);
  }

  generateGrid = gridSize => {
    return Array(gridSize)
      .fill()
      .map(() => Array(gridSize).fill());
  };

  visualizePath = (finished, STEPS, LAST_SYMBOL = undefined, x = 0, y = 0) => {
    const grid = this.state.grid;
    const SYMBOL = STEPS[0];

    if (!STEPS) {
      return finished();
    }

    grid[y][x] = grid[y][x] ? grid[y][x] + SYMBOL : SYMBOL;

    // move diagonally
    if (grid[y][x].length === 2) {
      x++;
      y++;
    } else if (SYMBOL === "E" && STEPS[1] === "E") {
      // move right
      x++;
    } else if (SYMBOL === "S" && STEPS[1] === "S") {
      // move down
      y++;
    }

    // normalize the steps so they don't go over the grid
    if (x === grid.length) {
      x = grid.length - 1;
    }
    if (y === grid.length) {
      y = grid.length - 1;
    }

    this.setState(
      {
        grid
      },
      () => {
        setTimeout(() => {
          this.visualizePath(finished, STEPS.substring(1), SYMBOL, x, y);
        }, 175);
      }
    );
  };

  visualizePaths = async results => {
    for (let i = 0; i < results.length; i++) {
      await new Promise(resolve => {
        this.clear();
        this.setState({ current: i + 1 });
        this.visualizePath(resolve, results[i]);
      });
    }
  };

  clear = () => {
    const { grid, gridSize } = this.state;

    for (let i = 0; i < gridSize; i++) {
      for (let j = 0; j < gridSize; j++) {
        grid[i][j] = undefined;
      }
    }
    this.setState({
      grid
    });
  };

  findPaths = async gridSize => {
    const grid = this.generateGrid(gridSize);

    const latticePaths = await findLatticePaths(gridSize);
    this.setState({ ...this.state, latticePaths, grid });

    this.visualizePaths(latticePaths);
  };

  onChange = event => {
    let gridSize = event.target.value;
    if (typeof gridSize !== "number") {
      let gridSize = parseInt(gridSize);
    }
    this.setState({
      [event.target.name]: gridSize
    });
  };

  render() {
    let Representation = null;

    if (this.state.grid) {
      Representation = this.state.grid.map((row, index) => {
        return (
          <tr
            key={`row${index}`}
            style={{ height: `${60 / this.state.gridSize}vh` }}
          >
            {row.map((step, subIndex) => {
              return (
                <td
                  key={`column${index}-${subIndex}`}
                  className={`cell ${step}`}
                />
              );
            })}
          </tr>
        );
      });
    }

    return (
      <div className="container">
        {this.state.current && (
          <h1>
            Visualizing route: {this.state.current} /{" "}
            {this.state.latticePaths.length}
          </h1>
        )}
        <table className="table">
          <tbody>{Representation}</tbody>
        </table>
        <div>
          <label>Grid Size: </label>>
          <input
            name="gridSize"
            value={this.state.gridSize}
            onChange={this.onChange}
          />
          <button onClick={this.generatePaths}>Find Paths</button>
        </div>
      </div>
    );
  }
}

export default App;
