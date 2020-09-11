import firebase from "firebase/app";
import "firebase/database";

const database = firebase.database();
const dbRefUsers = database.ref().child("users");

export const users = new webix.DataCollection({
	save: {
		insert(id, status, item) {
			return database.ref(`users/${id}`).set({
				id: `${id}`,
				...item
			});
		},
		update(id, status, item) {
			return database.ref(`users/${id}`).update({
				id: `${id}`,
				...item
			});
		}
	}
	// url: "http://localhost:3000/users",
	// save: {
	// 	insert(id, status, item) {
	// 		return webix.ajax().post("http://localhost:3000/users", {id, ...item});
	// 	},
	// 	update(id, status, item) {
	// 		return webix.ajax().put(`http://localhost:3000/users/${id}`, {id, ...item});
	// 	}
	// }
});

dbRefUsers.on("child_added", (snap) => {
	users.parse(snap.val());
});

dbRefUsers.on("child_changed", (snap) => {
	const data = users.data.pull;
	const values = snap.val();
	const id = values.id;
	data[id] = values;
});

dbRefUsers.on("child_removed", (snap) => {
	const data = users.data.pull;
	const values = snap.val();
	const id = values.id;
	delete data[id];
});
