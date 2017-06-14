export default class Figure {
  constructor(fieldWidth, fieldHeight, field) {
    // this.type = Math.random();
    this.fieldWidth = fieldWidth;
    this.fieldHeight = fieldHeight;
    this.field = field;

    this.coordinates = {
      x: fieldWidth / 2,
      y: -1
    };

  }

  fall() {
    console.log(this.coordinates);
    console.log(this.isGrounded());
    if (!this.isGrounded()) {
      this.coordinates.y += 1;
    }

    return this.getField();
  }

  getField() {
    return this.field.map((fieldRow, row) => {
      return fieldRow.map((cell, col) => {

        if (cell === 1) {
          return 1;
        }

        if (this.isFigureCell(col, row)) {
          return this.isGrounded() ? 1 : 2;
        }

        return 0;
      })
    });
  }

  isFigureCell(col, row) {
    return this.getFigureCellCoordinates().filter((coords) => {
      return coords.x == col && coords.y == row
    }).length > 0;
  }

  isGrounded() {
    return this.coordinates.y === (this.field.length - 1) || this.hasCollisions();
  }

  getFigureCellCoordinates() {
    return [
      {x: this.coordinates.x, y: this.coordinates.y}
    ];
  }

  moveLeft() {
    if (!this.hasHorizontalCollisions(-1)) {
      this.coordinates.x -= 1;
    }

    return this.getField();
  }

  moveRight() {
    if (!this.hasHorizontalCollisions(1)) {
      this.coordinates.x += 1;
    }

    return this.getField();
  }

  hasCollisions() {
    return this.getFigureCellCoordinates().filter((coords) => {
      return this.field[coords.y + 1][coords.x] == 1;
    }).length > 0;
  }

  hasHorizontalCollisions(vector) {
    return (this.coordinates.x == 0 && vector < 0) || this.getFigureCellCoordinates().filter((coords) => {
      if (coords.y < 0) {
        return false;
      }

      return (coords.x === this.fieldWidth - 1 && vector > 0) || this.field[coords.y][coords.x + vector] == 1;
    }).length > 0;
  }
}
