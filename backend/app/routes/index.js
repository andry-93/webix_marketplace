const userRoutes = require('./user_routes');
const categoryRoutes = require('./category_routes');
const catalogRoutes = require('./catalog_routes');
const bagRoutes = require('./bag_routes');
const ordersRoutes = require('./orders_routes');

module.exports = function(app, db) {
	userRoutes(app, db);
	categoryRoutes(app, db);
	catalogRoutes(app, db);
	bagRoutes(app, db);
	ordersRoutes(app, db);
};
