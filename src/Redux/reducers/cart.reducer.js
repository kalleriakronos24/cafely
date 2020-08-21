const initialState = {
	text        : '',
	ongkir      : 2500,
	CART_ITEMS  : [],
	CART_COUNT  : 0,
	MENU_LIST   : [],
	VIEW_SINGLE : {},
	modal_mail  : false,
	pos         : 0,
	distance    : 0,
	warung_name : 'Warung',
	user        : {},
	testo       : []
};

export const credentials = (state = 0, action) => {
	return null;
};
export const cartCount = (state = 0, action) => {
	switch (action.type) {
		case 'ADD':
			return state + 1;
		case 'DEC':
			return state - 1;
		case 'RESET':
			return (state = 0);
		default:
			return state;
	}
};
export const cartItems = (state = initialState, action) => {
	switch (action.type) {
		case 'RESET_CART_ITEMS':
			return {
				...state,
				CART_ITEMS : [],
				CART_COUNT : 0
			};
		case 'modal_new_mail':
			return {
				...state,
				modal_mail : action.status
			};
		case 'save_pos':
			return {
				...state,
				pos      : action.pos,
				distance : action.distance
			};
		case 'WARUNG_NAME':
			return {
				...state,
				warung_name : action.name
			};
		case 'ADD_CART_ITEMS':
			return {
				...state,
				CART_ITEMS : [
					...state.CART_ITEMS,
					action.payload.val
				]
			};
		case 'ADD_TO_CART':
			var wrg_name = action.warung_name;
			var data = action.data;
			return {
				...state,
				testo : [
					...state.testo,
					{
						[wrg_name] : [
							data
						]
					}
				]
			};
		case 'VIEW_SINGLE':
			let q = action.payload;
			return {
				...state,
				VIEW_SINGLE : {
					q
				}
			};
		case 'UPDATE_SINGLE_CART_SAMBEL':
			return {
				...state,
				CART_ITEMS : state.CART_ITEMS.map(
					(value, i) =>
						value.id === action.id
							? {
									...value,
									tambahan_lainnya : {
										...value.tambahan_lainnya,
										sambel : !value.tambahan_lainnya.sambel
									}
								}
							: value
				)
			};
		case 'UPDATE_SINGLE_CART_SERONDENG':
			return {
				...state,
				CART_ITEMS : state.CART_ITEMS.map(
					(value, i) =>
						value.id === action.id
							? {
									...value,
									tambahan_lainnya : {
										...value.tambahan_lainnya,
										serondeng : !value.tambahan_lainnya.serondeng
									}
								}
							: value
				)
			};
		case 'UPDATE_SINGLE_CART_TEMPE':
			return {
				...state,
				CART_ITEMS : state.CART_ITEMS.map(
					(value, i) =>
						value.id === action.id
							? {
									...value,
									tambahan_lainnya : {
										...value.tambahan_lainnya,
										tempe : !value.tambahan_lainnya.tempe
									}
								}
							: value
				)
			};
		case 'UPDATE_SAMBEL':
			return {
				...state,
				VIEW_SINGLE : {
					...state.VIEW_SINGLE,
					q : {
						...state.VIEW_SINGLE.q,
						val : {
							...state.VIEW_SINGLE.q.val,
							tambahan_lainnya : {
								...state.VIEW_SINGLE.q.val.tambahan_lainnya,
								sambel : !state.VIEW_SINGLE.q.val.tambahan_lainnya.sambel
							}
						}
					}
				}
			};
		case 'UPDATE_SERONDENG':
			return {
				...state,
				VIEW_SINGLE : {
					...state.VIEW_SINGLE,
					q : {
						...state.VIEW_SINGLE.q,
						val : {
							...state.VIEW_SINGLE.q.val,
							tambahan_lainnya : {
								...state.VIEW_SINGLE.q.val.tambahan_lainnya,
								serondeng : !state.VIEW_SINGLE.q.val.tambahan_lainnya.serondeng
							}
						}
					}
				}
			};
		case 'UPDATE_TEMPE':
			return {
				...state,
				VIEW_SINGLE : {
					...state.VIEW_SINGLE,
					q : {
						...state.VIEW_SINGLE.q,
						val : {
							...state.VIEW_SINGLE.q.val,
							tambahan_lainnya : {
								...state.VIEW_SINGLE.q.val.tambahan_lainnya,
								tempe : !state.VIEW_SINGLE.q.val.tambahan_lainnya.tempe
							}
						}
					}
				}
			};
		case 'FETCH':
			return {
				...state,
				MENU_LIST : action.payload.menu_list
			};
		case 'FETCH_SINGLE':
			return state;
		case 'ADD_MENU_LIST':
			return {
				...state,
				MENU_LIST : state.MENU_LIST.concat(action.payload.l)
			};
		case 'EDIT_STATUS_VIEW_SINGLE_TO_FALSE':
			return {
				...state,
				VIEW_SINGLE : {
					...state.VIEW_SINGLE,
					q : {
						...state.VIEW_SINGLE.q,
						val : {
							...state.VIEW_SINGLE.q.val,
							deleted_from_cart : false,
							qty               : 1,
							total             : state.VIEW_SINGLE.q.val.price_ea
						}
					}
				}
			};
		case 'EDIT_STATUS_VIEW_SINGLE_TO_TRUE':
			return {
				...state,
				VIEW_SINGLE : {
					...state.VIEW_SINGLE,
					q : {
						...state.VIEW_SINGLE.q,
						val : {
							...state.VIEW_SINGLE.q.val,
							deleted_from_cart : true,
							qty               : action.qty,
							total             : action.total
						}
					}
				}
			};
		case 'VIEW_SINGLE_REMOVE_CART':
			return {
				...state,
				VIEW_SINGLE : {
					...state.VIEW_SINGLE,
					q : {
						...state.VIEW_SINGLE.q,
						val : {
							...state.VIEW_SINGLE.q.val,
							deleted_from_cart : false
						}
					}
				}
			};
		case 'VIEW_SINGLE_DEFAULT_VALUE':
			return {
				...state,
				VIEW_SINGLE : {
					...state.VIEW_SINGLE,
					q : {
						...state.VIEW_SINGLE.q,
						val : {
							...state.VIEW_SINGLE.q.val,
							qty   : 1,
							total : state.VIEW_SINGLE.q.val.price_ea
						}
					}
				}
			};
		case 'EDIT_STATUS_MENU_LIST_TO_FALSE':
			return {
				...state,
				MENU_LIST : state.MENU_LIST.map(
					(value, i) => (value.id === action.id ? { ...value, deleted_from_cart: false } : value)
				)
			};
		case 'EDIT_STATUS_MENU_LIST_TO_TRUE':
			return {
				...state,
				MENU_LIST : state.MENU_LIST.map(
					(value, i) => (value.id === action.id ? { ...value, deleted_from_cart: true } : value)
				)
			};
		case 'EDIT_VALUE_TO_DEFAULT':
			return {
				...state,
				MENU_LIST : state.MENU_LIST.map(
					(value, i) => (value.id === action.id ? { ...value, qty: 1, total: value.price_ea } : value)
				)
			};
		case 'EDIT_VALUE_TO_MINIM':
			return {
				...state,
				MENU_LIST : state.MENU_LIST.map(
					(value, i) => (value.id === action.id ? { ...value, qty: action.qty, total: action.total } : value)
				)
			};
		case 'CHANGE_PRICE_BY_QTY':
			return {
				...state,
				CART_ITEMS : state.CART_ITEMS.map(
					(value, i) =>
						value.id === action.id
							? { ...value, qty: action.qty, total: value.price_ea * action.qty }
							: value
				)
			};
		case 'CHANGE_PRICE_BY_QTY_MENU':
			return {
				...state,
				MENU_LIST : state.MENU_LIST.map(
					(value, i) =>
						value.id === action.id
							? { ...value, qty: action.qty, total: value.price_ea * action.qty }
							: value
				)
			};
		case 'FETCH_ALL':
			return state;
		case 'REMOVE':
			return {
				...state,
				CART_ITEMS : state.CART_ITEMS.filter((v, i) => action.id !== v.id)
			};
		default:
			return state;
	}
};
