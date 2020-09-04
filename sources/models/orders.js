import {catalogData} from "./catalog";

export const ordersData = new webix.DataCollection({
	url: "http://localhost:3000/orders",
	save: {
		insert(id, status, item) {
			return webix.ajax().post("http://localhost:3000/orders", {id, ...item});
		},
		delete(id) {
			return webix.ajax().del(`http://localhost:3000/orders/${id}`);
		},
		update(id, status, item) {
			return webix.ajax().put(`http://localhost:3000/orders/${id}`, {id, ...item});
		}
	},

	scheme: {
		$init: (obj) => {
			obj.productName = catalogData.getItem(obj.productId).title;
		},

		$save: (obj) => {
			delete obj.productName;
		}
	}
});
