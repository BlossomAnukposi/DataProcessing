const swaggerJsDoc = require("swagger-jsdoc");
const path = require("path");

class SwaggerConfig {
    constructor() {
        this.swaggerOptions = {
            swaggerDefinition: {
                openapi: "3.0.0",
                info: {
                    title: "Netflix Management API",
                    version: "1.0.0",
                    description: `API for managing movie applications. 
            Made with Node.js and Express. 
            Created by Blossom Anukposi, Mikhail Josan, Stefan Cazacu, and Cristian Trifan`,
                },
                servers: [
                    {
                        url: "http://localhost:3000",
                    },
                ],
            },
            apis: [path.join(__dirname, "../api/route/*.js")],
        };

        // Initialize the swagger specification
        this.swaggerSpec = swaggerJsDoc(this.swaggerOptions);
    }

    // Getter for swaggerSpec
    getSwaggerSpec() {
        return this.swaggerSpec;
    }
}

module.exports = new SwaggerConfig().getSwaggerSpec();
