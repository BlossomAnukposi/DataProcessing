const http = require("http");
const app = require("./app");
require("./com.nhlstenden/config/database");
require("dotenv").config({ path: "./com.nhlstenden/.env" });

class Server {
    constructor() {
        this.port = process.env.PORT || 3000;
        this.app = app;
        this.server = http.createServer(this.app);

        this.initializeServer();
        this.initializeErrorHandling();
    }

    initializeServer() {
        this.app.set("port", this.port);

        this.server.listen(this.port, () => {
            console.log(`Server is running on port ${this.port}`);
            console.log(`API docs available at http://localhost:${this.port}/api-docs`);
        });
    }

    initializeErrorHandling() {
        this.server.on("error", (error) => this.handleServerError(error));
    }

    handleServerError(error) {
        if (error.syscall !== "listen") {
            throw error;
        }

        switch (error.code) {
            case "EACCES":
                console.error(`Port ${this.port} requires elevated privileges`);
                process.exit(1);
                break;
            case "EADDRINUSE":
                console.error(`Port ${this.port} is already in use`);
                process.exit(1);
                break;
            default:
                throw error;
        }
    }
}

module.exports = new Server();
