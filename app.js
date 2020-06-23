const express = require('express')
const app = express()
const host = '0.0.0.0';

app.get('/', (req, res) => {
	app.use(express.static('public'))
	res.redirect('game.html')
	
});

app.listen(process.env.PORT || 3000, host, 
	() => console.log("Server is running..."));

