import {JetApp, EmptyRouter, HashRouter} from "webix-jet";
import {users} from "./models/users";
import "./styles/app.css";

export default class MyApp extends JetApp {
	constructor(config) {
		const defaults = {
			id: APPNAME,
			version: VERSION,
			router: BUILD_AS_MODULE ? EmptyRouter : HashRouter,
			debug: !PRODUCTION,
			// start: "/auth.index/auth.login"
			start: "/top/catalog"
		};

		super({...defaults, ...config});
	}
}

if (!BUILD_AS_MODULE) {
	webix.ready(
		() => {
			const app = new MyApp();
			users.waitData.then(() => {
				app.setService("user", {auth: true, user: users.getItem(users.getFirstId())});
				app.attachEvent("app:guard", (url, view, nav) => {
					const auth = app.getService("user");
					if (url.indexOf("/top") !== -1 && !auth) {
						nav.redirect = "/auth.index/auth.login";
					}

					if (url.indexOf("/administration") !== -1 && !auth.user.admin) {
						nav.redirect = "/auth.index/auth.login";
					}
				});
			});
			// app.setService("user", {auth: true, user: users.data.pull[0]});

			app.render();
		}
	);
}
