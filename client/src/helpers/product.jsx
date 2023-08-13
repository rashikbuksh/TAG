// get product discount price
export const getDiscountPrice = (price, discount) => {
	return discount && discount > 0
		? (price - price * (discount / 100)).toFixed(2)
		: price;
};

// get products
export const getProducts = (products, limit, type, category) => {
	const finalProducts = category
		? products.filter(
				(product) =>
					product.category.filter((single) => single === category)[0]
		  )
		: products;

	if (!finalProducts) return null;
	const prodArray = [...finalProducts];

	if (type && type === "bestSeller") {
		return prodArray
			.sort((a, b) => b.saleCount - a.saleCount)
			.slice(0, limit ? limit : finalProducts.length);
	}
	return finalProducts.slice(0, limit ? limit : finalProducts.length);
};

// get product cart quantity
export const getProductCartQuantity = (cartItems, product) => {
	let productInCart = cartItems.filter(
		(single) => single.id === product.id
	)[0];
	if (cartItems.length >= 1 && productInCart) {
		return cartItems.filter((single) => product.id === single.id)[0]
			.quantity;
	} else {
		return 0;
	}
};

// shop top filter toggle
export const toggleShopTopFilter = (e) => {
	const shopTopFilterWrapper = document.querySelector("#shop-filter-menu");
	shopTopFilterWrapper.classList.toggle("active");
	if (shopTopFilterWrapper.style.height) {
		shopTopFilterWrapper.style.height = null;
	} else {
		shopTopFilterWrapper.style.height =
			shopTopFilterWrapper.scrollHeight + "px";
	}
	e.currentTarget.classList.toggle("active");
};

// get individual element
const getIndividualItemArray = (array) => {
	let individualItemArray = array.filter(function (v, i, self) {
		return i === self.indexOf(v);
	});
	return individualItemArray;
};

// get individual categories
export const getIndividualCategories = (products) => {
	let productCategories = [];
	products &&
		products.map((product) => {
			return productCategories.push(product);
		});
	const individualProductCategories =
		getIndividualItemArray(productCategories);
	return individualProductCategories;
};

// get individual colors
export const getIndividualColors = (products) => {
	let productColors = [];
	products &&
		products.map((product) => {
			return (
				product.variation &&
				product.variation.map((single) => {
					return productColors.push(single.color);
				})
			);
		});
	const individualProductColors = getIndividualItemArray(productColors);
	return individualProductColors;
};

//get products based on filter
export const getSortedProducts = (products, sortType, sortValue) => {
	// console.log(products, sortType, sortValue);
	if (products && sortType && sortValue) {
		if (sortType === "category") {
			products.filter((product) => {
				console.log(product ? product.product_id == sortValue : null);
				let bool = product ? product.product_id == sortValue : null;
				if (bool) {
					console.log(product);
					return product;
				}
			});
		} else {
			return products;
		}
	} else {
		return products;
	}
};

export const setActiveSort = (e) => {
	const filterButtons = document.querySelectorAll(
		".shop-filter-block__color li button, .shop-filter-block__category li button"
	);
	filterButtons.forEach((item) => {
		item.classList.remove("active");
	});
	e.currentTarget.classList.add("active");
};

// get stock of cart item
export const cartItemStock = (item) => {
	if (item.stock) {
		return item.stock;
	}
};
