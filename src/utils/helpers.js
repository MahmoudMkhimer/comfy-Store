export const formatPrice = (number) => {
	return new Intl.NumberFormat("en-US", {
		style: "currency",
		currency: "USD",
	}).format(number / 100);
};

export const getUniqueValues = (data, type) => {
	return [
		"all",
		...new Set(
			data
				.map((item) => {
					return item[type];
				})
				.flat()
		),
	];
};
