const express = require('express')
const app = express()
const path = require('path')
const host = '0.0.0.0';


app.get('/', (req, res) => {
	app.use(express.static('public'))
	res.sendFile(path.join(__dirname + '/public/images/Background.png'));
	res.sendFile(path.join(__dirname + '/public/game.html'));
	
});

app.listen(process.env.PORT || 3000, host, 
	() => console.log("Server is running..."));

