export const catalogData = new webix.DataCollection({
	data: [
		{id: 1, img: "https://content2.onliner.by/catalog/device/header/c93a1df6be27222912d27530201d7d7a.jpeg", title: "Samsung Galaxy A50 4GB/64GB", model: "samsung", category: "phones", price: "240", rating: "125"},
		{id: 2, img: "https://content2.onliner.by/catalog/device/header/04072f3f45750926cd7199984ae68153.jpeg", title: "Samsung Galaxy A51 SM-A515F/DS 4GB/64GB", model: "samsung", category: "phones", price: "305", rating: "84"},
		{id: 3, img: "https://content2.onliner.by/catalog/device/header/dec990950ae2a82a3775f94795c76005.jpeg", title: "Samsung Galaxy A70 6GB/128GB", model: "samsung", category: "phones", price: "355", rating: "68"},
		{id: 4, img: "https://content2.onliner.by/catalog/device/header/e2189f90f9088975c553ec33431fc186.jpeg", title: "Apple iPhone 11 64GB", model: "apple", category: "phones", price: "810", rating: "69"},
		{id: 5, img: "https://content2.onliner.by/catalog/device/header/0ab0b43eb38b5767ea29c4509f0a9d3b.jpeg", title: "Apple iPhone 7 32GB", model: "apple", category: "phones", price: "443", rating: "85"},
		{id: 6, img: "https://content2.onliner.by/catalog/device/header/b78daca7e32ad75c583816bce39f3191.jpeg", title: "Apple iPhone 11 Pro 256GB", model: "apple", category: "phones", price: "1450", rating: "91"},
		{id: 7, img: "https://content2.onliner.by/catalog/device/header/a83458571f2c39fc9c435bd1116b4876.jpeg", title: "Apple iPhone X 64GB", model: "apple", category: "phones", price: "750", rating: "95"}
	],
	scheme: {
		$init: (obj) => {
			obj.amount = 0;
		},

		$save: (obj) => {
			delete obj.amount;
		}
	}
});
