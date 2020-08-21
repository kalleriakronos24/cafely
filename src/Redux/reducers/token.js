const intialState = {
	test  : '',
	token : null
};
const loginToken = (state = intialState, action) => {
	switch (action.type) {
		case 'REFRESH_TOKEN':
			return {
				...state,
				token : action.token
			};
		case 'LOGOUT':
			return {
				...state,
				token : null
			};
		default:
			return state;
	}
};

export default loginToken;
