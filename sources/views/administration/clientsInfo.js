import {JetView} from "webix-jet";
import {users} from "../../models/users";

export default class ClientInfo extends JetView {
	config() {
		const ui = {
			view: "datatable",
			editable: true,
			editaction: "dblclick",
			columns: [
				{header: "#", id: "id"},
				{header: ["Name", {content: "textFilter"}], id: "name", fillspace: true, editor: "text"},
				{header: ["Email", {content: "textFilter"}], fillspace: true, id: "email", editor: "text"},
				{header: "Created at", id: "createdDate"},
				{header: "Is admin", id: "admin", checkValue: "true", uncheckValue: "false", template: "{common.checkbox()}"}
			],
			rules: {
				name: webix.rules.isNotEmpty,
				email: webix.rules.isEmail
			},
			data: users
		};

		return ui;
	}
}
