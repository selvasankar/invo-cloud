// server/src/server.ts  (or src/App.ts / src/server.ts depending on your project)
import http from "http";
import app from "./App"; // your express app
import debugLib from "debug";
import 'dotenv/config'

const debug = debugLib("invo-server");

function normalizePort(val: string | undefined): number | string | false {
  if (!val) return 4000; // default numeric port
  const portNum = parseInt(val as string, 10);
  // valid numeric port
  if (!isNaN(portNum) && portNum > 0) return portNum;
  // treat other values as named pipe / path (but allow only safe values)
  // If the value contains invalid characters, return false to prevent attempt to bind.
  const safePattern = /^[A-Za-z0-9_\-./\\]+$/;
  if (typeof val === "string" && safePattern.test(val)) return val;
  return false;
}

const rawPort = process.env.PORT;
const portNormalized = normalizePort(rawPort);
if (portNormalized === false) {
  console.error(`Invalid PORT environment variable: "${rawPort}". Please set PORT to a number (e.g. 4000).`);
  process.exit(1);
}

const server = http.createServer(app);

server.listen(portNormalized, () => {
  console.log(`Server listening on ${portNormalized}`);
});

server.on("error", (err: NodeJS.ErrnoException) => {
  if (err.syscall !== "listen") {
    console.error("Server error:", err);
    process.exit(1);
  }
  const bind = typeof portNormalized === "string" ? `Pipe ${portNormalized}` : `Port ${portNormalized}`;
  switch (err.code) {
    case "EACCES":
      console.error(`${bind} requires elevated privileges or access denied.`);
      process.exit(1);
    case "EADDRINUSE":
      console.error(`${bind} is already in use.`);
      process.exit(1);
    default:
      console.error("Server listen error:", err);
      process.exit(1);
  }
});
