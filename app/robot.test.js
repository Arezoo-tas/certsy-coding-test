const Robot = require("./robot");
const PlaygroundMap = require("./playgroundMap");
const writeMessage = jest.fn();
const IOmanager = {
  writeMessage
};
const getReport = (x, y, dir) =>
  `I am standing at point ${x} ${y} facing ${dir}`;

jest.mock("./helpers/messageHelper", () => ({
  getErrorMessage: x => x
}));

let _playground;
let _robot;

beforeEach(() => {
  _playground = new PlaygroundMap(5, 5);
  _robot = new Robot(_playground, IOmanager);
  writeMessage.mockReset();
});

describe("Robot", () => {
  it("throw an error if robot not placed", () => {
    _robot.move();
    expect(writeMessage).toHaveBeenCalledWith("robotNotPlaced");

    _robot.right();
    expect(writeMessage).toHaveBeenCalledWith("robotNotPlaced");

    _robot.left();
    expect(writeMessage).toHaveBeenCalledWith("robotNotPlaced");

    _robot.report();
    expect(writeMessage).toHaveBeenCalledWith("robotNotPlaced");
  });

  it("throw an error parameters not provided in place", () => {
    _robot.place();
    expect(writeMessage).toHaveBeenCalledWith("noDirection");

    _robot.place(undefined, undefined, "EAST");
    expect(writeMessage).toHaveBeenCalledWith("noPosition");

    _robot.place("a", "b", "EAST");
    expect(writeMessage).toHaveBeenCalledWith("noIntegerPosition");

    _robot.place(1, 2, "ASD");
    expect(writeMessage).toHaveBeenCalledWith("invalidInitialDirection");

    _robot.place(6, 7, "EAST");
    expect(writeMessage).toHaveBeenCalledWith("invalidInitialPosition");
  });

  it("should place the robot in right position", () => {
    _robot.place(2, 2, "EAST");
    _robot.report();
    expect(writeMessage).toHaveBeenCalledWith(getReport(2, 2, "EAST"));
  });

  it("should move EAST", () => {
    _robot.place(2, 2, "EAST");
    _robot.move();
    _robot.report();
    expect(writeMessage).toHaveBeenCalledWith(getReport(3, 2, "EAST"));
  });

  it("should move WEST", () => {
    _robot.place(2, 2, "WEST");
    _robot.move();
    _robot.report();
    expect(writeMessage).toHaveBeenCalledWith(getReport(1, 2, "WEST"));
  });

  it("should move NORTH", () => {
    _robot.place(2, 2, "NORTH");
    _robot.move();
    _robot.report();
    expect(writeMessage).toHaveBeenCalledWith(getReport(2, 3, "NORTH"));
  });

  it("should move SOUTH", () => {
    _robot.place(2, 2, "SOUTH");
    _robot.move();
    _robot.report();
    expect(writeMessage).toHaveBeenCalledWith(getReport(2, 1, "SOUTH"));
  });

  it("should turn right", () => {
    _robot.place(2, 2, "SOUTH");
    _robot.right();
    _robot.report();
    expect(writeMessage).toHaveBeenCalledWith(getReport(2, 2, "WEST"));

    _robot.right();
    _robot.report();
    expect(writeMessage).toHaveBeenCalledWith(getReport(2, 2, "NORTH"));

    _robot.right();
    _robot.report();
    expect(writeMessage).toHaveBeenCalledWith(getReport(2, 2, "EAST"));

    _robot.right();
    _robot.report();
    expect(writeMessage).toHaveBeenCalledWith(getReport(2, 2, "SOUTH"));
  });

  it("should turn left", () => {
    _robot.place(2, 2, "SOUTH");
    _robot.left();
    _robot.report();
    expect(writeMessage).toHaveBeenCalledWith(getReport(2, 2, "EAST"));

    _robot.left();
    _robot.report();
    expect(writeMessage).toHaveBeenCalledWith(getReport(2, 2, "NORTH"));

    _robot.left();
    _robot.report();
    expect(writeMessage).toHaveBeenCalledWith(getReport(2, 2, "WEST"));

    _robot.left();
    _robot.report();
    expect(writeMessage).toHaveBeenCalledWith(getReport(2, 2, "SOUTH"));
  });

  it("should remain in position", () => {
    _robot.place(2, 2, "SOUTH");
    _robot.left();
    _robot.right();
    _robot.report();
    expect(writeMessage).toHaveBeenCalledWith(getReport(2, 2, "SOUTH"));
  });

  it("should not move any further", () => {
    _robot.place(2, 2, "SOUTH");
    _robot.move();
    _robot.move();
    _robot.move();
    expect(writeMessage).toHaveBeenCalledWith("invalidPosition");
  });
});
