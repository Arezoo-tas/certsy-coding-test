"use strict";
const { DIRECTION, mapDirections } = require("./helpers/directionHelper");
const { getErrorMessage } = require("./helpers/messageHelper");
const isNil = require("lodash/fp/isNil");
const isNaN = require("lodash/fp/isNaN");
const toNumber = require("lodash/fp/toNumber");
const upperCase = require("lodash/fp/upperCase");

class Robot {
  constructor(playgroundMap, IOmanager) {
    this._playgroundMap = playgroundMap;
    this._isRobotPlaced = false;
    this._IOmanager = IOmanager;
    this._currentPosition = {
      x: undefined,
      y: undefined,
      facingDirection: undefined
    };
  }

  move() {
    if (!this._isRobotPlaced) {
      return this._IOmanager.writeMessage(getErrorMessage("robotNotPlaced"));
    }
    let newX = this._currentPosition.x;
    let newY = this._currentPosition.y;

    switch (this._currentPosition.facingDirection) {
      case DIRECTION.NORTH: {
        ++newY;
        break;
      }
      case DIRECTION.EAST: {
        ++newX;
        break;
      }
      case DIRECTION.SOUTH: {
        --newY;
        break;
      }
      case DIRECTION.WEST: {
        --newX;
        break;
      }
      default: {
        return this._IOmanager.writeMessage(
          getErrorMessage("invalidDirection")
        );
      }
    }

    if (!this._playgroundMap.isPositionInside(newX, newY)) {
      return this._IOmanager.writeMessage(getErrorMessage("invalidPosition"));
    }

    this._currentPosition.x = newX;
    this._currentPosition.y = newY;
  }

  place(x, y, direction) {
    if (isNil(direction)) {
      return this._IOmanager.writeMessage(getErrorMessage("noDirection"));
    }

    if (isNil(x) || isNil(y)) {
      return this._IOmanager.writeMessage(getErrorMessage("noPosition"));
    }
    const _x = toNumber(x);
    const _y = toNumber(y);

    if (isNaN(_x) || isNaN(_y)) {
      return this._IOmanager.writeMessage(getErrorMessage("noIntegerPosition"));
    }

    if (isNil(DIRECTION[upperCase(direction)])) {
      return this._IOmanager.writeMessage(
        getErrorMessage("invalidInitialDirection")
      );
    }
    if (!this._playgroundMap.isPositionInside(_x, _y)) {
      return this._IOmanager.writeMessage(
        getErrorMessage("invalidInitialPosition")
      );
    }

    this._currentPosition = {
      x: _x,
      y: _y,
      facingDirection: DIRECTION[upperCase(direction)]
    };

    this._isRobotPlaced = true;
  }

  right() {
    if (!this._isRobotPlaced) {
      return this._IOmanager.writeMessage(getErrorMessage("robotNotPlaced"));
    }
    const newDirection = this._currentPosition.facingDirection + 1;
    this._currentPosition.facingDirection =
      newDirection === 4 ? 0 : newDirection;
  }

  left() {
    if (!this._isRobotPlaced) {
      return this._IOmanager.writeMessage(getErrorMessage("robotNotPlaced"));
    }
    const newDirection = this._currentPosition.facingDirection - 1;
    this._currentPosition.facingDirection =
      newDirection === -1 ? 3 : newDirection;
  }

  report() {
    if (!this._isRobotPlaced) {
      return this._IOmanager.writeMessage(getErrorMessage("robotNotPlaced"));
    }
    return this._IOmanager.writeMessage(
      `I am standing at point ${this._currentPosition.x} ${
        this._currentPosition.y
      } facing ${mapDirections(this._currentPosition.facingDirection)}`
    );
  }
}

module.exports = Robot;
