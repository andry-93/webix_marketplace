export const bagData = new webix.DataCollection({
	url: "http://localhost:3000/bag",
	save: {
		insert(id, status, item) {
			return webix.ajax().post("http://localhost:3000/bag", {id, ...item});
		},
		delete(id) {
			return webix.ajax().del(`http://localhost:3000/bag/${id}`);
		}
	}
});
