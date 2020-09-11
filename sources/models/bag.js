import firebase from "firebase/app";
import "firebase/database";

const database = firebase.database();
const dbRefBag = database.ref().child("bag");

export const bagData = new webix.DataCollection({
	save: {
		insert(id, status, item) {
			return database.ref(`bag/${id}`).set({
				id: `${id}`,
				...item
			});
		},
		update(id, status, item) {
			return database.ref(`bag/${id}`).update({
				id: `${id}`,
				...item
			});
		},
		delete(id) {
			return database.ref(`bag/${id}`).remove();
		}
	}
	// url: "http://localhost:3000/bag",
	// save: {
	// 	insert(id, status, item) {
	// 		return webix.ajax().post("http://localhost:3000/bag", {id, ...item});
	// 	},
	// 	delete(id) {
	// 		return webix.ajax().del(`http://localhost:3000/bag/${id}`);
	// 	}
	// }
});

dbRefBag.on("child_added", (snap) => {
	bagData.parse(snap.val());
});

dbRefBag.on("child_changed", (snap) => {
	const data = bagData.data.pull;
	const values = snap.val();
	const id = values.id;
	data[id] = values;
});

dbRefBag.on("child_removed", (snap) => {
	const data = bagData.data.pull;
	const values = snap.val();
	const id = values.id;
	delete data[id];
});
