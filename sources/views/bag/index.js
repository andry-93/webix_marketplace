import {JetView} from "webix-jet";
import BagTable from "./bagTable";
import BagTotal from "./bagTotal";

export default class Bag extends JetView {
	config() {
		return {
			rows: [
				BagTable,
				{
					view: "toolbar",
					cols: [
						BagTotal
					]
				},
				{
					cols: [
						{
							view: "button",
							value: "Make order",
							width: 200,
							on: {
								onItemClick() {
									this.$scope.show("order");
								}
							}
						},
						{}
					]
				}
			]
		};
	}
}
