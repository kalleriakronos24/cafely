import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { useSelector } from 'react-redux';

const CartButton = (props) => {
	const count = useSelector((state) => state.CART_COUNT);
	return (
		<View style={{ padding: 16 }}>
			<TouchableOpacity
				disabled={count > 0 ? false : true}
				onPress={() => props.navigation.navigate('Checkout')}
				style={{
					width          : 40,
					alignItems     : 'center',
					flexDirection  : 'row',
					justifyContent : 'space-between'
				}}
			>
				<Text>{count}</Text>
				<Image
					style={{
						height : 30,
						width  : 30
					}}
					source={require('../../../assets/icon/shop_bag.png')}
				/>
			</TouchableOpacity>
		</View>
	);
};

export default CartButton;
