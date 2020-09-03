const {ObjectID} = require('mongodb');

module.exports = function(app, db) {
	app.get('/bag', (req, res) => {
		db.collection('bag').find()
			.toArray((err, items) => {
				if (err) {
					console.log(err);
					res.status(500).send({status: "error"});
				} else {
					res.status(200).send(items);
				}
			});
	});

	app.post('/bag', (req, res) => {
		const bag = {
			id: req.body.id,
			productId: req.body.productId,
			img: req.body.img,
			title: req.body.title,
			model: req.body.model,
			category: req.body.category,
			price: req.body.price,
			rating: req.body.rating,
			amount: req.body.amount,
			userId: req.body.userId,
			sum: req.body.sum
		};

		db.collection('bag').insertOne(bag, (err, result) => {
			if (err) { 
				console.log(err);
				res.status(500).send({status: "error"});
			} else {
				res.status(200).send(result.ops[0]);
			}
		});
	});

	app.delete('/bag/:id', (req, res) => {
		const id = req.params.id;
		const details = { 'id': id };
		db.collection('bag').deleteOne(details, (err, item) => {
			if (err) {
				console.log(err);
				res.status(500).send({status: "error"});
			} else {
				res.status(200).send(item);
			} 
		});
	});
}
