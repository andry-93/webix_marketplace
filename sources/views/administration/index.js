import {JetView} from "webix-jet";

export default class TopView extends JetView {
	config() {
		const menu = {
			view: "menu",
			localId: "menuAdmin",
			css: "app_menu",
			width: 180,
			layout: "y",
			select: true,
			data: [
				{id: "clientsInfo", value: "Clients info"},
				{id: "orders", value: "Orders"},
				{id: "newProduct", value: "Add new product"}
			]
		};

		const ui = {
			css: "app_layout",
			rows: [
				{
					cols: [
						{
							rows: [menu]
						},
						{$subview: true}
					]
				}
			]
		};

		return ui;
	}

	init() {
		const menu = this.$$("menuAdmin");
		menu.attachEvent("onMenuItemClick", (id) => {
			this.show(`administration.${id}`);
		});
	}
}
