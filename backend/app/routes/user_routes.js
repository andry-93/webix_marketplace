const ObjectID = require('mongodb').ObjectID;

module.exports = function(app, db) {
	app.get('/users', (req, res) => {
		db.collection('users').find()
			.toArray((err, items) => {
				if (err) {
					res.send({'error':'An error has occurred'});
				} else {
					res.send(items);
				}
			});
	});

	app.get('/users/:id', (req, res) => {
		const id = req.params.id;
		const details = { '_id': new ObjectID(id) };
		db.collection('users').findOne(details, (err, item) => {
			if (err) {
				res.send({'error':'An error has occurred'});
			} else {
				res.send(item);
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
				res.send({ 'error': 'An error has occurred' }); 
			} else {
				res.send(result.ops[0]);
			}
		});
	});

	app.delete('/users/:id', (req, res) => {
		const id = req.params.id;
		const details = { '_id': new ObjectID(id) };
		db.collection('users').remove(details, (err, item) => {
			if (err) {
				res.send({'error':'An error has occurred'});
			} else {
				res.send('User ' + id + ' deleted!');
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
		db.collection('users').update(details, user, (err, result) => {
			if (err) {
				res.send({'error':'An error has occurred'});
			} else {
				res.send(user);
			} 
		});
	});
};
