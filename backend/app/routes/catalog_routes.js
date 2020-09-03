const ObjectID = require('mongodb').ObjectID;

module.exports = function(app, db) {
	app.get('/catalog', (req, res) => {
		db.collection('catalog').find()
			.toArray((err, items) => {
				if (err) {
					console.log(err);
					res.status(500).send({status: "error"});
				} else {
					res.status(200).send(items);
				}
			});
	});

	app.post('/catalog', (req, res) => {
		const product = {
			id: req.body.id,
			img: req.body.img,
			title: req.body.title,
			model: req.body.model,
			category: req.body.category,
			price: req.body.price,
			rating: req.body.rating
		};

		db.collection('catalog').insertOne(product, (err, result) => {
			if (err) { 
				console.log(err);
				res.status(500).send({status: "error"});
			} else {
				res.status(200).send(result.ops[0]);
			}
		});
	});
}
