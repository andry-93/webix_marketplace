import {JetView} from "webix-jet";
import {bagData} from "../models/bag";
import {users} from "../models/users";

function setValue(button, value) {
	button.define("label", value);
	button.refresh();
}

export default class Toolbar extends JetView {
	config() {
		const toolbar = {
			view: "toolbar",
			cols: [
				{
					view: "label",
					label: "Varin shop",
					width: 350
				},
				{
					view: "label",
					localId: "userName",
					align: "center",
					label: "Hi!"
				},
				{
					width: 350,
					css: "top_menu",
					cols: [
						{
							view: "button",
							value: "Logout",
							on: {
								onItemClick() {
									this.$scope.app.show("/auth.index/auth.login");
									this.$scope.app.setService("user", undefined);
								}
							}
						},
						{
							view: "button",
							localId: "adminButton",
							value: "Admin panel",
							autowidth: true,
							hidden: true,
							on: {
								onItemClick() {
									this.$scope.show("administration");
								}
							}
						},
						{
							view: "button",
							value: "History",
							on: {
								onItemClick() {
									this.$scope.show("orderHistory");
								}
							}
						},
						{
							view: "button",
							localId: "bagButton",
							label: "Bag"
						}
					]
				}
			]
		};

		return toolbar;
	}

	init() {
		const nameLabel = this.$$("userName");
		const bagButton = this.$$("bagButton");
		const adminButton = this.$$("adminButton");

		users.waitData.then(() => {
			const auth = this.app.getService("user");
			if (auth && auth.user && auth.user.name) {
				adminButton.show();
			}
			else {
				adminButton.hide();
			}
			setValue(nameLabel, `Hi, ${auth && auth.user && auth.user.name ? auth.user.name : "Name"}!`);
		});

		bagData.attachEvent("onAfterAdd", () => setValue(bagButton, `Bag(${bagData.count()})`));
		bagData.attachEvent("onDataUpdate", () => setValue(bagButton, `Bag(${bagData.count()})`));
		bagData.attachEvent("onAfterDelete", () => setValue(bagButton, `Bag(${bagData.count()})`));
		bagData.waitData.then(() => {
			setValue(bagButton, `Bag(${bagData.count()})`);
		});

		this.$$("bagButton").attachEvent("onItemClick", () => {
			this.show("bag.index");
			this._parent.getMenu().unselectAll();
		});
	}
}
