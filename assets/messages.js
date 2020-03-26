"use strict";

const errors = {
  noDirection: "Please specify direction (NORTH, EAST, SOUTH, WEST)",
  noPosition: "Please specify position",
  noIntegerPosition: "x and y should be integer",
  invalidInitialPosition: "Specified position is outside of the playground",
  invalidPosition:
    "New position is outside of the playground, I cannot go any further",
  invalidInitialDirection:
    "Direction should be one of (NORTH, EAST, SOUTH, WEST)",
  robotNotPlaced:
    "Please place robot first by using PLACE command e.g. PLACE 2 4 EAST",
  invalidCommand:
    "Sorry, this command is not valid. Valid commands are PLACE, MOVE, RIGHT, LEFT and REPORT",
  fileNotExist: "It seems your file doesn't exist",
  invalidDirection:
    "Direction is not valid, it should be one of (NORTH, EAST, SOUTH, WEST)",
  defaultError: "Oops, something went wrong"
};

const messages = {
  welcomeMessage:
    "Hello, to start please place your robot on the playground using PLACE command e.g. PLACE 2 4 EAST",
  readingFromFile: "Reading the commands from file",
  goodbye: "Thanks for playing, see you soon."
};

module.exports = { errors, messages };
