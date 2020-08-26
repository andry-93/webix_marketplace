import {JetView} from "webix-jet";
import {bagData} from "../../models/bag";

export default class BagTable extends JetView {
	config() {
		return {
			view: "datatable",
			autoConfig: true,
			select: true,
			rowHeight: 110,
			css: "catalog_list",
			type: {
				removeCartButton: () => `<div class="webix_control webix_primary button_overall">
					<div class="webix_el_box">
						<button type="button" class="webix_button removeInToCart"><i class="fas fa-trash-alt"></i></button>
					</div>
				</div>`
			},
			columns: [
				{id: "img", header: "Image", template: "<img alt='#title#' src='#img#'>"},
				{id: "title", header: "Name", fillspace: true, sort: "string"},
				{id: "amount", header: "Amount"},
				{id: "price", header: "Price", format: webix.i18n.priceFormat, sort: "int"},
				{id: "sum", header: "Sum", format: webix.i18n.priceFormat, sort: "int"},
				{id: "remove", header: " ", template: (obj, common) => common.removeCartButton()}
			],
			onClick: {
				removeInToCart(ev, id) {
					bagData.remove(id);
					return false;
				}
			}
		};
	}

	init(view) {
		view.parse(bagData);
	}
}
