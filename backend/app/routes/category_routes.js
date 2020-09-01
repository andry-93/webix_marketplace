const ObjectID = require('mongodb').ObjectID;

module.exports = function(app, db) {
	app.get('/category', (req, res) => {
		db.collection('category').find()
			.toArray((err, items) => {
				if (err) {
					console.log(err);
					res.status(500).send({status: "error"});
				} else {
					res.status(200).send(items);
				}
			});
	});
}
