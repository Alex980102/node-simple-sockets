const express = require('express');
const path = require('path');
require('dotenv').config();

/* App Express */
const app = express();
/* App Express */

/* Node Server IO Socket */
const server = require('http').createServer(app);
module.exports.io = require('socket.io')(server);
require('./sockets/sockets');
/* Node Server IO Socket */


// Public Path
const publicPath = path.resolve(__dirname, 'public');
app.use(express.static(publicPath));


server.listen(parseInt(process.env.PORT), (err) => {
    if (err) throw new Error(err);
    console.log('Servidor corriendo en el puerto', parseInt(process.env.PORT));
});