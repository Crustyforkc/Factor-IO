const express = require('express')
const app = express()
const path = require('path')
const socketio = require('socket.io')
const Blueprint = require('factorio-blueprint');
const host = '0.0.0.0';

var http = require('http').createServer(app);



app.get('/', (req, res) => {
	app.use(express.static('public'))
	//app.use(express.static('public/images'))
	res.sendFile(path.join(__dirname + '/public/game.html'));
	//const myBlueprint = new Blueprint();
	//myBlueprint.createEntity('transport-belt', { x: 0, y: 0 }, Blueprint.UP);
	//console.log(myBlueprint.encode());
});

const server = app.listen(process.env.PORT || 3000, host, () => console.log("Server is running..."));


const io = socketio(server)

var maxClient = 5;
var curClient = 0;
io.on('connection', (socket) => {
	curClient++;
	console.log("Current Connections: ", curClient, "/", maxClient);

	socket.on('disconnect', ()=> {
		console.log('user disconnected');
		curClient--;
	});
  });



  var mysql = require('mysql');

var con = mysql.createConnection({
  host: "192.168.86.30",
  user: "ralph",
  password: "tacomantoast",
  database: "Factor-IO"
});

con.connect(function(err) {
	var ii = 0;
  if (err) throw err;
  console.log("Connected!");
  for(var i =0; i < 10000; i++)
  {
  var sql = "INSERT INTO new_table (Test) VALUES ?";
  var values = [[ii++]];
  con.query(sql, [values], function (err, result) {
    if (err) throw err;
	console.log("1 record inserted");
	
  });
}
});
