const ObjectID = require('mongodb').ObjectID;

module.exports = function(app, db) {
	app.get('/users', (req, res) => {
		db.collection('users').find()
			.toArray((err, items) => {
				if (err) {
					console.log(err);
					res.status(500).send({status: "error"});
				} else {
					res.status(200).send(items);
				}
			});
	});

	app.get('/users/:id', (req, res) => {
		const id = req.params.id;
		const details = { '_id': new ObjectID(id) };
		db.collection('users').findOne(details, (err, item) => {
			if (err) {
				console.log(err);
				res.status(500).send({status: "error"});
			} else {
				res.status(200).send(item);
			}
		});
	});

	app.post('/users', (req, res) => {
		const user = {
			name: req.body.name,
			email: req.body.email,
			phone: req.body.phone,
			pass: req.body.pass,
			address: req.body.address,
			admin: req.body.admin
		};

		db.collection('users').insertOne(user, (err, result) => {
			if (err) { 
				console.log(err);
				res.status(500).send({status: "error"});
			} else {
				res.status(200).send(result.ops[0]);
			}
		});
	});

	app.delete('/users/:id', (req, res) => {
		const id = req.params.id;
		const details = { '_id': new ObjectID(id) };
		db.collection('users').deleteOne(details, (err, item) => {
			if (err) {
				console.log(err);
				res.status(500).send({status: "error"});
			} else {
				res.status(200).send(item);
			} 
		});
	});

	app.put ('/users/:id', (req, res) => {
		const id = req.params.id;
		const details = { '_id': new ObjectID(id) };
		const user = {
			name: req.body.name,
			email: req.body.email,
			phone: req.body.phone,
			pass: req.body.pass,
			address: req.body.address,
			admin: req.body.admin
		};
		db.collection('users').updateOne(details, {$set: user}, (err, result) => {
			if (err) {
				console.log(err);
				res.status(500).send({status: "error"});
			} else {
				res.status(200).send(user);
			} 
		});
	});
};
