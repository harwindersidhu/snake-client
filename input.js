// Stores the active TCP connection object.
let connection;

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
  } else {
    //Do nothing;
  } 
};

module.exports = {
  setupInput
};