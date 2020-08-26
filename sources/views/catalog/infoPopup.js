import {JetView} from "webix-jet";
import {catalogData} from "../../models/catalog";

export default class InfoForm extends JetView {
	config() {
		return {
			view: "window",
			position: "center",
			modal: true,
			move: true,
			width: 500,
			css: "info_window",
			head: {
				cols: [
					{template: "Info", type: "header", borderless: true, localId: "headerWindow"},
					{view: "icon",
						icon: "wxi-close",
						tooltip: "Close window",
						click: () => this.closeWindow()
					}
				]
			},
			body: {
				paddingY: 10,
				cols: [
					{
						view: "template",
						localId: "img",
						css: "info_img",
						autoheight: true,
						borderless: true
					},
					{
						rows: [
							{
								localId: "infoTemplate",
								autoheight: true,
								borderless: true,
								template(obj) {
									return `
										<table>
											<tr>
												<th>Title:</th>
												<td>${obj.title}</td>
											</tr>
											<tr>
												<th>Price:</th>
												<td>${obj.price}</td>
											</tr>
											<tr>
												<th>Rating:</th>
												<td>${obj.rating}</td>
											</tr>
										</table>
									`;
								}
							}
						]
					}
				]
			}
		};
	}

	showWindow(id) {
		const item = catalogData.getItem(id);
		this.getRoot().show();
		const template = this.$$("infoTemplate");
		const img = this.$$("img");
		template.setValues(item);
		this.$$("headerWindow").setHTML(item.title);
		img.setHTML(`<img src=${item.img} alt="${item.title}">`);
	}

	closeWindow() {
		this.getRoot().hide();
	}
}
