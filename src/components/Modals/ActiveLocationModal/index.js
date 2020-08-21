import React, { useEffect, forwardRef, useRef } from 'react';
import { View, Text, Image } from 'react-native';
import * as geolib from 'geolib';
import Geolocation from '@react-native-community/geolocation';
import RNAndroidLocationEnabler from 'react-native-android-location-enabler';
import Geocoder from 'react-native-geocoding';
import { useCombinedRefs } from '../../config/utils/combined_ref';
import { Modalize } from 'react-native-modalize';
Geocoder.init('AIzaSyCbpEHfzwBGfdSIfbFCODyH_muffddTZvg');
var global_props;
var location_service;
var ok_button;

const EnableLocationModal = forwardRef((_, ref) => {
	const modalRef = useRef(null);
	const combinedRef = useCombinedRefs(ref, modalRef);
	const [
		toggle,
		setToggle
	] = useState(false);

	const handleClose = () => {
		if (combinedRef.current) {
			combinedRef.current.close();
		}
	};
	useEffect(() => {});

	const modalContent = () => {
		const GetCurrentLocation = (e) => {
			RNAndroidLocationEnabler.promptForEnableLocationIfNeeded({ interval: 10000, fastInterval: 5000 })
				.then((data) => {
					console.log(data);
					if (data === 'already-enabled') {
						return;
					}
					else {
						setToggle(true);
						_.refresh_state();
						handleClose();
					}
					// The user has accepted to enable the location services
					// data can be :
					//  - "already-enabled" if the location services has been already enabled
					//  - "enabled" if user has clicked on OK button in the popup
				})
				.catch((err) => {
					combinedRef.current.open();
					// The user has not accepted to enable the location services or something went wrong during the process
					// "err" : { "code" : "ERR00|ERR01|ERR02", "message" : "message"}
					// codes :
					//  - ERR00 : The user has clicked on Cancel button in the popup
					//  - ERR01 : If the Settings change are unavailable
					//  - ERR02 : If the popup has failed to open
					console.log(err);
				});
		};

		return (
			<View style={{ padding: 16, backgroundColor: 'white' }}>
				<TouchableOpacity onPress={() => handleClose()} style={{ alignItems: 'flex-start' }}>
					<Icon name='ios-close' size={37} type='ionicon' />
				</TouchableOpacity>
				<View style={{ padding: 10, justifyContent: 'center', alignItem: 'center' }}>
					<View style={{ height: 180, borderRadius: 4 }}>
						<Image
							style={{ resizeMode: 'cover', width: '100%', height: '100%', borderRadius: 4 }}
							source={require('../../../assets/banner/q3.png')}
						/>
					</View>
					<View style={{ padding: 10 }}>
						<Text style={{ fontSize: 18, textAlign: 'center', fontWeight: '500', letterSpacing: 0.6 }}>
							Nyalakan Layanan Lokasi Perangkat untuk memudahkan kami dalam bekerja :)
						</Text>
					</View>
					<TouchableOpacity
						activeOpacity={0.74}
						onPress={() => GetCurrentLocation()}
						style={{
							backgroundColor: '#2296F3',
							padding: 4,
							borderWidth: 1,
							borderColor: '#2296F3',
							borderRadius: 4,
							justifyContent: 'center',
							alignItems: 'center',
							height: 40,
							marginTop: 8
						}}
					>
						<Text style={{ fontSize: 16, fontWeight: 'bold', color: 'white' }}>Aktifkan</Text>
					</TouchableOpacity>
				</View>
			</View>
		);
	};
	const check = true;
	return (
		<Modalize
			ref={combinedRef}
			adjustToContentHeight={true}
			onClose={() => (toggle ? console.log('t') : global_props.navigate('Home'))}
		>
			{modalContent()}
		</Modalize>
	);
});

const ActiveLocationModal = () => {
	const modals = Array.from({ length: 1 }).map((_) => useRef(null).current);
	let [
		refresh,
		setRefresh
	] = useState(false);

	useEffect(
		() => {
			global_props = props.navigation;

			if (pos === 0) {
				onRefresh();
			}
		},
		[
			pos,
			menu_list
		]
	);

	const onRefresh = React.useCallback(
		() => {
			setRefresh(true);

			Geolocation.getCurrentPosition(
				(position) => {
					for (var i = 0; i < menu_list.length; i++) {
						menu_list[i].distance = geolib.getDistance(position.coords, {
							latitude  : menu_list[i].coords.latitude,
							longitude : menu_list[i].coords.longitude
						});
					}
					location_service = true;
					console.log(position.coords);
					setPos((pos = position.coords));

					setRefresh(false);
					dispatch({ type: 'save_pos', pos: position.coords, distance: position.coords });
				},
				(err) => {
					location_service = false;
					console.log('location disabled');
					modals[0].open();
				},
				{ enableHighAccuracy: true, distanceFilter: 100, timeout: 8000 }
			);
		},
		[
			refresh
		]
	);

	return <EnableLocationModal ref={(el) => (modals[0] = el)} refresh_state={() => onRefresh()} />;
};

export default index;
