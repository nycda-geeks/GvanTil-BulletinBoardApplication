//////////////////////////////////////////////////
/// BULLETIN BOARD APPLICATION
//////////////////////////////////////////////////

//requering express and bodyparser
var express = require ('express')
var bodyParser = require('body-parser')

var app = express()
app.use(express.static('./resources/'));
app.use(bodyParser.urlencoded({ extended: true }));

// requering postgreSQL and creating a connection string to database 'bulletinboard'
var pg = require ('pg')
var connectionString = 'postgres://' + process.env.POSTGRES_USER + ':' + process.env.POSTGRES_PASSWORD + '@localhost/bulletinboard'

// View engine = PUG
app.set('view engine', 'pug');
app.set('views', './views'); 

// GET request that listens on '/' and renders index.pug
app.get ('/', function (req, res){
	console.log('received a get request on /')
	res.render('index')
});

// POST request that listens on '/submitbulletin'
app.post ('/submitbulletin', function (req, res){
	console.log('received a post request')
	// Storing user input from form in a variable
	var userInput = {text: req.body.title, message: req.body.message}
	// connecting to postgreSQL database
	pg.connect(connectionString, function (err, client, done){
		// error in case connection failed
		if (err){
			if (client){
				done(client);
				console.log ('Couldn\'t connect to database' + err)
			}
			return;
		}
		// userinput
		client.query ('insert into messages (title, body) values ($1, $2)', [userInput.text, userInput.message], function (err){
			// error in case something went wrong with user input
			if (err){
				done (client)
				console.log ('Couldn\'t write message to database: ' + err)
				return
			} else{
				console.log ('a message has been added to the bulletinboard')
				done();
			}
		// closing connection
		pg.end();
		});
	});
	// rendering succes.pug
	res.render ('succes')
});

// GET request that listens on /board
app.get ('/board', function (req, res){
	console.log('received a get request on /board')
	// connecting to postgreSQL database
	pg.connect(connectionString, function (err, client, done){
		//showing all messages
		client.query('select * from messages', function (err, result){
			// storing all messages in a variable
			var allMessages = result.rows
			if (err){
				console.log("couldn\'t select everything from messages " + error)
			} else {
				done();
				// closing connection
				pg.end();
				// rendering 'board'
				res.render ('board',{
					toutLesMessages : allMessages
				});
			}
		})
	})
})

// server set up
var server = app.listen(3000, function () { 
	console.log('My Bulletin Board Application is listening on port: ' + server.address().port);
});