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
  } else if(key === 'w' || key === 'W') {
    connection.write('Move: up');
  } else if(key === 'a' || key === 'A') {
    connection.write('Move: left');
  } else if(key === 's' || key === 'S') {
    connection.write('Move: down');
  } else if(key === 'd' || key === 'D') {
    connection.write('Move: right');
  } else if(key === '1'){
    //If we press 1, that means we will send message
    sendMessage = true;
    key = "";
  } else if(key === '0') {
    //If we pressed 0 it will mean that message ends
    if (sendMessage) {
      console.log("Send message");
      connection.write(message);
      message = "Say: ";
    }
    sendMessage = false;
  }
  if (sendMessage) {
    message += key;
    console.log(message);
  }
};

module.exports = {
  setupInput
};