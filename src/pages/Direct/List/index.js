import React from 'react';
import { View, Text, ScrollView, TextInput, TouchableOpacity, ToastAndroid, Dimensions } from 'react-native';
import { Icon, Image } from 'react-native-elements';

export const DirectMessage = ({ navigation }) => {
	const { width, height } = Dimensions.get('window');
	return (
		<View style={{ flex: 1, backgroundColor: 'white' }}>
			<ScrollView style={{ flex: 1 }}>
				<View style={{ padding: 16 }}>
					<TouchableOpacity
						activeOpacity={0.5}
						onPress={() =>
							ToastAndroid.showWithGravity(
								'FItur Belum Tersedia',
								ToastAndroid.SHORT,
								ToastAndroid.BOTTOM,
								25,
								50
							)}
						style={{ padding: 4, flex: 1 }}
					>
						<View
							style={{
								paddingHorizontal : 16,
								height            : 39,
								flexDirection     : 'row',
								alignItems        : 'center',
								borderColor       : '#C0C0C0',
								borderWidth       : 1.3,
								borderRadius      : 10
							}}
						>
							<Icon name='ios-search' type='ionicon' color='#C0C0C0' />
							<Text
								style={{
									color         : '#C0C0C0',
									fontWeight    : '800',
									fontSize      : 18,
									textTransform : 'capitalize',
									marginLeft    : 5
								}}
							>
								Search
							</Text>
						</View>
					</TouchableOpacity>
				</View>
				<View style={{ flex: 1, padding: 15 }}>
					<View>
						<Text>Message</Text>
					</View>
				</View>
				<View style={{ padding: 15 }}>
					<View
						style={{
							flexDirection  : 'row',
							justifyContent : 'space-between',
							flex           : 1
						}}
					>
						<View
							style={{
								height       : 60,
								width        : 60,
								borderRadius : 30,
								overflow     : 'hidden',
								borderColor  : '#43B581',
								borderWidth  : 2
							}}
						>
							<Image
								style={{
									height    : '100%',
									width     : '100%',
									alignSelf : 'stretch'
								}}
								source={require('../../../../assets/banner/q3.png')}
							/>
						</View>
						<View
							style={{
								justifyContent : 'center',
								paddingLeft    : 15,
								flexDirection  : 'column'
							}}
						>
							<View style={{ marginBottom: 6 }}>
								<Text style={{ fontSize: 17, textTransform: 'capitalize' }}>si udin</Text>
							</View>
							<View
								style={{
									marginLeft     : 5,
									flexDirection  : 'row',
									justifyContent : 'center',
									alignItems     : 'center'
								}}
							>
								<Text style={{ fontSize: 14, color: '#43B581' }}>Active</Text>
								<Text style={{ marginHorizontal: 7, fontWeight: 'bold', color: '#43B581' }}>
									&#5867;
								</Text>
								<Text style={{ color: '#8c8c8c' }}>
									{'Warung Makan Bu Udin 2qqqqqqqqqqqasdasdasd'.length > 21 ? (
										'Warung Makan Bu Udin 2' + '...'
									) : (
										'Warung Makan Bu Udin 2'
									)}
								</Text>
							</View>
						</View>
						<View
							style={{
								flexDirection  : 'row',
								flex           : 1,
								justifyContent : 'center',
								alignItems     : 'center',
								marginLeft     : 15
							}}
						>
							<View
								style={{
									padding         : 6,
									backgroundColor : 'black',
									borderRadius    : 37 / 2,
									height          : 37,
									width           : 37,
									marginLeft      : 6,
									justifyContent  : 'center',
									alignItems      : 'center'
								}}
							>
								<Icon name='ios-call' color='white' size={20} type='ionicon' />
							</View>
							<TouchableOpacity
								activeOpacity={0.5}
								onPress={() => navigation.navigate('DirectChat')}
								style={{
									padding         : 6,
									backgroundColor : 'black',
									borderRadius    : 37 / 2,
									height          : 37,
									width           : 37,
									marginLeft      : 6,
									justifyContent  : 'center',
									alignItems      : 'center',
									flexDirection   : 'row'
								}}
							>
								<Icon name='ios-chatboxes' color='white' size={20} type='ionicon' />
							</TouchableOpacity>
						</View>
					</View>
				</View>
				<View style={{ padding: 15 }}>
					<View
						style={{
							flexDirection  : 'row',
							flex           : 1,
							justifyContent : 'space-between'
						}}
					>
						<View
							style={{
								height       : 60,
								width        : 60,
								borderRadius : 30,
								overflow     : 'hidden',
								borderColor  : '#43B581',
								borderWidth  : 2
							}}
						>
							<Image
								style={{
									height    : '100%',
									width     : '100%',
									alignSelf : 'stretch'
								}}
								source={require('../../../../assets/banner/q3.png')}
							/>
						</View>
						<View
							style={{
								justifyContent : 'center',
								paddingLeft    : 15,
								flexDirection  : 'column'
							}}
						>
							<View style={{ marginBottom: 6 }}>
								<Text style={{ fontSize: 17, textTransform: 'capitalize' }}>pp</Text>
							</View>
							<View
								style={{
									marginLeft     : 5,
									flexDirection  : 'row',
									justifyContent : 'center',
									alignItems     : 'center'
								}}
							>
								<Text style={{ fontSize: 14, color: '#43B581' }}>Active</Text>
								<Text style={{ marginHorizontal: 7, fontWeight: 'bold', color: '#43B581' }}>
									&#5867;
								</Text>
								<Text style={{ color: '#8c8c8c' }} ellipsizeMode={'tail'} numberOfLines={1}>
									{'Warung Makan Prapatanasdasdasdasdasd'.length > 21 ? (
										'Warung Makan Prapatan'.slice(0, 21) + '...'
									) : (
										'Warung Makan Prapatan'
									)}
								</Text>
							</View>
						</View>
						<View
							style={{
								flexDirection  : 'row',
								flex           : 1,
								justifyContent : 'center',
								alignItems     : 'center',
								marginLeft     : 15
							}}
						>
							<View
								style={{
									padding         : 6,
									backgroundColor : 'black',
									borderRadius    : 37 / 2,
									height          : 37,
									width           : 37,
									marginLeft      : 6,
									justifyContent  : 'center',
									alignItems      : 'center'
								}}
							>
								<Icon name='ios-call' color='white' size={20} type='ionicon' />
							</View>
							<TouchableOpacity
								activeOpacity={0.5}
								onPress={() => navigation.navigate('DirectChat')}
								style={{
									padding         : 6,
									backgroundColor : 'black',
									borderRadius    : 37 / 2,
									height          : 37,
									width           : 37,
									marginLeft      : 6,
									justifyContent  : 'center',
									alignItems      : 'center',
									flexDirection   : 'row'
								}}
							>
								<Icon name='ios-chatboxes' color='white' size={20} type='ionicon' />
							</TouchableOpacity>
						</View>
					</View>
				</View>
				<View style={{ paddingHorizontal: 20, paddingVertical: 9, flex: 1 }}>
					<View style={{ borderColor: '#C0C0C0', borderWidth: 0.7 }} />
					<Text style={{ textAlign: 'center', marginTop: 5, color: '#C0C0C0' }}>Available Courier</Text>
				</View>
				<View style={{ flex: 1, marginTop: 7 }}>
					<Text style={{ letterSpacing: 0.7, fontWeight: 'bold', fontSize: 19 }}>Detail Information</Text>
					<View style={{ padding: 6, flex: 1, marginTop: 10 }}>
						<View style={{ paddingLeft: 6, flexDirection: 'row', justifyContent: 'space-between' }}>
							<View style={{ marginHorizontal: 6, justifyContent: 'center' }}>
								<Text style={{ fontSize: 17, fontWeight: '600' }}>Si Udin</Text>
								<Text style={{ marginTop: 10, fontSize: 17, fontWeight: '600' }}>
									Courier of : Warung Makan Bu Udin 3
								</Text>
								<Text style={{ marginTop: 10, fontSize: 17, fontWeight: '600' }}>
									Status : Delivering
								</Text>
							</View>
							<View>
								<View
									style={{
										height       : 100,
										width        : 100,
										borderRadius : 50,
										overflow     : 'hidden',
										borderColor  : '#43B581',
										borderWidth  : 2
									}}
								>
									<Image
										style={{
											height    : '100%',
											width     : '100%',
											alignSelf : 'stretch'
										}}
										source={require('../../../../assets/banner/q3.png')}
									/>
								</View>
							</View>
						</View>
						<View style={{ marginTop: 10, paddingHorizontal: 6, flexDirection: 'row' }}>
							<View
								style={{
									padding        : 6,
									justifyContent : 'center',
									alignItems     : 'center',
									borderRadius   : 4,
									borderWidth    : 0.5,
									borderColor    : 'blue',
									width          : width / 3 - 6 - 6 * 2
								}}
							>
								<Text>Your Order Items</Text>
							</View>
							<View
								style={{
									padding        : 6,
									justifyContent : 'center',
									alignItems     : 'center',
									borderRadius   : 4,
									borderWidth    : 0.5,
									borderColor    : '#8c8c8c',
									width          : width / 3 - 6 - 6 * 2
								}}
							>
								<Text style={{ color: '#8c8c8c' }}>Warung Info</Text>
							</View>
							<View
								style={{
									padding        : 6,
									justifyContent : 'center',
									alignItems     : 'center',
									borderRadius   : 4,
									borderWidth    : 0.5,
									borderColor    : '#8c8c8c',
									width          : width / 3 - 6 - 6 * 2
								}}
							>
								<Text style={{ color: '#8c8c8c' }}>Courier Info</Text>
							</View>
						</View>
						<View style={{ marginTop: 5, paddingHorizontal: 6, flex: 1, flexDirection: 'row' }}>
							<View
								style={{
									padding        : 6,
									justifyContent : 'center',
									alignItems     : 'center',
									width          : width / 3 - 6 - 6 * 2
								}}
							>
								<Icon name='ios-arrow-down' color='blue' type='ionicon' />
							</View>
							{true ? null : (
								<View
									style={{
										padding        : 6,
										justifyContent : 'center',
										alignItems     : 'center',
										width          : width / 3 - 6 - 6 * 2
									}}
								>
									<Icon name='ios-arrow-down' type='ionicon' />
								</View>
							)}
							{true ? null : (
								<View
									style={{
										padding        : 6,
										justifyContent : 'center',
										alignItems     : 'center',
										width          : width / 3 - 6 - 6 * 2
									}}
								>
									<Icon name='ios-arrow-down' type='ionicon' />
								</View>
							)}
						</View>
						<View style={{ marginTop: 5, paddingHorizontal: 6, flex: 1 }}>
							<View style={{ padding: 6, borderWidth: 0.5, borderColor: 'blue', borderRadius: 4 }}>
								<Text style={{ fontSize: 15, letterSpacing: 0.7, fontWeight: '600' }}>
									Your orders from Warung Makan Bu UDIN 3 :
								</Text>
								<View style={{ paddingVertical: 5, paddingHorizontal: 6 }}>
									<View style={{ paddingVertical: 5 }}>
										<Text style={{ fontSize: 13 }}>qwe 1 ea</Text>
									</View>
									<View style={{ paddingVertical: 5 }}>
										<Text style={{ fontSize: 13 }}>qwe 1 ea</Text>
									</View>
									<View style={{ paddingVertical: 5 }}>
										<Text style={{ fontSize: 13 }}>qwe 1 ea</Text>
									</View>
								</View>
								<Text style={{ marginTop: 5 }}>Deliver Fee : Rp.2500,-</Text>
								<View style={{ flex: 1, marginTop: 5 }}>
									<View style={{ flexDirection: 'row', alignItems: 'center' }}>
										<Text>Total Payment : </Text>
										<Text style={{ fontWeight: 'bold' }}>Rp.10000,-</Text>
										<Text style={{ fontSize: 11, marginLeft: 5 }}> *sudah termasuk ongkir</Text>
									</View>
									<Text style={{ marginTop: 5 }}>Payment VIA : COD / Bayar Ditempat</Text>
								</View>
							</View>
						</View>
					</View>
				</View>
			</ScrollView>
		</View>
	);
};
