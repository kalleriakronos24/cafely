import React, { useEffect, useState, useRef, forwardRef } from 'react';
import {
	View,
	Text,
	TouchableOpacity,
	TextInput,
	ScrollView,
	addons,
	Dimensions,
	ActivityIndicator,
	StatusBar,
	Image,
	ToastAndroid,
	Animated,
	DeviceEventEmitter,
	NativeEventEmitter
} from 'react-native';
import Svg, {
	Rect
} from 'react-native-svg';
import { useSelector, useDispatch } from 'react-redux';
import { CheckBox } from 'react-native-elements'
import { ADD_CART_COUNT, ADD_CART_ITEMS, DEC_CART_COUNT, REMOVE } from '../../../Redux/actions/action';
import Swiper from 'react-native-swiper';
import { Icon } from 'react-native-elements';
import Modal from 'react-native-modal';
import ImagePlacebo from '../../../components/ImagePlaceholder';
import * as geolib from 'geolib';
import Geolocation from '@react-native-community/geolocation';
import RNAndroidLocationEnabler from 'react-native-android-location-enabler';
import Geocoder from 'react-native-geocoding';
import { useCombinedRefs } from '../../../config/utils/combined_ref';
import { Modalize } from 'react-native-modalize';
Geocoder.init('AIzaSyCbpEHfzwBGfdSIfbFCODyH_muffddTZvg');
import Sheet from 'react-native-raw-bottom-sheet';
import { VIEW_SINGLE } from '../../../Redux/actions/action';
import AsyncStorage from '@react-native-community/async-storage';
import { useDarkMode } from 'react-native-dark-mode'
import moment from 'moment';
import { isLocationEnabledSync } from 'react-native-device-info';
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
					setToggle(true);
					_.refresh_state();
					handleClose();
					// The user has accepted to enable the location services
					// data can be :
					//  - "already-enabled" if the location services has been already enabled
					//  - "enabled" if user has clicked on OK button in the popup
				})
				.catch((err) => {
					console.log('ad error')
					console.log(err.message);
					combinedRef.current.open();
					// The user has not accepted to enable the location services or something went wrong during the process
					// "err" : { "code" : "ERR00|ERR01|ERR02", "message" : "message"}
					// codes :
					//  - ERR00 : The user has clicked on Cancel button in the popup
					//  - ERR01 : If the Settings change are unavailable
					//  - ERR02 : If the popup has failed to open
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
const ViewPost = (props) => {
	const isDarkMode = useDarkMode();
	const modals = Array.from({ length: 1 }).map(_ => useRef(null).current);
	let view = useSelector(state => state.CART_ITEMS);
	let cart_count = useSelector(state => state.CART_COUNT);
	const p = props.route.params.viewSingleData;
	let dispatch = useDispatch();
	let [images] = useState([
		"https://source.unsplash.com/1024x768/?food",
		"https://source.unsplash.com/1024x768/?water",
		"https://source.unsplash.com/1024x768/?tree"// Network image
	]);

	const c = useSelector(state => state.order_items);
	let [
		menu_list,
		setMenuList
	] = useState([
		{
			id: 1,
			menu_name: 'Kerikil ABCQWEQWEWQEQWEWQE',
			price_ea: 12000,
			qty: 1,
			total: 8000,
			deleted_from_cart: false,
			distance: 0,
			warung: 'Warung Makan Bu UDIN',
			pemilik: 'IBU UDIN',
			coords: {
				latitude: -0.5240333,
				longitude: 117.1711636
			},
			is_ket_order: false,
			keterangan_order: '',
			tambahan_lainnya: {
				sambel: true,
				serondeng: true,
				tempe: true
			}
		},
		{
			id: 2,
			menu_name: 'Kerikil ABCD',
			price_ea: 8000,
			qty: 1,
			total: 8000,
			deleted_from_cart: false,
			warung: 'Warung Nasi Padang Prapatan',
			pemilik: 'Pak Herman',
			distance: 0,
			coords: {
				latitude: -0.5225474,
				longitude: 117.1694158
			},
			is_ket_order: false,
			keterangan_order: '',
			tambahan_lainnya: {
				sambel: true,
				serondeng: true,
				tempe: true
			}
		},
		{
			id: 3,
			menu_name: 'Kerikil ABCDE',
			price_ea: 8000,
			qty: 1,
			total: 8000,
			deleted_from_cart: false,
			warung: 'Warung Nasi Kuning Ppg',
			pemilik: 'IBU PPGA',
			distance: 0,
			coords: {
				latitude: -0.5240333,
				longitude: 117.1711636
			},
			is_ket_order: false,
			keterangan_order: '',
			tambahan_lainnya: {
				sambel: true,
				serondeng: true,
				tempe: true
			}
		}
	]);

	let [pos, setPos] = useState(0);
	const currentLocation = {
		latitude: p.coords.latitude,
		longitude: p.coords.longitude
	}
	let [expanded, setExpanded] = useState(false);

	const AddToOrderList = async (data, idx) => {

		let arr = c.order_items;
		let check = await arr.some((v, i) => Object.keys(arr[i])[0] === data.warung);

		if (check) {
			console.log('is this working ?')
			let d = await arr.filter((v, i) => Object.keys(arr[i])[0] === data.warung)[0];
			console.log('\n', '\n', '\n', d)
			if (d[data.warung].order_items.some((x, y) => x.id === data.id)) {
				ToastAndroid.showWithGravity(data.menu_name + ' sudah ada di keranjang', ToastAndroid.SHORT, ToastAndroid.BOTTOM, 25, 50)
				return
			}
			console.log('is dispatch work ?')
			dispatch({ type: 'add_order', wr: data.warung, order: data });
			dispatch(ADD_CART_COUNT());
		} else {
			console.log('exception ?')
			let obj = {
				[data.warung]: {
					order_items: [data],
					warung_info: {
						name: data.warung,
						distance: data.distance,
						coords: {
							latitude: data.coords.latitude,
							longitude: data.coords.longitude
						}
					},
					courier: {
						courier_id: Math.random() * 999999999,
						name: 'Mada Nugraha',
						courier_of: 'Warung Makan Bu UDIN 3',
						status: false,
						ratings: 4.5
					}
				}
			};
			dispatch({ type: 'add', data: obj })
			dispatch(ADD_CART_COUNT());
		}
	}

	let { width, height } = Dimensions.get('window');
	let [refresh, setRefresh] = useState(false);

	let scrollY = new Animated.Value(0);
	useEffect(() => {

		const ms = 1000;
		global_props = props.navigation;

		if (pos === 0) {
			onRefresh();
		}


	}, [pos, p]);


	const onRefresh = React.useCallback(() => {
		setRefresh(true);
		Geolocation.getCurrentPosition(
			(position) => {
				console.log(position)
				p.distance = geolib.getDistance(position.coords, {
					latitude: p.coords.latitude,
					longitude: p.coords.longitude,
				})
				location_service = true;
				setPos(pos = position.coords)

				wait(20).then(() => setRefresh(false));
			},
			(err) => {
				location_service = false;
				console.log(err);
				modals[0].open();
			},
			{ enableHighAccuracy: false, distanceFilter: 300, timeout: 10000 }
		)
	}, [refresh]);

	const wait = (timeout) => {
		return new Promise((resolve, reject) => {
			setTimeout(resolve, timeout);
		})
	}

	const ViewSingleFood = (val, idx) => {
		// dispatch(VIEW_SINGLE({ val }));
		dispatch({ type: 'WARUNG_NAME', name: val.warung });
		if (val !== null) {
			props.navigation.replace('ViewPost', { viewSingleData: val });
		}
	};

	const saveToBookmark = async data => {
		const item = await AsyncStorage.getItem('bookmark');
		var arr = JSON.parse(item) || [];

		if (!arr) {
			arr = []
		}

		if (arr.some(_ => _.id === data.id)) {
			ToastAndroid.showWithGravity(data.menu_name + ' already in bookmark', ToastAndroid.SHORT, ToastAndroid.BOTTOM, 1000, 1000)
			return
		} else {
			arr.push(data);
			await AsyncStorage.setItem('bookmark', JSON.stringify(arr))
				.then(() => {
					ToastAndroid.showWithGravity(data.menu_name + ' added to bookmark', ToastAndroid.SHORT, ToastAndroid.BOTTOM, 1000, 1000)

				}).catch((err) => {
					throw new Error(err);
				});
		}
	}

	const statusBarHeight = StatusBar.currentHeight;
	const clr = 'rgba(0,0,0,0.251)';
	const headingOpacity = scrollY.interpolate({
		inputRange: [0, 350 / 2 - 50, 350 - 50],
		outputRange: [0, 1, 1],
		extrapolate: 'clamp'
	})
	const backgroundHeadingOpacity = scrollY.interpolate({
		inputRange: [0, 350 / 2 - 50, 350 - 50],
		outputRange: [0, 1, 1],
		extrapolate: 'clamp'
	});
	let sheetRef = useRef(null);
	const sheetOpen = () => {
		StatusBar.setBarStyle(isDarkMode ? 'light-content' : 'dark-content');
		StatusBar.setBackgroundColor(isDarkMode ? 'rgba(22,18,18,0.72)' : 'white');
	}
	const sheetClose = () => {
		StatusBar.setBarStyle('light-content');
		StatusBar.setBackgroundColor('rgba(22,18,18,0.72)')
	}
	const isDiscount = true;
	return (
		<React.Fragment>
			<View style={{ flex: 1, backgroundColor: isDarkMode ? '#121212' : 'white' }}>
				<Sheet onOpen={() => sheetOpen()} onClose={() => sheetClose()} height={250} ref={(ref) => sheetRef = ref} closeOnDragDown={true} closeOnPressBack={true} closeOnPressMask={true} customStyles={{ draggableIcon: { display: 'none' }, container: { backgroundColor: isDarkMode ? '#121212' : 'white' } }}>
					<View style={{ flex: 1, backgroundColor: isDarkMode ? '#121212' : 'white' }}>
						<View style={{ flexDirection: 'row', flex: 1, backgroundColor: isDarkMode ? '#121212' : 'white' }}>
							<View style={{ flexDirection: 'column', justifyContent: 'center', paddingVertical: 10 }}>
								<TouchableOpacity activeOpacity={0.5} onPress={() => saveToBookmark(p, 1)} style={{ paddingHorizontal: 9, marginBottom: 57.5 - 40, justifyContent: 'center', alignItems: 'center' }}>
									<Icon name='ios-bookmark' color={isDarkMode ? '#B1B1B1' : 'black'} size={40} type='ionicon' />
								</TouchableOpacity>
								<View style={{ paddingHorizontal: 9, marginBottom: 57.5 - 40, justifyContent: 'center', alignItems: 'center' }}>
									<Icon name='ios-notifications-outline' color={isDarkMode ? '#B1B1B1' : 'black'} size={40} type='ionicon' />
								</View>
								<View style={{ paddingHorizontal: 9, marginBottom: 57.5 - 40, justifyContent: 'center', alignItems: 'center' }}>
									<Icon name='ios-alert' color={isDarkMode ? '#B1B1B1' : 'black'} size={40} type='ionicon' />
								</View>
								<View style={{ paddingHorizontal: 9, justifyContent: 'center', alignItems: 'center' }}>
									<Icon name='ios-help-circle-outline' color={isDarkMode ? '#B1B1B1' : 'black'} size={40} type='ionicon' />
								</View>
							</View>
							<View style={{ flexDirection: 'column', justifyContent: 'center', paddingVertical: 10 }}>
								<TouchableOpacity activeOpacity={0.5} onPress={() => saveToBookmark(p, 1)} style={{ marginBottom: 57.5 - 40, flexDirection: 'column', justifyContent: 'center', height: 40 }}>
									<Text style={{ fontSize: 18, color: isDarkMode ? '#B1B1B1' : 'black' }}>Save post</Text>
									<Text style={{ fontSize: 13, color: isDarkMode ? '#B1B1B1' : 'black' }}>Add this post to your bookmark</Text>
								</TouchableOpacity>
								<View style={{ marginBottom: 57.5 - 40, flexDirection: 'column', justifyContent: 'center', height: 40 }}>
									<Text style={{ fontSize: 18, color: isDarkMode ? '#B1B1B1' : 'black' }}>Keep me updated</Text>
									<Text style={{ fontSize: 13, color: isDarkMode ? '#B1B1B1' : 'black' }}>Turn on notification for {p.warung}'s post</Text>
								</View>
								<View style={{ marginBottom: 57.5 - 40, flexDirection: 'column', justifyContent: 'center', height: 40 }}>
									<Text style={{ fontSize: 18, color: isDarkMode ? '#B1B1B1' : 'black' }}>Report a problem</Text>
									<Text style={{ fontSize: 13, color: isDarkMode ? '#B1B1B1' : 'black' }}>Contact admin if something goes wrong with this post</Text>
								</View>
								<View style={{ flexDirection: 'column', justifyContent: 'center', height: 40 }}>
									<Text style={{ fontSize: 18, color: isDarkMode ? '#B1B1B1' : 'black' }}>Help and support</Text>
								</View>
							</View>
						</View>
					</View>
				</Sheet>
				<EnableLocationModal ref={el => (modals[0] = el)} refresh_state={() => onRefresh()} />
				<StatusBar translucent barStyle='light-content' backgroundColor='rgba(22,18,18,0.72)' animated />

				<Animated.ScrollView style={{ flex: 1 }} showsVerticalScrollIndicator={false} bounces={true} onScroll={Animated.event(
					[
						{
							nativeEvent: { contentOffset: { y: scrollY } }
						}
					],
					{ useNativeDriver: true }
				)}
					scrollEventThrottle={1}>

					<Swiper style={{
						height: 450,
						borderRadius: 4
					}} showsButtons={false}
						bounces
						activeDotColor={'white'}>
						{
							images.map((v, i) => {
								return (
									<View style={{ paddingBottom: 16, borderRadius: 4 }}>
										<Image style={{ height: '100%', width: '100%' }} source={{ uri: v }} />
									</View>
								)
							})
						}
					</Swiper>
					<View style={{ flex: 1 }}>
						<View style={{ padding: 16 }}>
							<View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
								<Text ellipsizeMode={'tail'} numberOfLines={1} style={{ textTransform: 'capitalize', fontSize: 20, fontWeight: 'bold', color: isDarkMode ? '#B1B1B1' : 'black' }}>{p.menu_name.length > 30 ? p.menu_name.slice(0, 30) + '...' : p.menu_name}</Text>
								<TouchableOpacity onPress={() => saveToBookmark(p, 1)} activeOpacity={0.6} style={{ padding: 6, alignItems: 'center', justifyContent: 'center' }}>
									<Icon name='ios-bookmark' size={40} color={isDarkMode ? '#2296F3' : 'blue'} type='ionicon' />
								</TouchableOpacity>
							</View>

							<View style={{ padding: 10 }}>
								<Text style={{ color: isDarkMode ? '#B1B1B1' : 'black' }}>asdjsakdjaksjdaksdjaksdjaskdjaskdjasdkjadkjasdkjaskdjaskdjaksjdkasjdkjasdkjasdkjaskdjasdkj</Text>
							</View>
							<View style={{ padding: 7 }}>
								<View style={{ alignItems: 'center', flexDirection: 'row' }}>

									<Text style={{ fontSize: 17, color: isDarkMode ? '#B1B1B1' : 'black' }}>Harga </Text>
									{
										isDiscount ? (
											<View style={{ padding: 5, backgroundColor: '#2296F3', justifyContent: 'center', alignItems: 'center', borderRadius: 4 }}>
												<Text style={{ fontSize: 12, color: isDarkMode ? 'white' : 'white' }}> - 50%</Text>
											</View>

										) : null
									}
								</View>

								<View style={{ marginTop: 5, alignItems: 'center', flexDirection: 'row' }}>
									<Text style={{ fontSize: 17, color: isDarkMode ? '#B1B1B1' : 'black' }}>Rp.{50 / 100 * p.price_ea},-</Text>
									{
										isDiscount ? (

											<Text style={{ fontSize: 12, color: isDarkMode ? '#B1B1B1' : 'black', marginLeft: 3.5, textDecorationStyle: 'dashed', textDecorationLine: 'line-through' }}>Rp.{p.price_ea},-</Text>
										) : null
									}
								</View>
							</View>

							<View style={{ padding: 7 }}>
								<Text style={{ fontSize: 17, color: isDarkMode ? '#B1B1B1' : 'black' }}>Alamat Warung </Text>
								<View style={{ marginTop: 5 }}>
									<Text style={{ color: isDarkMode ? '#B1B1B1' : 'black' }}>Jalan Santi Murni</Text>
								</View>
							</View>



							{
								refresh ? (
									<ActivityIndicator size={'small'} />
								) : (
										<View style={{ padding: 7 }}>
											<Text style={{ fontSize: 17, color: isDarkMode ? '#B1B1B1' : 'black' }}>Distance </Text>

											<View style={{ marginTop: 5, flexDirection: 'row' }}>
												<Icon name='ios-pin' color={isDarkMode ? '#B1B1B1' : 'black'} type='ionicon' />
												<Text style={{ marginLeft: 5, color: isDarkMode ? '#B1B1B1' : 'black' }}>{(p.distance / 1000).toFixed(2) || 0} km</Text>
											</View>
										</View>
									)
							}
							{
								expanded ? (
									<React.Fragment>
										<View style={{ padding: 7 }}>
											<Text style={{ fontSize: 17, color: isDarkMode ? '#B1B1B1' : 'black' }}>Date posted </Text>
											<View style={{ marginTop: 5 }}>
												<Text style={{ color: isDarkMode ? '#B1B1B1' : 'black' }}>{moment().locale('id-ID').format('DD MMMM YYYY hh:mm ')}</Text>
											</View>
										</View>
										<View style={{ padding: 7 }}>
											<Text style={{ fontSize: 17, color: isDarkMode ? '#B1B1B1' : 'black' }}>Category </Text>
											<View style={{ marginTop: 5 }}>
												<Text style={{ color: isDarkMode ? '#B1B1B1' : 'black' }}>Dish / Food</Text>
											</View>
										</View>
									</React.Fragment>
								) : null
							}

						</View>
						<TouchableOpacity activeOpacity={0.4} onPress={() => setExpanded(!expanded)} style={{ padding: 7, justifyContent: 'center', alignItems: 'center', flexDirection: 'row' }}>
							<Text style={{ fontSize: 14, color: isDarkMode ? '#B1B1B1' : 'black', marginRight: 5 }}>{expanded ? 'Fewer Details' : 'More Details'}</Text>
							<Icon name={expanded ? 'ios-arrow-dropup' : 'ios-arrow-dropdown'} type='ionicon' size={18} color={isDarkMode ? '#b1b1b1' : 'black'} />
						</TouchableOpacity>
					</View>

					<View style={{ height: 17, backgroundColor: '#F2F2F4', opacity: isDarkMode ? 0.2 : 1, marginTop: 20 }} />
					<View style={{ flex: 1, padding: 16 }}>
						<View style={{ justifyContent: 'space-between', flexDirection: 'row' }}>
							<Text style={{ fontSize: 17, color: isDarkMode ? '#B1B1B1' : 'black' }}>Masakan lainnya dari warung ini</Text>
							<Icon name='ios-list' type='ionicon' color={isDarkMode ? '#B1B1B1' : 'blue'} />
						</View>
						<View style={{ marginTop: 10 }}>
							<ScrollView horizontal={true} style={{ flexDirection: 'row' }} showsHorizontalScrollIndicator={false}>
								{menu_list.map((v, i) => {
									return (
										<TouchableOpacity key={i} onPress={() => ViewSingleFood(v, i)} style={{ marginHorizontal: 16 }}>
											<View
												style={{
													borderRadius: 8,
													width: width < 410 ? 170 : 240,
													height: width < 410 ? 170 : 240,
													position: 'relative'
												}}
											>
												<Image resizeMod='cover'
													style={{

														borderRadius: 8,
														resizeMode: 'stretch',
														flex: 1
													}}
													source={{ uri: images[Math.floor(Math.random() * images.length)] }}
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
													{v.menu_name}
												</Text>
												<Text style={{ marginTop: 2, fontSize: width < 410 ? 14 : 17, color: 'white' }}>
													Rp.{v.price_ea},-
									</Text>
											</View>
										</TouchableOpacity>
									);
								})}
							</ScrollView>
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
								<Icon name='ios-list' type='ionicon' color={isDarkMode ? '#B1B1B1' : 'blue'} />
								<Text style={{ textAlign: 'center', fontWeight: '600', fontSize: 16, marginLeft: 6, color: isDarkMode ? '#B1B1B1' : 'black' }}>
									See More
							</Text>
							</View>
							<View style={{ borderBottomColor: '#2296F3', borderBottomWidth: 1 }} />
						</View>
					</View>

					<View style={{ height: 17, backgroundColor: '#F2F2F4', opacity: isDarkMode ? 0.2 : 1 }} />
					<View style={{ flex: 1, padding: 16 }}>
						<View>
							<Text style={{ fontSize: 17, color: isDarkMode ? '#B1B1B1' : 'black' }}>Tentang {p.warung}</Text>
						</View>
						<View style={{ padding: 16, flexDirection: 'row' }}>
							<View style={{ borderRadius: 4 }}>
								<Image style={{ height: 75, width: 75, borderRadius: 5 }} source={require('../../../../assets/banner/q3.png')} resizeMode='cover' />
							</View>
							<View style={{ marginLeft: 10, flexDirection: 'column' }}>
								<View>
									<Text style={{ fontSize: 16, fontWeight: 'bold', color: isDarkMode ? '#B1B1B1' : 'black' }}>{p.warung}</Text>
								</View>
								<View style={{ padding: 4 }}>
									<Text style={{ color: isDarkMode ? '#B1B1B1' : 'black' }}>{p.pemilik}</Text>
									<View style={{ flexDirection: 'row' }}>
										<Icon name="ios-pin" type="ionicon" color={isDarkMode ? '#b1b1b1' : 'blue'} />
										<Text style={{ marginLeft: 4, color: isDarkMode ? '#B1B1B1' : 'black' }}>Samarinda</Text>
									</View>
								</View>
							</View>
							<View style={{ flexDirection: 'row', flex: 1, justifyContent: 'space-between' }}>
								<Text />
								<View style={{ padding: 4, borderRadius: 4, borderColor: isDarkMode ? '#b1b1b1' : 'blue', borderWidth: 1, justifyContent: 'center', alignItems: 'center', height: 40, width: 40 }}>

									<Icon name='ios-bookmark' color={isDarkMode ? '#b1b1b1' : 'blue'} type='ionicon' />
								</View>
							</View>

						</View>
						<View>
							<Text style={{ textAlign: 'center', fontSize: 11.7, color: isDarkMode ? '#B1B1B1' : 'black' }}>
								Stay up-to-date with this warung by getting list of posts you may like
					</Text>
							<View style={{ borderBottomWidth: 1, borderColor: '#2296F3', marginTop: 4 }} />
							<View style={{ justifyContent: 'space-between', flexDirection: 'row', marginHorizontal: 25 }}>
								<TouchableOpacity activeOpacity={0.45}
									style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginTop: 5 }}
									onPress={() => props.navigation.navigate('View_Warung')}
								>
									<Icon name='md-home' color={isDarkMode ? '#b1b1b1' : 'blue'} type='ionicon' />
									<Text style={{ marginLeft: 6, textAlign: 'center', fontSize: 14, color: isDarkMode ? '#B1B1B1' : 'black' }}>Lihat Profil Warung</Text>
								</TouchableOpacity>
								<View
									style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginTop: 5 }}
								>
									<Icon name='ios-notifications' color={isDarkMode ? '#b1b1b1' : 'blue'} type='ionicon' />
									<Text style={{ marginLeft: 6, textAlign: 'center', fontSize: 14, color: isDarkMode ? '#B1B1B1' : 'black' }}>Keep Me Updated</Text>
								</View>
							</View>
						</View>
					</View>

					{/* Recommendation */}
					<View style={{ height: 17, backgroundColor: '#F2F2F4', opacity: isDarkMode ? 0.2 : 1, marginTop: 20 }} />

					<View style={{ flex: 1, padding: 16 }}>
						<View style={{ justifyContent: 'space-between', flexDirection: 'row' }}>
							<Text style={{ fontSize: 17, color: isDarkMode ? '#B1B1B1' : 'black' }}>Recommendation</Text>
							<Icon name='ios-list' type='ionicon' color={isDarkMode ? '#B1B1B1' : 'blue'} />
						</View>
						<View style={{ marginTop: 10 }}>
							<ScrollView horizontal={true} style={{ flexDirection: 'row' }} showsHorizontalScrollIndicator={false}>
								{menu_list.map((v, i) => {
									return (
										<TouchableOpacity key={i} onPress={() => ViewSingleFood(v, i)} style={{ marginHorizontal: 16 }}>
											<View
												style={{
													borderRadius: 8,
													width: width < 410 ? 170 : 240,
													height: width < 410 ? 170 : 240,
													position: 'relative'
												}}
											>
												<Image resizeMod='cover'
													style={{

														borderRadius: 8,
														resizeMode: 'stretch',
														flex: 1
													}}
													source={{ uri: images[Math.floor(Math.random() * images.length)] }}
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
													{v.menu_name}
												</Text>
												<Text style={{ marginTop: 2, fontSize: width < 410 ? 14 : 17, color: 'white' }}>
													Rp.{v.price_ea},-
									</Text>
											</View>
										</TouchableOpacity>
									);
								})}
							</ScrollView>
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
								<Icon name='ios-list' type='ionicon' color={isDarkMode ? '#B1B1B1' : 'blue'} />
								<Text style={{ textAlign: 'center', fontWeight: '600', fontSize: 16, marginLeft: 6, color: isDarkMode ? '#B1B1B1' : 'black' }}>
									See More
							</Text>
							</View>
							<View style={{ borderBottomColor: '#2296F3', borderBottomWidth: 1 }} />
						</View>
					</View>

					{/* Sponsored */}
					<View style={{ height: 17, backgroundColor: '#F2F2F4', opacity: isDarkMode ? 0.2 : 1, marginTop: 20 }} />
					<View style={{ flex: 1, padding: 16 }}>
						<View style={{ justifyContent: 'space-between', flexDirection: 'row' }}>
							<Text style={{ fontSize: 17, color: isDarkMode ? '#B1B1B1' : 'black' }}>Sponsored</Text>
							<Icon name='ios-list' type='ionicon' color={isDarkMode ? '#B1B1B1' : 'blue'} />
						</View>
						<View style={{ marginTop: 10 }}>
							<ScrollView horizontal={true} style={{ flexDirection: 'row' }} showsHorizontalScrollIndicator={false}>
								{menu_list.map((v, i) => {
									return (
										<TouchableOpacity key={i} onPress={() => ViewSingleFood(v, i)} style={{ marginHorizontal: 16 }}>
											<View
												style={{
													borderRadius: 8,
													width: width < 410 ? 170 : 240,
													height: width < 410 ? 170 : 240,
													position: 'relative'
												}}
											>
												<Image resizeMod='cover'
													style={{

														borderRadius: 8,
														resizeMode: 'stretch',
														flex: 1
													}}
													source={{ uri: images[Math.floor(Math.random() * images.length)] }}
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
													{v.menu_name}
												</Text>
												<Text style={{ marginTop: 2, fontSize: width < 410 ? 14 : 17, color: 'white' }}>
													Rp.{v.price_ea},-
									</Text>
											</View>
										</TouchableOpacity>
									);
								})}
							</ScrollView>
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
								<Icon name='ios-list' type='ionicon' color={isDarkMode ? '#B1B1B1' : 'blue'} />
								<Text style={{ textAlign: 'center', fontWeight: '600', fontSize: 16, marginLeft: 6, color: isDarkMode ? '#B1B1B1' : 'black' }}>
									See More
							</Text>
							</View>
							<View style={{ borderBottomColor: '#2296F3', borderBottomWidth: 1 }} />
						</View>
					</View>

				</Animated.ScrollView>
				{
					refresh ? null : (
						<View style={{ justifyContent: 'flex-end', margin: 12, alignItems: 'center' }}>
							<View style={{ padding: 16, flexDirection: 'row', height: 50, alignItems: 'center' }}>
								<TouchableOpacity activeOpacity={0.6} onPress={() => AddToOrderList(p, p.id)} style={{ borderColor: '#2296F3', margin: 6, padding: 6, height: 40, width: width - (16 * 2) - (12 * 2) - 50, borderRadius: 5, borderWidth: 1, justifyContent: "center", alignItems: 'center', backgroundColor: '#2296F3' }}>
									<Text style={{ color: 'white' }}>ORDER</Text>
								</TouchableOpacity>
								<TouchableOpacity onPress={() => sheetRef.open()} style={{ margin: 6, padding: 6, height: 40, width: 40, borderRadius: 5, borderWidth: 1, justifyContent: "center", alignItems: 'center', borderColor: '#2296F3' }}>
									<Icon name='ios-more' color={isDarkMode ? 'white' : 'blue'} type='ionicon' />
								</TouchableOpacity>
							</View>
						</View>
					)
				}
				<View
					style={{
						position: 'absolute',
						top: 0,
						left: 0,
						marginTop: statusBarHeight,
						height: 60,
						backgroundColor: 'transparent',
						marginBottom: 10
					}}
				>
					<View style={{ flex: 1, position: 'relative' }}>
						<Animated.View
							style={{
								backgroundColor: 'rgba(22,18,18,0.72)',
								height: '100%',
								width: '100%',
								opacity: backgroundHeadingOpacity,
								position: 'absolute'
							}}
						/>

						<View
							style={{
								paddingHorizontal: 10,
								flexDirection: 'row',
								alignItems: 'center',
								zIndex: 10,
								opacity: 0.9
							}}
						>
							<TouchableOpacity
								onPress={() => props.navigation.goBack()}
								style={{
									padding: 5,
									height: 40,
									width: 40,
									justifyContent: 'center',
									alignItems: 'center',
									marginTop: 10
								}}
							>
								<Icon name='md-arrow-round-back' color='white' type='ionicon' size={20} />
							</TouchableOpacity>
							<Animated.View style={{ alignItems: 'center', opacity: headingOpacity }}>
								<TouchableOpacity disabled={refresh ? true : false} onPress={() => props.navigation.navigate('View_Warung', { currentLocation })}
									activeOpacity={0.4}
									style={{
										flexDirection: 'row',
										marginTop: 10,
										padding: 5,
										width: width - 10 * 2 - 40 * 3,
										alignItems: 'center'
									}}
								>
									<View style={{ justifyContent: 'center', alignItems: 'center', borderRadius: 7 }}>
										<Image source={require('../../../../assets/banner/q3.png')} style={{ height: 35, width: 35, borderRadius: 7 }} resizeMode='cover' />
									</View>
									<View style={{ flex: 1 }}>
										<View style={{ position: 'relative' }}>
											<Animated.Text numberOfLines={1} ellipsizeMode='tail'
												style={{
													color: 'white',
													opacity: 1,
													marginLeft: 5,
													fontSize: 18,
													fontWeight: 'bold',
													letterSpacing: 0.6,
													position: 'absolute'
												}}
											>
												{p.warung}
											</Animated.Text>
										</View>

										<Animated.Text
											style={{
												color: 'white',
												opacity: 1,
												marginLeft: 5,
												fontSize: 14,
												marginTop: 20
											}}
										>
											Mon - Fri | 07:00 - 17:00
							</Animated.Text>
									</View>
								</TouchableOpacity>
							</Animated.View>

							<TouchableOpacity disabled={cart_count > 0 ? false : true} activeOpacity={0.5} onPress={() => props.navigation.navigate('Cart')}
								style={{
									padding: 5,
									height: 40,
									width: 40,
									justifyContent: 'center',
									alignItems: 'center',
									marginTop: 10
								}}
							>
								<Icon name='ios-cart' color='white' type='ionicon' size={20} />
							</TouchableOpacity>
							<TouchableOpacity activeOpacity={0.5} onPress={() => sheetRef.open()}
								style={{
									padding: 5,
									height: 40,
									width: 40,
									justifyContent: 'center',
									alignItems: 'center',
									marginTop: 10
								}}
							>
								<Icon name='md-more' color='white' type='ionicon' size={20} />
							</TouchableOpacity>
						</View>
					</View>
					<View
						style={{ borderBottomColor: 'silver', borderBottomWidth: 1, position: 'absolute', marginTop: 10 }}
					/>
				</View>
			</View>

		</React.Fragment>

	)
}

export default ViewPost;