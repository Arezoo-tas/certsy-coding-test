const { errors, messages } = require("../../assets/messages");

const getErrorMessage = code => errors[code] || "";
const getMessage = code => messages[code] || "";

module.exports = { getErrorMessage, getMessage };
