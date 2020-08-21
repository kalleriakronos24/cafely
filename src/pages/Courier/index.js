import React, { useState, useEffect, useRef, forwardRef } from 'react';
import {
	View,
	Image,
	TouchableOpacity,
	Dimensions,
	Text,
	ScrollView,
	TouchableHighlight,
	StatusBar
} from 'react-native';
import MapView, { MarkerAnimated, AnimatedRegion } from 'react-native-maps';
import MapViewDirections from 'react-native-maps-directions';
import Geocoder from 'react-native-geocoding';
import { Icon } from 'react-native-elements';
import { useDispatch } from 'react-redux';
Geocoder.init('AIzaSyCbpEHfzwBGfdSIfbFCODyH_muffddTZvg');
import { useCombinedRefs } from '../../config/utils/combined_ref';
import { Modalize } from 'react-native-modalize';
import { DirectMessage } from '../Direct/List';
import AsyncStorage from '@react-native-community/async-storage';

const CourierListModal = forwardRef((_, ref) => {
	const modalRef = useRef(null);
	const combinedRef = useCombinedRefs(ref, modalRef);
	const contentRef = useRef(null);
	const handleClose = () => {
		if (combinedRef.current) {
			combinedRef.current.close();
		}
	};
	const Header = () => {
		return (
			<View
				style={{ paddingVertical: 15, marginHorizontal: 15, borderBottomColor: '#eee', borderBottomWidth: 1 }}
			>
				<Text style={{ fontSize: 18, fontWeight: '200' }}>2 Available Courier</Text>
			</View>
		);
	};
	const modalContent = () => {
		return (
			<ScrollView style={{ padding: 16, flex: 1 }}>
				<DirectMessage navigation={_.navigation} data={_.data} />
			</ScrollView>
		);
	};
	const check = true;
	return (
		<Modalize alwaysOpen={300} handlePosition={'inside'} HeaderComponent={Header} ref={combinedRef}>
			{modalContent()}
		</Modalize>
	);
});

export let Courier = ({ navigation, route }) => {
	const modals = Array.from({ length: 1 }).map((_) => useRef(null).current);
	const order_list = false;
	const { width, height } = Dimensions.get('window');
	const { data, d } = route.params;
	const destination = { latitude: -0.49821, longitude: 117.156735 };
	const coordinate = [
		{
			latitude  : -0.500376,
			longitude : 117.158409
		},
		{
			latitude  : -0.49821,
			longitude : 117.156735
		}
	];
	const GOOGLE_MAPS_APIKEY = 'AIzaSyCbpEHfzwBGfdSIfbFCODyH_muffddTZvg';
	const statusBarHeight = StatusBar.currentHeight;
	const dispatch = useDispatch();
	let [
		activeOrders,
		setActiveOrders
	] = useState([]);
	let mapRef = useRef(null);
	useEffect(() => {
		dispatch({ type: 'RESET_CART_ITEMS' });
		dispatch({ type: 'RESET' });
		console.log('mounted!, cart items was deleted');
	}, []);
	const origin = {
		latitude  : -0.500376,
		longitude : 117.158409
	};

	const mapFitToCoordinates = () => {
		return mapRef.fitToSuppliedMarkers(
			[
				'penerima',
				'mk1'
			],
			{
				edgePadding : {
					top    : 150,
					right  : 150,
					left   : 150,
					bottom : 150
				}
			}
		);
	};
	return order_list ? null : (
		<View style={{ flex: 1, backgroundColor: 'white', paddingTop: statusBarHeight }}>
			<View style={{ flex: 1, position: 'relative' }}>
				<View
					style={{
						position : 'absolute',
						zIndex   : 10,
						padding  : 16
					}}
				>
					<TouchableHighlight
						underlayColor='#424D51'
						onPress={() => navigation.goBack()}
						style={{
							padding         : 5,
							height          : 45,
							width           : 45,
							borderRadius    : 30,
							backgroundColor : 'black',
							opacity         : 0.7,
							justifyContent  : 'center',
							alignItems      : 'center'
						}}
					>
						<View style={{ zIndex: 10 }}>
							<Icon name='md-arrow-round-back' size={25} color='white' type='ionicon' />
						</View>
					</TouchableHighlight>
				</View>

				<MapView
					ref={(ref) => (mapRef = ref)}
					onLayout={() => mapFitToCoordinates()}
					style={{ height: height - 300 }}
					initialRegion={{
						latitude       : data.buyer_coords.latitude,
						longitude      : data.buyer_coords.longitude,
						longitudeDelta : 0.005,
						latitudeDelta  : 0.005
					}}
					zoomEnabled={true}
					cacheEnabled={true}
					loadingEnabled={true}
				>
					<MapView.Marker
						identifier={'mk1'}
						title='Pengirim'
						key={1}
						description='Lokasi Pengirim'
						coordinate={{
							latitude  : d[Object.keys(d)].warung_info.coords.latitude,
							longitude : d[Object.keys(d)].warung_info.coords.longitude
						}}
					>
						<View style={{ padding: 16, flexDirection: 'column', zIndex: 10 }}>
							<Text style={{ fontSize: 23 }}>{d[Object.keys(d)].warung_info.name} </Text>
							<View style={{ padding: 3 }}>
								<Icon name='ios-pin' color='red' type='ionicon' size={40} />
							</View>
						</View>
					</MapView.Marker>
					<MapView.Marker
						identifier='penerima'
						title='Penerima'
						description='Lokasi Penerima'
						coordinate={{ latitude: data.buyer_coords.latitude, longitude: data.buyer_coords.longitude }}
						key={1}
					>
						<View style={{ padding: 16, flexDirection: 'column', zIndex: 10 }}>
							<Text style={{ fontSize: 23 }}>Penerima </Text>
							<View style={{ padding: 3 }}>
								<Icon name='ios-pin' color='red' type='ionicon' size={40} />
							</View>
						</View>
					</MapView.Marker>
				</MapView>
			</View>
			<CourierListModal ref={(el) => (modals[0] = el)} navigation={navigation} data={d} />
		</View>
	);
};
