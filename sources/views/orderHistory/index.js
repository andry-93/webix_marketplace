import {JetView} from "webix-jet";
import {ordersData} from "../../models/orders";
import {catalogData} from "../../models/catalog";

import "./style.css";

function equals(a, b) {
	a = a.toString().toLowerCase();
	return a.indexOf(b.toLowerCase()) !== -1;
}

function onTitleFilter(value, filter, obj) {
	const catalogItem = catalogData.getItem(obj.productId);
	if (equals(catalogItem.title, filter)) return true;
	return false;
}

export default class OrderHistory extends JetView {
	config() {
		return {
			view: "datatable",
			columns: [
				{
					header: [
						"Product",
						{
							content: "textFilter",
							compare: onTitleFilter
						}
					],
					fillspace: true,
					template: obj => catalogData.getItem(obj.productId).title
				},
				{header: "Amount", id: "amount"},
				{header: "Address", id: "address", fillspace: true},
				{header: "Delivery", id: "delivery"},
				{header: "Payment", id: "payment"},
				{header: "Order date", id: "date", format: webix.i18n.dateFormatStr},
				{header: "Status", id: "status", template: "<div class=status>#status#</div>"}
			],
			onClick: {
				status(event, cell) {
					const item = ordersData.getItem(cell.row);
					if (item.status === "Declined") {
						webix.alert({
							title: "Decline reasons",
							text: item.reason || ""
						});
					}

					return false;
				}
			},
			data: ordersData
		};
	}

	init() {
		const auth = this.app.getService("user");
		ordersData.filter("#userId#", auth.user.id);
	}
}
