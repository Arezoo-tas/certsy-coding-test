const input_output = {
  input: process.stdin,
  output: process.stdout
};

const resumeInput = () => {
  input_output.input.resume();
};

const writeMessage = message => {
  input_output.output.write(message + "\n");
};

module.exports = {
  resumeInput,
  writeMessage,
  inputReader: input_output.input
};
