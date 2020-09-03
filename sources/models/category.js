const data = new webix.DataCollection({
	url: "http://localhost:3000/category",
	scheme: {
		$init: (obj) => {
			obj.data = JSON.parse(obj.data);
			obj.models = obj.data;
		},

		$save: (obj) => {
			obj.data = JSON.stringify(obj.data);
			delete obj.models;
		}
	}
});

// const data = [
// 	{
// 		id: 1,
// 		value: "Phones",
// 		category: "phones",
// 		open: true,
// 		data: [
// 			{id: 2, value: "Samsung", model: "samsung"},
// 			{id: 3, value: "Apple", model: "apple"}
// 		]
// 	}
// ];

export default data;
