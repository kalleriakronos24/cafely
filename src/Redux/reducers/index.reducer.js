import { combineReducers } from 'redux';
import { cartItems, cartCount } from './cart.reducer.js';
import loginToken from './token';
import orderItems from './cart';

const Root = combineReducers({
	CART_ITEMS  : cartItems,
	CART_COUNT  : cartCount,
	token       : loginToken,
	order_items : orderItems
});

export default Root;
