import React, { Component } from 'react';
import { View, TextInput, Image, Text } from 'react-native';
import { TouchableWithoutFeedback, TouchableOpacity } from 'react-native-gesture-handler';
import { Icon } from 'react-native-elements';
class SearchPanel extends Component {
	constructor (props) {
		super(props);
	}
	render () {
		const path =
			this.props.right_icon == 'order'
				? require('../../../assets/icon/shop_bag.png')
				: require('../../../assets/icon/promot.png');
		const s = {
			height      : 34,
			width       : 34,
			marginRight : 5,
			marginTop   : 3
		};
		const s_n = {
			height : 30,
			width  : 30
		};
		const r = this.props.isOrder ? s_n : s;
		const { order_count } = this.props;
		const qq = this.props.isOrder ? 'black' : 'white';
		return (
			<View style={{ marginHorizontal: 17, paddingTop: 15, flexDirection: 'row' }}>
				{this.props.back_btn ? (
					<TouchableOpacity
						onPress={() => this.props.navigation.goBack()}
						style={{ width: 40, alignItems: 'center', marginTop: 5, marginRight: 10 }}
					>
						<Image style={{ width: 30, height: 30 }} source={require('../../../assets/icon/arrow_l.png')} />
					</TouchableOpacity>
				) : null}

				<View style={{ position: 'relative', flex: 1 }}>
					{/* <Image style={{ width: 30, height: 30, top: 5, left: 12 }} source={require('../../../assets/icon/arrow_l.png')}/> */}
					<TextInput
						placeholderTextColor={qq}
						selectTextOnFocus
						style={{
							paddingLeft  : 45,
							paddingRight : 20,
							borderColor  : 'black',
							borderWidth  : 1,
							height       : 40,
							fontSize     : 14,
							marginRight  : 18,
							color        : 'white'
						}}
						placeholder='Find something here...'
					/>
					{this.props.search_icon ? (
						<Image
							style={{ position: 'absolute', top: 5, left: 8, height: 27, width: 27 }}
							source={require('../../../assets/icon/123.png')}
						/>
					) : null}
				</View>
				<TouchableOpacity
					disabled={order_count > 0 ? false : true}
					onPress={() => this.props.navigation.navigate('Checkout')}
					style={{ width: 40, alignItems: 'center', flexDirection: 'row', justifyContent: 'space-between' }}
				>
					<Text>{this.props.order_count}</Text>

					{/* <Icon
 name='ios-cart'
type='ionicon'
 style={r}
 /> */}
					<Image style={r} source={path} />
				</TouchableOpacity>
			</View>
		);
	}
}

export default SearchPanel;
