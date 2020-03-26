const PlaygroundMap = require("./playgroundMap");

describe("Playground class", () => {
  it("should set the dimension properly", () => {
    const _playground = new PlaygroundMap(5, 5);
    expect(_playground.dimension).toEqual({
      length: 5,
      width: 5
    });
  });

  it("should set the dimension to 0,0 if negative numbers provided", () => {
    const _playground = new PlaygroundMap(-5, -5);
    expect(_playground.dimension).toEqual({
      length: 0,
      width: 0
    });
  });

  it("should set the dimension to 0,0 if dimension not provided", () => {
    const _playground = new PlaygroundMap();
    expect(_playground.dimension).toEqual({
      length: 0,
      width: 0
    });
  });

  it("should return true if position is inside", () => {
    const _playground = new PlaygroundMap(6, 5);
    expect(_playground.isPositionInside(0, 0)).toEqual(true);
    expect(_playground.isPositionInside(7, 0)).toEqual(false);
    expect(_playground.isPositionInside(-1, 0)).toEqual(false);
    expect(_playground.isPositionInside(6, 5)).toEqual(false);
    expect(_playground.isPositionInside(2, 3)).toEqual(true);
    expect(_playground.isPositionInside(5, 6)).toEqual(false);
  });
});
