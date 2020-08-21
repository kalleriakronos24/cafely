import React, { useEffect, useState, useRef, forwardRef } from 'react';
import {
	View,
	Text,
	TextInput,
	Dimensions,
	TouchableHighlight,
	TouchableOpacity,
	ScrollView,
	StatusBar,
	Image,
	Animated,
	StyleSheet,
	ActivityIndicator
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { Icon } from 'react-native-elements';
import NumericInput from 'react-native-numeric-input';
import Spinner from 'react-native-spinkit';
import ImagePlacebo from '../../../components/ImagePlaceholder';
import * as geolib from 'geolib';
import Geolocation from '@react-native-community/geolocation';
import RNAndroidLocationEnabler from 'react-native-android-location-enabler';
import Geocoder from 'react-native-geocoding';
import { useCombinedRefs } from '../../../config/utils/combined_ref';
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
	useEffect(() => { });

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
							source={require('../../../../assets/banner/q3.png')}
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
export const ViewWarung = ({ navigation, route }) => {
	const modals = Array.from({ length: 1 }).map((_) => useRef(null).current);
	let scrollY = new Animated.Value(0);
	const params = route.params;
	const coords = { latitude: -0.49821, longitude: 117.156735 };
	const { width, height } = Dimensions.get('window');
	const dispatch = useDispatch();
	const items = useSelector((state) => state.CART_ITEMS);
	const currentPos = items.pos;
	const statusBarHeight = StatusBar.currentHeight;
	let HEADER_MAX_HEIGHT = width < 410 ? 270 : 300;
	let HEADER_MIN_HEIGHT = 170;
	let HEADER_SCROLL_DISTANCE = HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT;
	let [
		pos,
		setPos
	] = useState(0);
	let [
		load,
		setLoad
	] = useState(false);

	const headerOpacity = scrollY.interpolate({
		inputRange: [
			0,
			10,
			HEADER_SCROLL_DISTANCE
		],
		outputRange: [
			0,
			0,
			1
		],
		extrapolate: 'clamp'
	});
	const promo = false;
	useEffect(() => {
		global_props = navigation;
		if (pos === 0) {
			loading();
		}
	});
	let [
		distance,
		setDistance
	] = useState(0);
	const loading = React.useCallback(
		() => {
			setLoad(true);

			Geolocation.getCurrentPosition(
				(position) => {
					setDistance(
						geolib.getDistance(position.coords, {
							latitude: params.currentLocation.latitude,
							longitude: params.currentLocation.longitude
						})
					);
					location_service = true;
					setPos((pos = position.coords));
					wait(10).then(() => setLoad(false));
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
			load
		]
	);

	const wait = (timeout) => {
		return new Promise((resolve, reject) => {
			setTimeout(resolve, timeout);
		});
	};
	return (
		<React.Fragment>
			<EnableLocationModal ref={(el) => (modals[0] = el)} refresh_state={() => loading()} />
			<Animated.ScrollView
				onScroll={Animated.event(
					[
						{
							nativeEvent: { contentOffset: { y: scrollY } }
						}
					],
					{ useNativeDriver: true }
				)}
				scrollEventThrottle={1}
				style={{ flex: 1, backgroundColor: 'white' }}
				showsVerticalScrollIndicator={false}
			>
				<StatusBar translucent barStyle='light-content' backgroundColor='rgba(22,18,18,0.72)' animated />
				<View style={{ position: 'relative' }}>
					<View style={{ height: 280, flex: 1 }}>
						<Image
							style={{ resizeMode: 'cover', width: '100%', height: 280 }}
							source={{ uri: 'https://cdn.discordapp.com/emojis/645958631589806080.png?v=1' }}
							loadingIndicatorSource={
								<Spinner isVisible={true} size={40} type='ThreeBounce' color='black' />
							}
						/>
						<View
							style={{
								width: '100%',
								height: '100%',
								position: 'absolute',
								top: 0,
								left: 0,
								backgroundColor: 'black',
								opacity: 0.3
							}}
						/>
					</View>
				</View>

				<View style={{ padding: 16 }}>
					<View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
						<View>
							<Text style={{ fontSize: 22, fontWeight: 'bold', textTransform: 'capitalize' }}>
								Warung Test
							</Text>
							<View
								style={{
									padding: 7,
									justifyContent: 'center',
									alignItems: 'center',
									flexDirection: 'column'
								}}
							>
								<Text
									style={{
										fontSize: 13.4,
										textTransform: 'capitalize',
										color: '#515459',
										letterSpacing: 0.6
									}}
									ellipsizeMode={'tail'}
									numberOfLines={2}
								>
									Makanan, Minuman, Cemilan
								</Text>
							</View>
						</View>
						<View
							style={{
								borderWidth: 0.5,
								borderRadius: 4,
								height: 65,
								width: 65,
								justifyContent: 'center',
								alignItems: 'center'
							}}
						>
							<Icon name='ios-pin' color='red' size={50} type='ionicon' />
						</View>
					</View>
					<View>
						<Text style={{ letterSpacing: 2, color: '#819C8B' }}>
							--------------------------------------------------------------------------
						</Text>
					</View>
					<View style={{ flexDirection: 'row', justifyContent: 'space-between', padding: 10 }}>
						<View
							style={{
								padding: 4,
								flexDirection: 'column'
							}}
						>
							<View style={{ flexDirection: 'row', alignItems: 'center' }}>
								<Icon name='ios-star' size={20} color='blue' type='ionicon' />
								<Text style={{ marginLeft: 4, fontWeight: 'bold', fontSize: 20 }}>4.5</Text>
							</View>
							<Text style={{ marginTop: 4, fontSize: 13.3 }}>Recommended</Text>
						</View>
						{load ? (
							<View
								style={{
									padding: 4,
									flexDirection: 'column'
								}}
							>
								<ActivityIndicator size='large' color='blue' />
							</View>
						) : (
								<View
									style={{
										padding: 4,
										flexDirection: 'column'
									}}
								>
									<View style={{ flexDirection: 'row', alignItems: 'center' }}>
										<Icon name='ios-pin' size={20} color='blue' type='ionicon' />
										<Text style={{ marginLeft: 4, fontWeight: 'bold', fontSize: 20 }}>
											{(distance / 1000).toFixed(1)} km
									</Text>
									</View>
									<Text style={{ marginTop: 4, fontSize: 13.3 }}>Distance</Text>
								</View>
							)}

						<View
							style={{
								padding: 4,
								flexDirection: 'column'
							}}
						>
							<View style={{ flexDirection: 'row', alignItems: 'center' }}>
								<Icon name='ios-pricetags' size={20} color='blue' type='ionicon' />
								<Text style={{ marginLeft: 4, fontWeight: 'bold', fontSize: 20 }}>8k ~ 12k,-</Text>
							</View>
							<Text style={{ marginTop: 4, fontSize: 13.3 }}>Price</Text>
						</View>
					</View>

					<View
						style={{
							padding: 6,
							borderWidth: 0.6,
							borderColor: 'blue',
							borderRadius: 4,
							marginHorizontal: 20,
							flexDirection: 'row',
							justifyContent: 'space-between',
							alignItems: 'center'
						}}
					>
						<Text>See Available Vouchers</Text>
						<Icon name='ios-arrow-dropright' type='ionicon' color='blue' />
					</View>
				</View>
				<View style={{ height: 17, backgroundColor: '#F2F2F4', marginTop: 10 }} />

				{/* promotion */}
				{promo ? (
					<React.Fragment>
						<View style={{ padding: 16 }}>
							<View
								style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}
							>
								<Text style={{ fontWeight: '700', fontSize: 18.4, letterSpacing: 0.7 }}>Promo</Text>
								<Icon name='ios-list' type='ionicon' color='blue' />
							</View>
							<ScrollView
								horizontal={true}
								style={{ flexDirection: 'row', padding: 6 }}
								showsHorizontalScrollIndicator={false}
							>
								<TouchableOpacity style={{ marginHorizontal: 8 }}>
									<View
										style={{
											borderRadius: 8,
											width: width < 410 ? 110 : 180,
											height: width < 410 ? 170 : 240,
											position: 'relative'
										}}
									>
										<Image
											style={{
												borderRadius: 8,
												resizeMode: 'cover',
												height: '100%',
												width: '100%'
											}}
											source={require('../../../../assets/banner/q3.png')}
										/>
										<View
											style={{
												borderRadius: 8,
												width: '100%',
												height: '100%',
												position: 'absolute',
												top: 0,
												left: 0,
												backgroundColor: 'black',
												opacity: 0.2
											}}
										/>
									</View>
									<View
										style={{
											paddingBottom: 10,
											paddingLeft: 10,
											position: 'absolute',
											bottom: 0,
											left: 0,
											width: '100%',
											flexDirection: 'column',
											paddingHorizontal: 2
										}}
									>
										<Text
											style={{
												fontSize: width < 410 ? 15 : 18,
												fontWeight: 'bold',
												marginTop: 14,
												color: 'white',
												textTransform: 'capitalize'
											}}
										>
											ppga
										</Text>
										<View style={{ flexDirection: 'row' }}>
											<Text
												style={{
													marginTop: 2,
													fontSize: width < 410 ? 14 : 17,
													color: 'white'
												}}
											>
												Rp.12324,-{' '}
											</Text>
											<Text
												style={{
													marginTop: 2,
													fontSize: width < 410 ? 11 : 14,
													color: 'white',
													textDecorationLine: 'line-through',
													textDecorationStyle: 'solid'
												}}
											>
												Rp.12324,-
											</Text>
										</View>
									</View>
								</TouchableOpacity>
								<TouchableOpacity style={{ marginHorizontal: 8 }}>
									<View
										style={{
											borderRadius: 8,
											width: width < 410 ? 110 : 180,
											height: width < 410 ? 170 : 240,
											position: 'relative'
										}}
									>
										<Image
											style={{
												borderRadius: 8,
												resizeMode: 'cover',
												height: '100%',
												width: '100%'
											}}
											source={require('../../../../assets/banner/q3.png')}
										/>
										<View
											style={{
												borderRadius: 8,
												width: '100%',
												height: '100%',
												position: 'absolute',
												top: 0,
												left: 0,
												backgroundColor: 'black',
												opacity: 0.2
											}}
										/>
									</View>
									<View
										style={{
											paddingBottom: 10,
											paddingLeft: 10,
											position: 'absolute',
											bottom: 0,
											left: 0,
											width: '100%',
											flexDirection: 'column',
											paddingHorizontal: 2
										}}
									>
										<Text
											style={{
												fontSize: width < 410 ? 15 : 18,
												fontWeight: 'bold',
												marginTop: 14,
												color: 'white',
												textTransform: 'capitalize'
											}}
										>
											ppg
										</Text>
										<View style={{ flexDirection: 'row' }}>
											<Text
												style={{
													marginTop: 2,
													fontSize: width < 410 ? 14 : 17,
													color: 'white'
												}}
											>
												Rp.12324,-{' '}
											</Text>
											<Text
												style={{
													marginTop: 2,
													fontSize: width < 410 ? 11 : 14,
													color: 'white',
													textDecorationLine: 'line-through',
													textDecorationStyle: 'solid'
												}}
											>
												Rp.12324,-
											</Text>
										</View>
									</View>
								</TouchableOpacity>
								<TouchableOpacity style={{ marginHorizontal: 8 }}>
									<View
										style={{
											borderRadius: 8,
											width: width < 410 ? 110 : 180,
											height: width < 410 ? 170 : 240,
											position: 'relative'
										}}
									>
										<Image
											style={{
												borderRadius: 8,
												resizeMode: 'cover',
												height: '100%',
												width: '100%'
											}}
											source={require('../../../../assets/banner/q3.png')}
										/>
										<View
											style={{
												borderRadius: 8,
												width: '100%',
												height: '100%',
												position: 'absolute',
												top: 0,
												left: 0,
												backgroundColor: 'black',
												opacity: 0.2
											}}
										/>
									</View>
									<View
										style={{
											paddingBottom: 10,
											paddingLeft: 10,
											position: 'absolute',
											bottom: 0,
											left: 0,
											width: '100%',
											flexDirection: 'column',
											paddingHorizontal: 2
										}}
									>
										<Text
											style={{
												fontSize: width < 410 ? 15 : 18,
												fontWeight: 'bold',
												marginTop: 14,
												color: 'white',
												textTransform: 'capitalize'
											}}
										>
											ppg
										</Text>
										<View style={{ flexDirection: 'row' }}>
											<Text
												style={{
													marginTop: 2,
													fontSize: width < 410 ? 14 : 17,
													color: 'white'
												}}
											>
												Rp.12324,-{' '}
											</Text>
											<Text
												style={{
													marginTop: 2,
													fontSize: width < 410 ? 11 : 14,
													color: 'white',
													textDecorationLine: 'line-through',
													textDecorationStyle: 'solid'
												}}
											>
												Rp.12324,-
											</Text>
										</View>
									</View>
								</TouchableOpacity>
								<View style={{ marginHorizontal: 8 }}>
									<View
										style={{
											borderRadius: 8,
											width: width < 410 ? 110 : 180,
											height: width < 410 ? 170 : 240,
											borderWidth: 1,
											justifyContent: 'center',
											alignItems: 'center',
											backgroundColor: '#121212'
										}}
									>
										<View
											style={{
												marginTop: -20,
												flexDirection: 'column',
												justifyContent: 'center',
												alignItems: 'center'
											}}
										>
											<View
												style={{
													padding: 4,
													height: 60,
													width: 60,
													borderRadius: 30,
													justifyContent: 'center',
													alignItems: 'center',
													backgroundColor: '#252420'
												}}
											>
												<Icon name='ios-images' color='white' type='ionicon' size={35} />
											</View>
											<View
												style={{ justifyContent: 'center', alignItems: 'center', padding: 8 }}
											>
												<Text
													style={{
														fontWeight: 'bold',
														fontSize: 16,
														textAlign: 'center',
														color: '#B1B1B1'
													}}
												>
													Lihat Promo Lainnya Dari Warung Test
												</Text>
											</View>
											<TouchableOpacity
												style={{
													marginTop: 15,
													padding: 4,
													borderWidth: 1,
													borderRadius: 40,
													backgroundColor: '#252420',
													height: 40,
													width: 80,
													justifyContent: 'center',
													alignItems: 'center'
												}}
											>
												<Text style={{ color: '#B1B1B1', fontSize: 16 }}>Explore</Text>
											</TouchableOpacity>
										</View>
									</View>
								</View>
							</ScrollView>
						</View>
					</React.Fragment>
				) : null}


				{/* Makanan */}
				<View style={{ padding: 16 }}>
					<View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
						<Text style={{ fontWeight: '700', fontSize: 18.4, letterSpacing: 0.7 }}>Makanan</Text>
						<TouchableOpacity onPress={() => navigation.navigate('Food_Warung')} activeOpacity={0.5}>
							<Icon name='ios-list' type='ionicon' color='blue' />
						</TouchableOpacity>
					</View>
					<View style={{ padding: 6 }}>
						<View style={{ flexDirection: 'row' }}>
							<TouchableOpacity style={{ borderRadius: 10 }}>
								<View
									style={{
										borderRadius: 8,
										height: 187,
										width: 187,
										position: 'relative'
									}}
								>
									<Image
										style={{
											borderRadius: 8,
											resizeMode: 'cover',
											height: '100%',
											width: '100%'
										}}
										source={require('../../../../assets/banner/q3.png')}
									/>
									<View
										style={{
											borderRadius: 8,
											width: '100%',
											height: '100%',
											position: 'absolute',
											top: 0,
											left: 0,
											backgroundColor: 'black',
											opacity: 0.2
										}}
									/>
								</View>
								<View
									style={{
										paddingBottom: 10,
										paddingLeft: 10,
										position: 'absolute',
										bottom: 0,
										left: 0,
										width: '100%',
										flexDirection: 'column',
										paddingHorizontal: 2
									}}
								>
									<Text
										style={{
											fontSize: width < 410 ? 15 : 18,
											fontWeight: 'bold',
											marginTop: 14,
											color: 'white'
										}}
									>
										ppg
									</Text>
									<Text style={{ marginTop: 2, fontSize: width < 410 ? 14 : 17, color: 'white' }}>
										Rp.12323,-
									</Text>
								</View>
							</TouchableOpacity>
							<View style={{ marginLeft: 16, flex: 1, flexDirection: 'column' }}>
								<Text
									style={{
										fontSize: 20,
										fontWeight: 'bold',
										fontFamily: 'Roboto',
										textTransform: 'capitalize'
									}}
								>
									Ppg
								</Text>
								<View style={{ padding: 4 }}>
									<Text style={{ fontSize: 15, marginTop: 5 }}>
										wqeqweqweqweqweqwewqeqweqweqwewqeqwewqe
									</Text>
								</View>
								<View
									style={{
										flex: 1,
										padding: 6,
										justifyContent: 'center',
										alignItems: 'center'
									}}
								>
									<TouchableOpacity
										style={{
											backgroundColor: '#2296F3',
											width: '100%',
											height: 32,
											borderRadius: 4,
											alignItems: 'center',
											justifyContent: 'center'
										}}
									>
										<Text style={{ fontSize: 14, color: 'white' }}>ORDER</Text>
									</TouchableOpacity>
								</View>
							</View>
						</View>
					</View>
				</View>
				{/* Minuman */}

				<View style={{ padding: 16 }}>
					<View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
						<Text style={{ fontWeight: '700', fontSize: 18.4, letterSpacing: 0.7 }}>Minuman</Text>
						<TouchableOpacity onPress={() => navigation.navigate('Drink_Warung')} activeOpacity={0.5}>
							<Icon name='ios-list' type='ionicon' color='blue' />
						</TouchableOpacity>
					</View>

					{/* List Minuman */}
					<View style={{ padding: 6 }}>
						<View style={{ flexDirection: 'row' }}>
							<TouchableOpacity style={{ borderRadius: 10 }}>
								<View
									style={{
										borderRadius: 8,
										height: 187,
										width: 187,
										position: 'relative'
									}}
								>
									<Image
										style={{
											borderRadius: 8,
											resizeMode: 'cover',
											height: '100%',
											width: '100%'
										}}
										source={require('../../../../assets/banner/q3.png')}
									/>
									<View
										style={{
											borderRadius: 8,
											width: '100%',
											height: '100%',
											position: 'absolute',
											top: 0,
											left: 0,
											backgroundColor: 'black',
											opacity: 0.2
										}}
									/>
								</View>
								<View
									style={{
										paddingBottom: 10,
										paddingLeft: 10,
										position: 'absolute',
										bottom: 0,
										left: 0,
										width: '100%',
										flexDirection: 'column',
										paddingHorizontal: 2
									}}
								>
									<Text
										style={{
											fontSize: width < 410 ? 15 : 18,
											fontWeight: 'bold',
											marginTop: 14,
											color: 'white'
										}}
									>
										ppg
									</Text>
									<Text style={{ marginTop: 2, fontSize: width < 410 ? 14 : 17, color: 'white' }}>
										Rp.12323,-
									</Text>
								</View>
							</TouchableOpacity>
							<View style={{ marginLeft: 16, flex: 1, flexDirection: 'column' }}>
								<Text
									style={{
										fontSize: 20,
										fontWeight: 'bold',
										fontFamily: 'Roboto',
										textTransform: 'capitalize'
									}}
								>
									Ppg
								</Text>
								<View style={{ padding: 4 }}>
									<Text style={{ fontSize: 15, marginTop: 5 }}>
										wqeqweqweqweqweqwewqeqweqweqwewqeqwewqe
									</Text>
								</View>
								<View
									style={{
										flex: 1,
										padding: 6,
										justifyContent: 'center',
										alignItems: 'center'
									}}
								>
									<TouchableOpacity
										style={{
											backgroundColor: '#2296F3',
											width: '100%',
											height: 32,
											borderRadius: 4,
											alignItems: 'center',
											justifyContent: 'center'
										}}
									>
										<Text style={{ fontSize: 14, color: 'white' }}>ORDER</Text>
									</TouchableOpacity>
								</View>
							</View>
						</View>
						<View style={{ flex: 1 }}>
							<View
								style={{
									padding: 10,
									flexDirection: 'row',
									justifyContent: 'center',
									alignItems: 'center'
								}}
							>
								<Icon name='ios-list' type='ionicon' color='blue' />
								<Text style={{ textAlign: 'center', fontWeight: '600', fontSize: 16, marginLeft: 6 }}>
									See More
								</Text>
							</View>
							<View style={{ borderBottomColor: '#2296F3', borderBottomWidth: 1 }} />
						</View>
					</View>
					{/* End of List Minuman */}

				</View>
			</Animated.ScrollView>
			<View
				style={{
					position: 'absolute',
					top: 0,
					left: 0,
					marginTop: statusBarHeight,
					height: 60
				}}
			>
				<View style={{ flex: 1, position: 'relative' }}>
					<Animated.View
						style={{
							backgroundColor: 'rgba(22,18,18,0.72)',
							height: '100%',
							width: '100%',
							opacity: headerOpacity,
							position: 'absolute'
						}}
					/>

					<View
						style={{
							paddingHorizontal: 10,
							flexDirection: 'row',
							alignItems: 'center',
							zIndex: 10
						}}
					>
						<TouchableOpacity
							onPress={() => navigation.goBack()}
							style={{
								padding: 5,
								height: 50,
								width: 50,
								justifyContent: 'center',
								alignItems: 'center',
								marginTop: 10
							}}
						>
							<Icon name='md-arrow-round-back' color='white' type='ionicon' size={30} />
						</TouchableOpacity>
						<TouchableOpacity
							activeOpacity={0.8}
							onPress={() => props.navigation.navigate('Search')}
							style={{
								flexDirection: 'row',
								backgroundColor: 'white',
								alignItems: 'center',
								marginTop: 10,
								padding: 5,
								height: 40,
								borderRadius: 10,
								width: width - 10 * 2 - 50 * 2
							}}
						>
							<Text style={{ color: 'black', opacity: 0.5, marginLeft: 5 }}>Search in Warung Test</Text>
						</TouchableOpacity>

						<TouchableOpacity
							style={{
								padding: 5,
								height: 50,
								width: 50,
								justifyContent: 'center',
								alignItems: 'center',
								marginTop: 10
							}}
						>
							<Icon name='md-cart' color='white' type='ionicon' size={30} />
						</TouchableOpacity>
					</View>
				</View>
			</View>
		</React.Fragment>
	);
};
