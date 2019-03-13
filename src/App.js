import React, { Component } from "react";
import { connect } from "react-redux";
import "./App.css";

import { Header } from "./components/header";
import { Description } from "./components/description";
import { Grid } from "./components/grid";

import { setup, runVisualization } from "./redux/actions";

class App extends Component {
  state = {
    size: 2
  };

  componentDidMount() {
    this.props.setup(this.state.size);
  }

  render() {
    const {
      grid,
      currentPath,
      currentIndex,
      possiblePaths,
      runVisualization,
      runningVisualization,
      loading
    } = this.props;
    return (
      <div className="container">
        <div className="flex-center">
          <Header />
          <Grid grid={grid} />
          <Description
            currentIndex={currentIndex}
            currentPath={currentPath}
            possiblePaths={possiblePaths}
          />
          {
            <button
              className="button"
              onClick={runVisualization}
              disabled={loading || runningVisualization}
            >
              {runningVisualization && "Visualizing paths"}
              {!runningVisualization && "Visualize"}
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
    runningVisualization: state.runningVisualization,
    grid: state.grid,
    currentIndex: state.currentIndex,
    currentPath: state.currentPath,
    possiblePaths: state.possiblePaths,
    paths: state.paths
  };
};

const mapDispatchToProps = dispatch => {
  return {
    setup: size => dispatch(setup(size)),
    runVisualization: () => dispatch(runVisualization())
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
