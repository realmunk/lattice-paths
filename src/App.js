import React, { Component } from "react";
import "./App.css";

import Logo from "./logo.svg";

import { findLatticePaths } from "./lattice-paths";

import { Grid } from "./components/grid";
import { Counter } from "./components/counter";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      gridSize: 12
    };
    this.findPaths(this.state.gridSize);
  }

  visualizePath = (finished, STEPS, x = 0, y = 0) => {
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

    // as steps be on both edges of a coordinate, we will overflow unless we make sure they dont.
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
          this.visualizePath(finished, STEPS.substring(1), x, y);
        }, 175);
      }
    );
  };

  visualizePaths = async results => {
    for (let i = 0; i < results.length; i++) {
      await new Promise(resolve => {
        this.clear(); // lift into redux state
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
  };

  generateGrid = gridSize => {
    return Array(gridSize)
      .fill()
      .map(() => Array(gridSize).fill());
  };

  findPaths = async gridSize => {
    const latticePaths = await findLatticePaths(gridSize);
    this.setState({ ...this.state, latticePaths, grid });

    this.visualizePaths(latticePaths);
  };

  render() {
    return (
      <div className="container">
        <div className="flex-center">
          <img src={Logo} className="logo" />
          <h3>Visualisering med React og Redux</h3>

          {<Grid grid={this.state.grid} />}
          {
            <Counter
              current={this.state.current}
              nrOfPaths={this.state.latticePaths}
            />
          }
        </div>
      </div>
    );
  }
}

export default App;
