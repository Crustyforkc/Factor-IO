const express = require('express')
const app = express()
const path = require('path')
const Blueprint = require('factorio-blueprint');
const host = '0.0.0.0';

var http = require('http').createServer(app);
var db = require('./db');



app.get('/', (req, res) => 
{
	app.use(express.static('public'))
	//app.use(express.static('public/images'))
	res.sendFile(path.join(__dirname + '/public/game.html'));
	//const myBlueprint = new Blueprint();
	//myBlueprint.createEntity('transport-belt', { x: 0, y: 0 }, Blueprint.UP);
	//console.log(myBlueprint.encode());
});

const server = app.listen(process.env.PORT || 3000, host, () => console.log("Server is running..."));
const io = require('socket.io')(server);

var maxClient = 5;
var curClient = 0;
io.on('connection', (socket) => 
{
  curClient++;
  console.log("Current Connections: ", curClient, "/", maxClient);
  var sql = "INSERT INTO blueprints (id) VALUES ?";
  var values = [[Math.random() * Math.floor(5000)]];
  db.query(sql, [values], function (err, result)
  {
    if (err) throw err;
  });

  socket.on('test', (msg) =>{
    console.log('Message: ', msg);
  });

  socket.on('disconnect', ()=> 
  {
		console.log('user disconnected');
		curClient--;
	});
});




