const express        = require('express');
var cors = require('cors')
const MongoClient    = require('mongodb').MongoClient;
const bodyParser     = require('body-parser');
const dbConfig             = require('./config/db');
const app            = express();

app.use(cors());

const port = 3000;
app.use(bodyParser.urlencoded({ extended: true }));

MongoClient.connect(dbConfig.url,
	{
		useNewUrlParser: true,
		useUnifiedTopology: true
	},
	(err, database) => {
		if (err) return console.log(err)
		const db = database.db(dbConfig.db);
		require('./app/routes')(app, db);
		app.listen(port, () => {
			console.log('We are live on ' + port);
		});               
	}
)
