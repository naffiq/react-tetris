import React, { Component } from 'react';

import Figure from './utils/Figure';

import logo from './logo.svg';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);

    this.fieldHeight = 12;
    this.fieldWidth = 6;
    this.gameSpeed = 500;

    const field = [];
    for (let i = 0; i < this.fieldHeight; i++) {
      const row = [];
      for (let j = 0; j < this.fieldWidth; j++) {
        row.push(0);
      }
      field.push(row);
    }

    this.state = {
      field,
      currentFigure: new Figure(this.fieldWidth, this.fieldHeight, field)
    };
  }

  componentDidMount() {
    setInterval(this.gravity, this.gameSpeed);
  }

  rotate = () => {
    const {currentFigure} = this.state;
  }

  gravity = () => {
    let {field, currentFigure} = this.state;

    field = currentFigure.fall();
    if (currentFigure.isGrounded()) {
      currentFigure = new Figure(this.fieldWidth, this.fieldHeight, field);
    }
    this.setState({field, currentFigure});
  }

  moveLeft = () => {
    const {currentFigure} = this.state;

    const field = currentFigure.moveLeft();

    this.setState({field, currentFigure});
  }
  moveRight = () => {
    const {currentFigure} = this.state;

    const field = currentFigure.moveRight();

    this.setState({field, currentFigure});
  }

  render() {
    const {field} = this.state;

    const renderField = () => {
      return field.map((fieldRow, row) => {
        const mapRow = fieldRow.map((fieldCell, col) => {
          return <input type="checkbox" checked={fieldCell !== 0} disabled={fieldCell === 1} key={`${row}-${col}`}/>
        });

        return (
          <div key={`row-${row}`}>{mapRow}</div>
        );
      });
    };

    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to ReactTetris</h2>
        </div>
        <div className="App-intro">
          { renderField() }

          <button onClick={this.moveLeft}>&lt;</button>
          <button onClick={this.moveRight}>&gt;</button>
        </div>
      </div>
    );
  }
}

export default App;
