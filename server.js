const express = require('express');
const app = express();

const server = app.listen(7000, () => {
    console.log(`Express running → PORT ${server.address().port}`);
});

app.use("/public", express.static(__dirname + "/public"));

app.get('/', function(req, res){
    res.sendFile(__dirname + '/index.html');
});
