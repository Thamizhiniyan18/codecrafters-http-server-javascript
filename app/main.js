const net = require("net");

// You can use print statements as follows for debugging, they'll be visible when running tests.
console.log("Logs from your program will appear here!");

// Uncomment this to pass the first stage
const server = net.createServer((socket) => {
  socket.on("close", () => {
    socket.end();
    server.close();
  });

  socket.on("data", (data) => {
    request = data.toString().split("\r\n");

    path = request[0].split(' ')[1]

    if (path == '/') {
        socket.write("HTTP/1.1 200 OK\r\n\r\n");
    }
    else if (path.startsWith('/echo/')) {
        str = path.split('/echo/')[1]

        socket.write(`HTTP/1.1 200 OK\r\nContent-Type: text/plain\r\nContent-Length: ${str.length}\r\n\r\n${str}`)
    }
    else {
        socket.write("HTTP/1.1 404 OK\r\n\r\n");
    }
  });
});

server.listen(4221, "localhost");
