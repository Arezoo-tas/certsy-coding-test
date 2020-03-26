const { mapDirections, DIRECTION } = require("./directionHelper");

describe("Direction helper", () => {
  it("should map the directions to their name", () => {
    expect(mapDirections(DIRECTION.NORTH)).toEqual("NORTH");
    expect(mapDirections(DIRECTION.WEST)).toEqual("WEST");
    expect(mapDirections(DIRECTION.SOUTH)).toEqual("SOUTH");
    expect(mapDirections(DIRECTION.EAST)).toEqual("EAST");
    expect(mapDirections(5)).toBeUndefined();
  });
});
