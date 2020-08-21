import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, Text, Image, TouchableOpacity, Dimensions } from 'react-native';

export class Vouchers extends Component {
	static propTypes = {};

	render () {
		let { width, height } = Dimensions.get('window');
		return (
			<View>
				<View style={{ padding: 16 }}>
					<Text style={{ fontSize: width < 410 ? 19 : 24, fontWeight: 'bold', marginBottom: 20 }}>
						Vouchers
					</Text>
					<View
						style={{
							position          : 'relative',
							paddingBottom     : 20,
							borderBottomColor : '#2296F3',
							borderBottomWidth : 1
						}}
					>
						<Image
							style={{ borderRadius: 4, alignSelf: 'stretch', width: '100%', flex: 1, height: 200 }}
							source={require('../../../assets/banner/q3.png')}
						/>
						<View
							style={{
								width           : '100%',
								height          : '100%',
								position        : 'absolute',
								top             : 0,
								left            : 0,
								backgroundColor : 'black',
								opacity         : 0.2
							}}
						/>
						<View
							style={{
								paddingBottom     : 38,
								position          : 'absolute',
								bottom            : 0,
								left              : 0,
								width             : '100%',
								flexDirection     : 'row',
								alignItems        : 'center',
								justifyContent    : 'center',
								paddingHorizontal : 16
							}}
						>
							<View>
								<Text
									style={{
										color        : 'white',
										fontSize     : width < 410 ? 17 : 20,
										fontWeight   : 'bold',
										marginBottom : 6
									}}
								>
									Free test Voucher
								</Text>
								<Text style={{ color: 'white', fontSize: width < 410 ? 12 : 15 }}>
									Dapatkan Kupon ini Sekarang juga
								</Text>
							</View>
							<View style={{ flex: 1, paddingLeft: 12 }}>
								<TouchableOpacity
									style={{
										backgroundColor   : '#2296F3',
										borderRadius      : 4,
										paddingHorizontal : 12,
										paddingVertical   : 11,
										alignSelf         : 'stretch',
										alignItems        : 'center',
										justifyContent    : 'center'
									}}
								>
									<Text style={{ fontSize: width < 410 ? 10 : 14, color: 'white' }}>GET VOUCHER</Text>
								</TouchableOpacity>
							</View>
						</View>
					</View>
				</View>

				<View style={{ padding: 16 }}>
					<View
						style={{
							position          : 'relative',
							paddingBottom     : 20,
							borderBottomColor : '#2296F3',
							borderBottomWidth : 1
						}}
					>
						<Image
							style={{ borderRadius: 4, alignSelf: 'stretch', width: '100%', flex: 1, height: 200 }}
							source={require('../../../assets/banner/q3.png')}
						/>
						<View
							style={{
								width           : '100%',
								height          : '100%',
								position        : 'absolute',
								top             : 0,
								left            : 0,
								backgroundColor : 'black',
								opacity         : 0.2
							}}
						/>
						<View
							style={{
								paddingBottom     : 38,
								position          : 'absolute',
								bottom            : 0,
								left              : 0,
								width             : '100%',
								flexDirection     : 'row',
								alignItems        : 'center',
								justifyContent    : 'center',
								paddingHorizontal : 16
							}}
						>
							<View>
								<Text
									style={{
										color        : 'white',
										fontSize     : width < 410 ? 17 : 20,
										fontWeight   : 'bold',
										marginBottom : 6
									}}
								>
									Free test Voucher
								</Text>
								<Text style={{ color: 'white', fontSize: width < 410 ? 12 : 15 }}>
									Dapatkan Kupon ini Sekarang juga
								</Text>
							</View>
							<View style={{ flex: 1, paddingLeft: 12 }}>
								<TouchableOpacity
									style={{
										backgroundColor   : '#2296F3',
										borderRadius      : 4,
										paddingHorizontal : 12,
										paddingVertical   : 11,
										alignSelf         : 'stretch',
										alignItems        : 'center',
										justifyContent    : 'center'
									}}
								>
									<Text style={{ fontSize: width < 410 ? 10 : 14, color: 'white' }}>GET VOUCHER</Text>
								</TouchableOpacity>
							</View>
						</View>
					</View>
				</View>
			</View>
		);
	}
}

export default Vouchers;
