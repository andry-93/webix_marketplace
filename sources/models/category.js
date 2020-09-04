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

export default data;
