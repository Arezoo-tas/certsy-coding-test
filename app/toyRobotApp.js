"use strict";

const robot = require("./robot");
const playgroundMap = require("./playgroundMap");
const IOManager = require("./IOManager");
const { getErrorMessage, getMessage } = require("./helpers/messageHelper");

const fs = require("fs");
const readline = require("readline");
const path = require("path");

const args = process.argv.slice(2);

const executeCommandsFromFile = filePath => {
  const _path = path.resolve(__dirname, filePath);
  if (!fs.existsSync(_path)) {
    IOManager.writeMessage(getErrorMessage("fileNotExist"));
  }

  const readInterface = readline.createInterface({
    input: fs.createReadStream(_path),
    output: process.stdout,
    console: false
  });

  readInterface.on("line", function(line) {
    executeCommand(line);
  });
};

const executeCommand = command => {
  try {
    const userInput = command.toString().trim();
    if (userInput.match(/^\s*place\s+\w+(\s*|\s+)\w+(\s*|\s+)\w+\s*$/i)) {
      const [_, x, y, dir] = userInput.split(/\s+/);
      this._robot.place(x, y, dir);
    } else if (userInput.match(/^move\s*$/i)) {
      this._robot.move();
    } else if (userInput.match(/^left\s*$/i)) {
      this._robot.left();
    } else if (userInput.match(/^right\s*$/i)) {
      this._robot.right();
    } else if (userInput.match(/^report\s*$/i)) {
      this._robot.report();
    } else if (userInput.match(/(q|exit)/i)) {
      IOManager.writeMessage(getMessage("goodbye"));
      process.exit();
    } else {
      IOManager.writeMessage(getErrorMessage("invalidCommand"));
    }
  } catch (error) {
    IOManager.writeMessage(error);
    IOManager.writeMessage(getErrorMessage("defaultError"));
  }
};

IOManager.inputReader.on("data", executeCommand);

module.exports = {
  start: () => {
    const _playgroundMap = new playgroundMap(5, 5);
    this._robot = new robot(_playgroundMap, IOManager);
    if (args && args.length) {
      IOManager.writeMessage(getMessage("readingFromFile"));
      executeCommandsFromFile(args[0]);
    } else {
      IOManager.writeMessage(getMessage("welcomeMessage"));
      IOManager.resumeInput();
    }
  }
};
