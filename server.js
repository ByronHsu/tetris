const express = require('express');
const server = express();
const api = require('./api');
server.use(express.static(`${__dirname}/dist`));
var port = process.env.PORT || 3001;
server.listen(port, function() {
    console.log("App is running on port " + port);
});
server.use('/api', api);