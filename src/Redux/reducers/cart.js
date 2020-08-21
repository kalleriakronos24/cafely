const init = {
	order_items : []
};

const orderItems = (state = init, action) => {
	switch (action.type) {
		case 'add':
			return {
				...state,
				order_items : [
					...state.order_items,
					action.data
				]
			};
		case 'add_order':
			return {
				...state,
				order_items : state.order_items.map((v, i) => {
					if (v[Object.keys(v)].warung_info.name === action.wr) {
						console.log('is this true?');
						v[Object.keys(v)].order_items = [
							...v[Object.keys(v)].order_items,
							action.order
						];
					}
					console.log('falsu');
					return v;
				})
			};
		case 'remove_order':
			return {
				...state,
				order_items : state.order_items.map((v, i) => {
					if (v[Object.keys(v)].warung_info.name === action.name) {
						console.log(v[Object.keys(v)].order_items.map((x, y) => x.id !== action.id));
						v[Object.keys(v)].order_items = v[Object.keys(v)].order_items.filter(
							(x, y) => x.id !== action.id
						);
					}
					return v;
				})
			};
		case 'remove':
			return {
				...state,
				order_items : state.order_items.filter((v, i) => v[Object.keys(v)].warung_info.name !== action.name)
			};
		default:
			return state;
	}
};

export default orderItems;
