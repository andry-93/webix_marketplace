import {JetView} from "webix-jet";
import {ordersData} from "../../../models/orders";
import {catalogData} from "../../../models/catalog";
import StatusWindow from "./statusWindow";

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

export default class Orders extends JetView {
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
					adjust: true,
					template: obj => catalogData.getItem(obj.productId).title
				},
				{header: "Amount", id: "amount", width: 70},
				{header: ["Buyer name", {content: "textFilter"}], fillspace: true, id: "name", minWidth: 102, maxWidth: 250},
				{header: "Buyer email", id: "email", adjust: true},
				{header: "Phone", id: "phone"},
				{header: "Address", id: "address", fillspace: true, minWidth: 100},
				{header: "Delivery", id: "delivery", adjust: true},
				{header: "Payment", id: "payment", adjust: true},
				{header: "Order date", id: "date", adjust: true, format: webix.i18n.dateFormatStr},
				{header: "Status", id: "status", template: "<div class=status>#status#</div>", width: 100}
			],
			onClick: {
				status(event, cell) {
					this.$scope.statusWindow.showWindow(cell.row);
					return false;
				}
			},
			data: ordersData
		};
	}

	init() {
		this.statusWindow = this.ui(StatusWindow);
		ordersData.filter();
	}
}
