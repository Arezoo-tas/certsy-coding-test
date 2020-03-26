"use strict";

class PlaygroundMap {
  constructor(width = 0, length = 0) {
    this._width = width < 0 ? 0 : width;
    this._length = length < 0 ? 0 : length;
  }

  isPositionInside(x, y) {
    return x >= 0 && x < this._width && y >= 0 && y < this._length;
  }

  get dimension() {
    return {
      length: this._length,
      width: this._width
    };
  }
}

module.exports = PlaygroundMap;
