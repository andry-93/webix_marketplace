export const users = new webix.DataCollection({
	url: "http://localhost:3000/users",
	save: "http://localhost:3000/users"
	// data: [
	// 	{
	// 		id: 1,
	// 		name: "Admin",
	// 		email: "admin@admin.admin",
	// 		phone: "298508516",
	// 		pass: "admin",
	// 		address: "Minsk, Kollektornaya 3a",
	// 		admin: true
	// 	},
	// 	{
	// 		id: 2,
	// 		name: "User",
	// 		email: "user@user.user",
	// 		phone: "298545681",
	// 		pass: "user",
	// 		address: "Minsk, Kollektornaya 3a",
	// 		admin: false
	// 	}
	// ]
});
