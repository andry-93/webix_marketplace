import {JetView} from "webix-jet";
import categoryData from "../../models/category";
import {catalogData} from "../../models/catalog";

export default class NewProduct extends JetView {
	config() {
		const ui = {
			view: "form",
			elements: [
				{
					view: "combo",
					placeholder: "Model",
					label: "Model<super>*</super>",
					name: "modelId"
				},
				{
					view: "text",
					placeholder: "Type name",
					name: "title",
					label: "Name<super>*</super>"
				},
				{
					view: "text",
					placeholder: "Type price",
					name: "price",
					label: "Price<super>*</super>"
				},
				{
					cols: [
						{
							view: "label",
							label: "Picture:",
							width: 81
						},
						{
							view: "text",
							name: "img",
							disabled: true,
							hidden: true
						},
						{
							view: "uploader",
							value: "Add picture",
							autosend: false,
							multiple: false,
							height: 24,
							autowidth: true,
							css: "webix_primary",
							accept: "image/jpeg, image/png",
							on: {
								onBeforeFileAdd(upload) {
									const file = upload.file;
									const reader = new FileReader();
									reader.onload = (event) => {
										const form = this.getFormView();
										const textInput = form.elements.img;
										textInput.setValue(event.target.result);
									};
									reader.readAsDataURL(file);
									return false;
								}
							}
						},
						{}
					]
				},
				{
					view: "textarea",
					height: 55
				},
				{
					cols: [
						{
							view: "button",
							value: "Add new product",
							localId: "addNewProduct",
							autowidth: true,
							css: "webix_primary"
						},
						{}
					]
				},
				{}
			],
			rules: {
				modelId: webix.rules.isNotEmpty,
				title: webix.rules.isNotEmpty,
				price: webix.rules.isNumber
			}
		};

		return ui;
	}

	init(view) {
		const addNewProduct = this.$$("addNewProduct");
		const form = view;
		const models = form.elements.modelId;
		categoryData.waitData.then(() => {
			models.define({
				options: categoryData.getItem(categoryData.getFirstId()).models
			});
			models.refresh();

			addNewProduct.attachEvent("onItemClick", () => {
				if (form.validate()) {
					const formData = form.getValues();
					const selectedModel = models.getList().getSelectedItem();
					catalogData.add({
						id: webix.uid(),
						img: formData.img,
						title: formData.title,
						model: selectedModel.model,
						category: categoryData.getItem(categoryData.getFirstId()).category,
						price: formData.price,
						rating: "0"
					});
					webix.message("New product added");
				}
			});
		});
	}
}
