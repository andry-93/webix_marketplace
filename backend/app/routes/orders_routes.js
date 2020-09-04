const {ObjectID} = require('mongodb');

module.exports = function(app, db) {
	app.get('/orders', (req, res) => {
		db.collection('orders').find()
			.toArray((err, items) => {
				if (err) {
					console.log(err);
					res.status(500).send({status: "error"});
				} else {
					res.status(200).send(items);
				}
			});
	});

	app.post('/orders', (req, res) => {
		const order = {
			id: req.body.id,
			name: req.body.name,
			email: req.body.email,
			phone: req.body.phone,
			delivery: req.body.delivery,
			address: req.body.address,
			payment: req.body.payment,
			status: req.body.status,
			reason: req.body.reason,
			userId: req.body.userId,
			amount: req.body.amount,
			productId: req.body.productId,
			date: req.body.date
		};

		db.collection('orders').insertOne(order, (err, result) => {
			if (err) { 
				console.log(err);
				res.status(500).send({status: "error"});
			} else {
				res.status(200).send(result.ops[0]);
			}
		});
	});

	app.put ('/orders/:id', (req, res) => {
		const id = req.params.id;
		const details = { id };
		const order = {
			id: req.body.id,
			name: req.body.name,
			email: req.body.email,
			phone: req.body.phone,
			delivery: req.body.delivery,
			address: req.body.address,
			payment: req.body.payment,
			status: req.body.status,
			reason: req.body.reason,
			userId: req.body.userId,
			amount: req.body.amount,
			productId: req.body.productId,
			date: req.body.date
		};
		db.collection('orders').updateOne(details, {$set: order}, (err, result) => {
			if (err) {
				console.log(err);
				res.status(500).send({status: "error"});
			} else {
				res.status(200).send(order);
			} 
		});
	});

	app.delete('/orders/:id', (req, res) => {
		const id = req.params.id;
		const details = { 'id': id };
		db.collection('orders').deleteOne(details, (err, item) => {
			if (err) {
				console.log(err);
				res.status(500).send({status: "error"});
			} else {
				res.status(200).send(item);
			} 
		});
	});
}