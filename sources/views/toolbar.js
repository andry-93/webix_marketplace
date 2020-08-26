import {JetView} from "webix-jet";
import {bagData} from "../models/bag";

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
							value: "History"
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
		const auth = this.app.getService("user");
		const nameLabel = this.$$("userName");
		const bagButton = this.$$("bagButton");
		setValue(nameLabel, `Hi, ${auth && auth.user && auth.user.name ? auth.user.name : "Name"}!`);
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
