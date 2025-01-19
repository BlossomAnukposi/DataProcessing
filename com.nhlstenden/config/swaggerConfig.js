const swaggerJsDoc = require("swagger-jsdoc");
const path = require('path');

const swaggerOptions = {
    swaggerDefinition: {
        openapi: "3.0.0",  // Specify the OpenAPI version
        info: {
            title: "Netflix Management API",
            version: "1.0.0",
            description: "API for managing Netflix",
        },
        servers: [
            {
                url: "http://localhost:3000",
            },
        ],
    },
    apis: [path.join(__dirname, '../api/route/*.js')], // Correct path to routes
};

const swaggerSpec = swaggerJsDoc(swaggerOptions);

module.exports = swaggerSpec;
