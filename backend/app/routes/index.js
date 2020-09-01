const userRoutes = require('./user_routes');
const categoryRoutes = require('./category_routes');

module.exports = function(app, db) {
	userRoutes(app, db);
	categoryRoutes(app, db);
	// Тут, позже, будут и другие обработчики маршрутов 
};
