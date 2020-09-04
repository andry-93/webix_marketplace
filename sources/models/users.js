export const users = new webix.DataCollection({
	url: "http://localhost:3000/users",
	save: {
		insert(id, status, item) {
			return webix.ajax().post("http://localhost:3000/users", {id, ...item});
		},
		update(id, status, item) {
			return webix.ajax().put(`http://localhost:3000/users/${id}`, {id, ...item});
		}
	}
});
