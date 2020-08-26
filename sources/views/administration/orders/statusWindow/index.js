import {JetView} from "webix-jet";
import {ordersData} from "../../../../models/orders";

import "./style.css";

export default class StatusWindow extends JetView {
	config() {
		const body = {
			view: "form",
			localId: "statusForm",
			elements: [
				{
					view: "combo",
					name: "status",
					label: "Choose status",
					labelWidth: 110,
					options: ["In process", "Declined"],
					on: {
						onChange(newv) {
							const statusForm = this.getFormView();
							const {reason} = statusForm.elements;
							if (newv === "Declined") {
								reason.show();
							}
							else {
								reason.setValue("");
								reason.hide();
							}
						}
					}
				},
				{
					view: "textarea",
					name: "reason",
					label: "Indicate reason",
					labelWidth: 110,
					height: 100,
					hidden: true
				},
				{
					view: "button",
					value: "Save",
					on: {
						onItemClick() {
							const statusForm = this.getFormView();
							const statusFormData = statusForm.getValues();
							const item = ordersData.getItem(this.$scope.idItem);
							item.status = statusFormData.status;
							item.reason = statusFormData.reason || "";
							ordersData.updateItem(this.$scope.idItem, item);
							this.$scope.getRoot().hide();
						}
					}
				}
			]
		};

		return {
			view: "window",
			modal: true,
			position: "center",
			close: true,
			head: "Change status",
			body
		};
	}

	showWindow(id) {
		this.idItem = id;
		const item = ordersData.getItem(this.idItem);
		const statusForm = this.$$("statusForm");
		statusForm.setValues({status: item.status, reason: item.reason});

		this.getRoot().show();
	}
}
