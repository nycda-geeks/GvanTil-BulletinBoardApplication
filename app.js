//////////////////////////////////////////////////
/// BULLETIN BOARD APPLICATION
//////////////////////////////////////////////////

//requering express and bodyparser
var express = require ('express')
var bodyParser = require('body-parser')

var app = express()
app.use(express.static('./resources/'));
app.use(bodyParser.urlencoded({ extended: true }));

// requering postgreSQL and creating a connection string
var pg = require ('pg')
var connectionString = "postgres://pgadmin:pwdaccess@localhost/bulletinboard"


// View engine = PUG
app.set('view engine', 'pug');
app.set('views', './views'); 


app.get ('/', function (req, res){
	console.log('received a get request on /')
	res.render('index')
});

app.post ('/submitbulletin', function (req, res){
	console.log('received a post request')
	var userInput = {text: req.body.title, message: req.body.message}
	pg.connect(connectionString, function (err, client, done){
		if (err){
			if (client){
				done(client);
				console.log ('Couldn\'t connect to database' + err)
			}
			return;
		}
		client.query ('insert into messages (title, body) values ($1, $2)', [userInput.text, userInput.message], function (err){
			if (err){
				done (client)
				console.log ('Couldn\'t write message to database: ' + err)
				return
			} else{
				console.log ('a message has been added to the bulletinboard')
				done();
			}
		pg.end();
		});
	});
	res.render ('succes')
});

app.get ('/board', function (req, res){
	console.log('received a get request on /board')
	res.render('board')
})


// server set up
var server = app.listen(3000, function () { 
	console.log('My Bulletin Board Application is listening on port: ' + server.address().port);
});