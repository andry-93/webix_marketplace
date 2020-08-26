import {JetView} from "webix-jet";

export default class Auth extends JetView {
	config() {
		const toolbar = {
			view: "toolbar",
			cols: [
				{
					view: "label",
					label: "Varin shop",
					width: 200
				},
				{},
				{
					width: 200,
					css: "top_menu",
					cols: [
						{
							view: "button",
							value: "Login",
							on: {
								onItemClick: () => this.show("auth.login")
							}
						},
						{
							view: "button",
							value: "Register",
							on: {
								onItemClick: () => this.show("auth.register")
							}
						}
					]
				}
			]
		};

		const ui = {
			css: "auth_layout",
			rows: [
				toolbar,
				{},
				{
					cols: [
						{gravity: 1},
						{$subview: true},
						{gravity: 1}
					]
				},
				{}
			]
		};

		return ui;
	}
}
