const http = require('http');
const app = require('./app');

const port = process.env.PORT || '3000';
app.set('port', port);

const server = http.createServer(app);
server.listen(port);

//"test": "echo \"Error: no test specified\" && exit 1"
//removes from package.json