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

  generateGrid = gridSize => {
    return Array(gridSize)
      .fill()
      .map(() => Array(gridSize).fill());
  };

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

    // as the steps can go both on the inside and outside of a grid item, make sure they dont.
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
