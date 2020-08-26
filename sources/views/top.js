import {JetView} from "webix-jet";
import {data} from "../models/category";
import {bagData} from "../models/bag";
import Toolbar from "./toolbar";

export default class TopView extends JetView {
	config() {
		const menu = {
			view: "tree",
			localId: "menu",
			css: "app_menu",
			width: 180,
			layout: "y",
			select: true,
			data
		};

		const ui = {
			css: "app_layout",
			rows: [
				Toolbar,
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
		const auth = this.app.getService("user");
		bagData.waitData.then(() => {
			bagData.filter("#userId#", auth.user.id);
		});
		// eslint-disable-next-line func-names
		this.$$("menu").attachEvent("onAfterSelect", function (id) {
			const parentId = this.getItem(id).$parent;
			const item = this.getItem(id);
			if (parentId) {
				const parentItem = this.getItem(parentId);
				this.$scope.show(`catalog?category=${parentItem.category}&model=${item.model}`);
			}
			else {
				this.$scope.show(`catalog?category=${item.category}`);
			}
		});
	}

	getMenu() {
		return this.$$("menu");
	}
}
