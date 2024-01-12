const net = require("net");

/**
 * Search for an available port for development environment.
 */

export function searchAvaiblePort(port, callback) {
  const server = net.createServer();

  server.listen(port, () => {
    server.once("close", () => {
      callback(port);
    });
    server.close();
  });

  server.on("error", (err) => {
    if (err.code === "EADDRINUSE") {
      searchAvaiblePort(port + 1, callback);
    } else {
      callback(null, err);
    }
  });
}
