import {JetView} from "webix-jet";
import {users} from "../../models/users";

export default class Register extends JetView {
	config() {
		const form = {
			view: "form",
			minWidth: 300,
			maxWidth: 600,
			gravity: 3,
			type: "clean",
			elements: [
				{template: "Register", type: "header", borderless: true},
				{
					padding: 11,
					rows: [
						{view: "text", name: "name", label: "Name", labelWidth: 130},
						{view: "text", name: "email", label: "E-Mail Address", labelWidth: 130},
						{view: "text", type: "password", name: "pass", label: "Password", labelWidth: 130},
						{view: "text", localId: "confirmPass", type: "password", label: "Confirm Password", labelWidth: 130},
						{cols: [
							{width: 131},
							{
								view: "button",
								value: "Register",
								width: 80,
								css: "webix_primary",
								hotkey: "enter",
								click: () => {
									this.doRegister();
								}
							}
						]}
					]
				}
			],
			rules: {
				name: webix.rules.isNotEmpty,
				email: webix.rules.isEmail,
				pass: webix.rules.isNotEmpty
			}
		};

		return form;
	}

	doRegister() {
		const form = this.getRoot();

		if (form.validate()) {
			const data = form.getValues();
			if (this.$$("confirmPass").getValue() === data.pass) {
				users.add({...data}, 0);
				this.app.show("/auth.index/auth.login");
			}
		}
	}
}
