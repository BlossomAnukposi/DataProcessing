const http = require("http");
const app = require("./app");
require("./com.nhlstenden/config/database");

const port = process.env.PORT || "3000";
app.set("port", port);

const server = http.createServer(app);
server.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

//"test": "echo \"Error: no test specified\" && exit 1"
//removes from package.json
