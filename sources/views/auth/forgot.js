import {JetView} from "webix-jet";

export default class Login extends JetView {
	config() {
		const form = {
			view: "form",
			minWidth: 250,
			maxWidth: 500,
			gravity: 3,
			type: "clean",
			elements: [
				{template: "Reset Password", type: "header", borderless: true},
				{
					padding: 11,
					rows: [
						{view: "text", name: "email", label: "E-Mail Address", labelWidth: 110},
						{cols: [
							{width: 111},
							{
								view: "button",
								value: "Send Password Reset Link",
								width: 220,
								css: "webix_primary",
								click: () => {
									this.doForgot();
								},
								hotkey: "enter"
							}
						]}
					]
				}
			],
			rules: {
				email: webix.rules.isEmail
			}
		};

		return form;
	}

	doForgot() {
		const form = this.getRoot();

		if (form.validate()) {
			console.log(form.getValues());
		}
	}
}
