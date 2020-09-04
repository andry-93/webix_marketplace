export const catalogData = new webix.DataCollection({
	url: "http://localhost:3000/catalog",
	save: {
		insert(id, status, item) {
			return webix.ajax().post("http://localhost:3000/catalog", {id, ...item});
		}
	},

	scheme: {
		$init: (obj) => {
			obj.amount = 0;
		},

		$save: (obj) => {
			delete obj.amount;
		}
	}
});
