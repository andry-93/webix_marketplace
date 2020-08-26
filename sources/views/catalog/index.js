import {JetView} from "webix-jet";
import {catalogData} from "../../models/catalog";
import InfoPopup from "./infoPopup";
import {bagData} from "../../models/bag";

function counterPrev(e, id) {
	const item = this.getItem(id);
	item.amount = item.amount < 1 ? 0 : item.amount - 1;
	this.updateItem(id);
	return false;
}

function counterNext(e, id) {
	const item = this.getItem(id);
	item.amount += 1;
	this.updateItem(id);
	return false;
}

export default class Catalog extends JetView {
	config() {
		return {
			view: "datatable",
			autoConfig: true,
			select: true,
			rowHeight: 110,
			css: "catalog_list",
			type: {
				counter: value => `<div class="webix_control webix_el_counter counter_overall">
					<button type="button" class="webix_inp_counter_prev" tabindex="-1" >-</button><input type="text" readonly class="webix_inp_counter_value" style="" value="${value}"></input><button type="button" class="webix_inp_counter_next" tabindex="-1">+</button>
				</div>`,

				addToCartButton: () => `<div class="webix_control webix_primary button_overall">
					<div class="webix_el_box">
						<button type="button" class="webix_button addToCart"><i class="fas fa-cart-plus"></i></button>
					</div>
				</div>`
			},
			columns: [
				{id: "img", header: "Image", template: "<img alt='#title#' src='#img#'>"},
				{id: "title", header: ["Name", {content: "textFilter"}], fillspace: true, sort: "string"},
				{id: "price", header: "Price", format: webix.i18n.priceFormat, sort: "int"},
				{id: "rating", header: "Rating", sort: "int"},
				{
					id: "amount",
					width: 120,
					template: (obj, common) => common.counter(obj.amount)
				},
				{id: "buy", header: "Buy", template: (obj, common) => common.addToCartButton()}
			],
			onClick: {
				webix_inp_counter_value: () => false,
				webix_inp_counter_prev: counterPrev,
				webix_inp_counter_next: counterNext,
				addToCart(ev, id) {
					const item = this.getItem(id);
					const auth = this.$scope.app.getService("user");
					// eslint-disable-next-line max-len
					const existBag = bagData.find(obj => obj.productId === item.id && obj.userId === auth.user.id);
					if (item.amount !== 0) {
						const cloneItem = {...item};
						delete cloneItem.id;

						if (existBag.length > 0) {
							bagData.updateItem(existBag[0].id,
								{
									amount: cloneItem.amount,
									sum: cloneItem.amount * cloneItem.price
								});
						}
						else {
							delete cloneItem.id;
							bagData.add({
								id: webix.uid(),
								productId: item.id,
								...cloneItem,
								userId: auth.user.id,
								sum: cloneItem.amount * cloneItem.price
							}, 0);
						}
					}
					else if (existBag[0] && bagData.exists(existBag[0].id)) {
						bagData.remove(existBag[0].id);
					}

					return false;
				}
			},
			onDblClick: {
				webix_inp_counter_value: () => false,
				webix_inp_counter_prev: counterPrev,
				webix_inp_counter_next: counterNext,
				addToCart(ev, id) {
					return false;
				}
			}
		};
	}

	init(view) {
		view.parse(catalogData);
		this.window = this.ui(InfoPopup);
		view.attachEvent("onItemDblClick", (id) => {
			this.window.showWindow(id);
		});
	}

	urlChange() {
		const selectedCategory = this.getParam("category");
		const selectedModel = this.getParam("model");
		catalogData.waitData.then(
			() => {
				if (selectedCategory && selectedModel) {
					catalogData.filter((obj) => {
						const isModel = obj.model.toString().indexOf(selectedModel) !== -1;
						const isCategory = obj.category.toString().indexOf(selectedCategory) !== -1;
						return isModel && isCategory;
					});
				}
				else if (selectedCategory) {
					catalogData.filter("#category#", selectedCategory);
				}
				else {
					catalogData.filter();
				}
			}
		);
	}
}
