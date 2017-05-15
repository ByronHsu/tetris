const express = require('express');
const server = express();
server.use(express.static(`${__dirname}/dist`));
var port = process.env.PORT || 3000;
server.listen(port, function() {
    console.log("App is running on port " + port);
});