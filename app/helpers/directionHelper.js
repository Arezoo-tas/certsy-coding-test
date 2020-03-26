const DIRECTION = {
  NORTH: 0,
  EAST: 1,
  SOUTH: 2,
  WEST: 3
};

const mapDirections = direction => {
  switch (direction) {
    case DIRECTION.NORTH:
      return "NORTH";
    case DIRECTION.EAST:
      return "EAST";
    case DIRECTION.SOUTH:
      return "SOUTH";
    case DIRECTION.WEST:
      return "WEST";
    default:
      break;
  }
};
module.exports = {
  DIRECTION,
  mapDirections
};
