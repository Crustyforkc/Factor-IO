const express = require('express')
const app = express()
const path = require('path')
const Blueprint = require('factorio-blueprint');
const host = '0.0.0.0';

var http = require('http').createServer(app);
var io = require('socket.io')(http);



app.get('/', (req, res) => {
	app.use(express.static('public'))
	//app.use(express.static('public/images'))
	res.sendFile(path.join(__dirname + '/public/game.html'));
	//const myBlueprint = new Blueprint();
	//myBlueprint.createEntity('transport-belt', { x: 0, y: 0 }, Blueprint.UP);
	//console.log(myBlueprint.encode());
});

app.listen(process.env.PORT || 3000, host, () => console.log("Server is running..."));


io.on('connection', (socket) => {
	console.log('a user connected');
  });

  http.listen(3000, () => {
	console.log('listening on *:3000');
  });