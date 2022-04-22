const { MOVE_UP_KEY, MOVE_LEFT_KEY, MOVE_DOWN_KEY, MOVE_RIGHT_KEY } = require("./constants");

// Stores the active TCP connection object.
let connection;
let sendMessage = false;
let message = "Say: ";

// setup interface to handle user input from stdin
const setupInput = (conn) => {
  connection = conn;
  const stdin = process.stdin;
  stdin.setRawMode(true);
  stdin.setEncoding("utf8");
  stdin.resume();
  stdin.on("data", handleUserInput);
  return stdin;
};

const handleUserInput = function(key) {
  if (key === '\u0003') {
    process.exit();
  } else if (!sendMessage && (key === 'w' || key === 'W')) {
    connection.write(MOVE_UP_KEY);
  } else if (!sendMessage && (key === 'a' || key === 'A')) {
    connection.write(MOVE_LEFT_KEY);
  } else if (!sendMessage && (key === 's' || key === 'S')) {
    connection.write(MOVE_DOWN_KEY);
  } else if (!sendMessage && (key === 'd' || key === 'D')) {
    connection.write(MOVE_RIGHT_KEY);
  } else if (key === '1') {
    //If we press 1, that means we will send message.
    sendMessage = true;
    key = "";
  } else if (key === '0') {
    //If we pressed 0 it will mean that message ends.
    messageEnds();
  }
  //If sendMessage is true, then any key we hit on keyboard will be part of message.
  if (sendMessage) {
    message += key;
  }
};

//We will send the message string and will make sendMessage to false.
const messageEnds = () => {
  if (sendMessage) {
    connection.write(message);
    message = "Say: ";
  }
  sendMessage = false;
};

module.exports = {
  setupInput
};