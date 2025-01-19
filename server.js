const http = require("http");
const app = require("./app");
require("./com.nhlstenden/config/database");
require("dotenv").config({ path: "./com.nhlstenden/.env" });

const port = process.env.PORT || 3000;
app.set("port", port);

const server = http.createServer(app);

server.on("error", (error) => {
  if (error.syscall !== "listen") {
    throw error;
  }

  switch (error.code) {
    case "EACCES":
      console.error(`Port ${port} requires elevated privileges`);
      process.exit(1);
      break;
    case "EADDRINUSE":
      console.error(`Port ${port} is already in use`);
      process.exit(1);
      break;
    default:
      throw error;
  }
});

server.listen(port, () => {
  console.log(`Server is running on port ${port}`);
  console.log("API docs available at http://localhost:3000/api-docs");
});
