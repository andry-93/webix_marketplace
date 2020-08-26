import {JetView} from "webix-jet";
import {bagData} from "../../models/bag";

function updateTotalValue(view) {
	let total = 0;
	bagData.serialize().forEach((element) => {
		total += element.sum;
	});
	view.setHTML(`Total: ${total || 0}`);
}

export default class BagTotal extends JetView {
	config() {
		return {
			localId: "total",
			template: "0",
			borderless: true,
			autoheight: true
		};
	}

	init(view) {
		bagData.attachEvent("onAfterDelete", () => updateTotalValue(view));
		updateTotalValue(view);
	}
}
