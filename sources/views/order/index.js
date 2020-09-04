import {JetView} from "webix-jet";
import {bagData} from "../../models/bag";
import {ordersData} from "../../models/orders";
import {users} from "../../models/users";

import "./style.css";

export default class OrderForm extends JetView {
	config() {
		return {
			rows: [
				{
					view: "form",
					localId: "orderForm",
					elements: [
						{
							rows: [
								{
									view: "text",
									labelWidth: 130,
									placeholder: "Type your name",
									label: "Your Name <span class=red>*</span>",
									name: "name"
								},
								{
									view: "text",
									labelWidth: 130,
									placeholder: "Type your email",
									label: "Email <span class=red>*</span>",
									name: "email"
								},
								{
									view: "text",
									labelWidth: 130,
									placeholder: "Type your phone number",
									label: "Phone <span class=red>*</span>",
									name: "phone"
								},
								{
									view: "combo",
									labelWidth: 130,
									label: "Delivery type",
									options: ["Master"],
									name: "delivery"
								},
								{
									view: "text",
									labelWidth: 130,
									placeholder: "Type your address",
									label: "Delivery address <span class=red>*</span>",
									name: "address"
								},
								{
									view: "combo",
									labelWidth: 130,
									label: "Payment type",
									options: ["Card"],
									name: "payment"
								}
							]
						},
						{
							view: "button",
							value: "Checkout",
							on: {
								onItemClick() {
									const bag = bagData.serialize();
									if (this.getFormView().validate()) {
										bag.forEach((item) => {
											ordersData.add({
												...this.getFormView().getValues(),
												id: webix.uid(),
												status: "In process",
												userId: item.userId,
												amount: item.amount,
												productId: item.productId,
												date: new Date()
											});
										});
										bag.forEach(element => bagData.remove(element.id));
										webix.message("Order is processed");
										this.$scope.show("orderHistory");
									}
								}
							}
						},
						{}
					],
					rules: {
						name: webix.rules.isNotEmpty,
						email: webix.rules.isEmail,
						phone: webix.rules.isNumber,
						address: webix.rules.isNotEmpty
					}
				}
			]
		};
	}

	init() {
		users.waitData.then(() => {
			const auth = this.app.getService("user");
			const orderForm = this.$$("orderForm");
			orderForm.setValues({
				name: auth.user.name,
				email: auth.user.email,
				phone: auth.user.phone,
				address: auth.user.address
			});
		});
	}
}
