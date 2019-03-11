import React, { Component } from "react";
import { connect } from "react-redux";
import "./App.css";

import Logo from "./logo.svg";

import { Grid } from "./components/grid";
import { Counter } from "./components/counter";

import {
  clearGrid,
  calculatePaths,
  generateGrid,
  updateGrid
} from "./redux/actions";

const ANIMATION_TIME = 125;

class App extends Component {
  componentDidMount() {
    const size = 6;
    this.props.generateGrid(size);
    this.props.calculatePaths(size);
  }

  visualizePath = (finished, STEPS, x = 0, y = 0) => {
    const SYMBOL = STEPS[0];
    const { grid } = this.props;

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

    // this will force an update due to shallowEquals
    this.props.updateGrid(x, y);

    setTimeout(() => {
      this.visualizePath(finished, STEPS.substring(1), x, y);
    }, ANIMATION_TIME);
  };

  visualizePaths = async () => {
    const { paths } = this.props;

    for (let i = 0; i < paths.length; i++) {
      await new Promise(resolve => {
        this.props.clearGrid();
        this.visualizePath(resolve, paths[i]);
      });
    }
  };

  render() {
    return (
      <div className="container">
        <div className="flex-center">
          <img src={Logo} alt="Logo" className="logo" />
          <h3>Visualisering med React og Redux</h3>

          {<Grid grid={this.props.grid} />}
          {
            <Counter
              current={this.props.current}
              nrOfPaths={this.props.nrOfPaths}
            />
          }
          {
            <button className="visualization" onClick={this.visualizePaths}>
              VISUALIZE
            </button>
          }
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    loading: state.loading,
    grid: state.grid,
    current: state.current,
    paths: state.paths,
    nrOfPaths: state.paths.length
  };
};

const mapDispatchToProps = dispatch => {
  return {
    clearGrid: () => dispatch(clearGrid()),
    generateGrid: size => dispatch(generateGrid(size)),
    calculatePaths: size => dispatch(calculatePaths(size)),
    updateGrid: (x, y) => dispatch(updateGrid(x, y))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
