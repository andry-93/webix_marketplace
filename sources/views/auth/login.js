import {JetView} from "webix-jet";
import {users} from "../../models/users";

export default class Login extends JetView {
	config() {
		const form = {
			view: "form",
			minWidth: 250,
			maxWidth: 500,
			gravity: 3,
			type: "clean",
			elements: [
				{template: "Login", type: "header", borderless: true},
				{
					padding: 11,
					rows: [
						{view: "text", name: "email", label: "E-Mail Address", labelWidth: 110},
						{view: "text", type: "password", name: "pass", label: "Password", labelWidth: 110},
						{cols: [
							{width: 111},
							{
								view: "button",
								value: "Login",
								css: "webix_primary",
								width: 80,
								click: () => {
									this.doLogin();
								},
								hotkey: "enter"
							},
							{
								view: "button",
								value: "Forgot your password?",
								width: 200,
								on: {
									onItemClick: () => this.show("auth.forgot")
								}
							}
						]}
					]
				}
			],
			rules: {
				email: webix.rules.isEmail,
				pass: webix.rules.isNotEmpty
			}
		};

		return form;
	}

	doLogin() {
		const form = this.getRoot();

		if (form.validate()) {
			const formValues = form.getValues();
			// eslint-disable-next-line max-len
			const auth = users.find(obj => obj.email.indexOf(formValues.email) !== -1 && obj.pass.indexOf(formValues.pass) !== -1);
			if (auth.length > 0) {
				this.app.setService("user", {auth: true, user: auth[0]});
				this.app.show("/top/catalog");
			}
			else {
				webix.message("Uncorrected data");
			}
		}
	}
}
