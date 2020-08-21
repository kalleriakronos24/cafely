import React from 'react';
import { View, Text, StatusBar, TouchableOpacity, Dimensions, Image, ActivityIndicator } from 'react-native';
import { Icon } from 'react-native-elements';
const Loader = () => {
	return (
		<View style={{ padding: 16, justifyContent: 'center', alignItems: 'center' }}>
			<ActivityIndicator size={'large'} color='blue' style={{ height: 50, width: 50 }} />
		</View>
	);
};
export const Search = ({ navigation }) => {
	const barHeight = StatusBar.currentHeight;
	const { width } = Dimensions.get('window');
	const empty = true;
	return (
		<View style={{ flex: 1, backgroundColor: 'white', paddingTop: barHeight }}>
			<View style={{ position: 'relative', height: 70 }}>
				<View
					style={{
						paddingHorizontal : 5,
						flexDirection     : 'row',
						alignItems        : 'center',
						zIndex            : 10
					}}
				>
					<TouchableOpacity
						activeOpacity={0.5}
						onPress={() => navigation.goBack()}
						style={{
							height         : 50,
							width          : 40,
							padding        : 5,
							marginTop      : 10,
							marginRight    : 10,
							justifyContent : 'center',
							alignItems     : 'center'
						}}
					>
						<Icon name='md-arrow-round-back' size={30} type='ionicon' color='black' />
					</TouchableOpacity>
					<TouchableOpacity
						style={{
							flexDirection   : 'row',
							borderWidth     : 0.6,
							backgroundColor : 'white',
							alignItems      : 'center',
							marginTop       : 10,
							padding         : 5,
							height          : 40,
							borderRadius    : 10,
							width           : width - 50 - 10 * 2
						}}
					>
						<Icon name='ios-search' type='ionicon' />
						<Text style={{ color: 'black', opacity: 0.5, marginLeft: 5 }}>Cari Nasi Kuning ... </Text>
					</TouchableOpacity>
				</View>
			</View>
			<View style={{ borderBottomColor: 'blue', borderBottomWidth: 0.7 }} />
			<View style={{ padding: 16 }}>
				<View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
					<Text style={{ fontSize: 17 }}>Recent Searches</Text>
					<Text style={{ fontSize: 15 }}>Edit</Text>
				</View>
			</View>
			<View style={{ borderBottomColor: 'black', borderBottomWidth: 0.7 }} />
			<View style={{ padding: 16 }}>
				{0 === 0 ? (
					<View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
						<Text>-</Text>
						<View style={{ paddingHorizontal: 10 }}>
							<Text> No Search History Found </Text>
						</View>
						<Text>-</Text>
					</View>
				) : (
					<View style={{ padding: 5, flexDirection: 'row', alignItems: 'center' }}>
						<View style={{ height: 40, width: 40, borderRadius: 20 }}>
							<Image
								style={{ height: 40, width: 40, resizeMode: 'cover', borderRadius: 20 }}
								source={require('../../../assets/banner/q3.png')}
							/>
						</View>
						<Text style={{ marginLeft: 20, fontSize: 17, fontWeight: '300', letterSpacing: 0.7 }}>
							Nasi Ppga
						</Text>
					</View>
				)}
			</View>
		</View>
	);
};
