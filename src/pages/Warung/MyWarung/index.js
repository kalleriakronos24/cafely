import React, { useState, useRef, forwardRef, useEffect } from 'react';
import {
	View,
	FlatList,
	ScrollView,
	ToastAndroid,
	Text,
	Dimensions,
	TextInput,
	TouchableOpacity,
	Image,
	RefreshControl
} from 'react-native';
import { Icon } from 'react-native-elements';
import ImagePicker from 'react-native-image-picker';

import * as geolib from 'geolib';
import Geolocation from '@react-native-community/geolocation';
import RNAndroidLocationEnabler from 'react-native-android-location-enabler';
import Geocoder from 'react-native-geocoding';
import { useCombinedRefs } from '../../../config/utils/combined_ref';
import { Modalize } from 'react-native-modalize';
Geocoder.init('AIzaSyCbpEHfzwBGfdSIfbFCODyH_muffddTZvg');
import NumericInput from 'react-native-numeric-input';
import { useSelector, useDispatch } from 'react-redux';
import { ADD_CART_COUNT, ADD_CART_ITEMS, VIEW_SINGLE } from '../../../Redux/actions/action';

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
					<View style={{ padding: 5 }}>
						<Text style={{ fontSize: 18, textAlign: 'center' }}>
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
		<Modalize ref={combinedRef} adjustToContentHeight={true}>
			{modalContent()}
		</Modalize>
	);
});

export const CreateWarung = ({ navigation }) => {
	const width = Dimensions.get('window').width;
	let [
		namaCheck,
		setNamaCheck
	] = useState(false);
	let [
		alamatCheck,
		setAlamatCheck
	] = useState(false);
	let [
		nama,
		setNama
	] = useState('');
	let [
		alamat,
		setAlamat
	] = useState('');

	let [
		namaErrorMessage,
		setNamaErrMsg
	] = useState('');
	let [
		alamatErrMsg,
		setAlamatErrMsg
	] = useState('');

	const nameValidation = (name) => {
		if (name === '') {
			setNamaErrMsg('Nama tidak boleh kosong.');
			setNamaCheck(false);
		}
		else {
			setNamaCheck(true);
		}
	};
	const alamatValidation = (alamat) => {
		if (alamat === '') {
			setAlamatErrMsg('Alamat tidak boleh kosong.');
			setAlamatCheck(false);
		}
		else {
			setAlamatCheck(true);
		}
	};
	return (
		<React.Fragment>
			<View
				style={{
					flex: 1,
					backgroundColor: 'white',
					justifyContent: 'center',
					alignItems: 'center'
				}}
			>
				<View style={{ padding: 16 }}>
					<View style={{ marginTop: -70, justifyContent: 'center', alignItems: 'center' }}>
						<Text style={{ fontSize: 30, fontWeight: 'bold' }}>Daftarkan Warung</Text>
					</View>

					<View style={{ padding: 6, width: width - 35 * 2, flexDirection: 'column', paddingTop: 20 }}>
						<View style={{ marginBottom: 6, flexDirection: 'row', alignItems: 'center' }}>
							<Text style={{ fontSize: 22, fontWeight: '600' }}>Nama Warung</Text>
							<Text style={{ fontSize: 16, fontWeight: '300', marginLeft: 6 }}> (Maks.30)</Text>
						</View>
						<View
							style={{
								padding: 4,
								borderColor: 'blue',
								borderWidth: 1,
								height: 50,
								borderRadius: 5,
								flexDirection: 'row',
								alignItems: 'center',
								justifyContent: 'space-between'
							}}
						>
							<TextInput
								value={nama}
								onChangeText={(v) => setNama(v)}
								placeholder='Warung simpang tiga'
								style={{ flex: 1 }}
								onEndEditing={() => nameValidation(nama)}
							/>
							{nama !== '' ? (
								<View style={{ padding: 4, justifyContent: 'center', alignItems: 'center' }}>
									<Icon name='ios-checkmark-circle' type='ionicon' />
								</View>
							) : null}
						</View>
					</View>
					{!namaCheck ? <Text style={{ color: 'red', padding: 4 }}>{namaErrorMessage}</Text> : null}
					<View style={{ padding: 6, width: width - 35 * 2, flexDirection: 'column' }}>
						<View style={{ marginBottom: 6, flexDirection: 'row', alignItems: 'center' }}>
							<Text style={{ fontSize: 22, fontWeight: '600' }}>Alamat Warung</Text>
							<Text style={{ fontSize: 16, fontWeight: '300', marginLeft: 6 }}> (Lengkap)</Text>
						</View>
						<View
							style={{
								padding: 4,
								borderColor: 'blue',
								borderWidth: 1,
								height: 70,
								borderRadius: 5,
								flexDirection: 'row',
								justifyContent: 'space-between'
							}}
						>
							<TextInput
								value={alamat}
								onChangeText={(v) => setAlamat(v)}
								multiline={true}
								placeholder='Jalan santi murni blok d rt 14 no 510 sungai kapih sambutan'
								style={{ flex: 1, textAlign: 'justify' }}
								textContentType='password'
								onEndEditing={() => alamatValidation(alamat)}
							/>
							{alamat !== '' ? (
								<View style={{ padding: 4, justifyContent: 'center', alignItems: 'center' }}>
									<Icon name='ios-checkmark-circle' type='ionicon' />
								</View>
							) : null}
						</View>
					</View>

					<TouchableOpacity
						onPress={() => navigation.navigate('UploadFotoWarung')}
						style={{ justifyContent: 'center', alignItems: 'center' }}
						disabled={nama === '' || alamat === '' ? true : false}
					>
						<View
							style={{
								marginTop: 15,
								padding: 6,
								borderColor: nama === '' || alamat === '' ? 'red' : 'blue',
								borderWidth: 1,
								height: 43,
								width: 140,
								borderRadius: 25,
								alignItems: 'center',
								justifyContent: 'center'
							}}
						>
							<Text style={{ fontSize: 18, fontWeight: '500' }}>Next</Text>
						</View>
					</TouchableOpacity>
				</View>
			</View>
		</React.Fragment>
	);
};

export const UploadFotoWarung = ({ navigation }) => {
	let [
		image,
		setImage
	] = useState('');
	let [
		filename,
		setFilename
	] = useState('');
	const { width } = Dimensions.get('window');

	const openGallery = () => {
		const options = {
			mediaType: 'photo',
			quality: 1.0,
			maxWidth: 500,
			maxHeight: 500,
			storageOptions: {
				skipBackup: true
			}
		};
		ImagePicker.launchImageLibrary(options, (res) => {
			if (res.didCancel) {
				setImage('');
			}
			else if (res.error) {
				console.log(res.error);
			}
			else {
				const source = { uri: res.uri };

				setImage(source);
				setFilename(res.fileName);
			}
		});
	};
	const t = filename.length > 20 ? filename.slice(0, 20) + '... ' + 'Selected' : null;
	return (
		<React.Fragment>
			<View
				style={{
					flex: 1,
					backgroundColor: 'white',
					justifyContent: 'center',
					alignItems: 'center'
				}}
			>
				<View style={{ padding: 16 }}>
					<View style={{ marginTop: -70, justifyContent: 'center', alignItems: 'center' }}>
						<Text style={{ fontSize: 30, fontWeight: 'bold' }}>Foto Profil Warung</Text>
					</View>

					<View style={{ padding: 6, width: width - 35 * 2, flexDirection: 'column', paddingTop: 30 }}>
						<View style={{ marginBottom: 6, flexDirection: 'row', alignItems: 'center' }}>
							<Text style={{ fontSize: 15 }}>Upload Foto Profil Warung (Maks 1)</Text>
						</View>
						<TouchableOpacity
							activeOpacity={0.5}
							onPress={() => openGallery()}
							style={{
								padding: 4,
								borderColor: 'blue',
								borderWidth: 1,
								height: 50,
								borderRadius: 5,
								flexDirection: 'row',
								justifyContent: 'space-between',
								alignItems: 'center'
							}}
						>
							<View style={{ flexDirection: 'row', alignItems: 'center' }}>
								<Icon name='ios-images' type='ionicon' />
								<Text
									numberOfLines={1}
									ellipsizeMode={'tail'}
									style={{ color: image !== '' ? 'black' : 'silver', marginLeft: 5 }}
								>
									{image !== '' ? t : 'Choose Image'}
								</Text>
							</View>

							{image !== '' ? (
								<View style={{ padding: 4, justifyContent: 'center', alignItems: 'center' }}>
									<Icon name='ios-checkmark-circle' type='ionicon' />
								</View>
							) : null}
						</TouchableOpacity>
					</View>
					{image !== '' ? (
						<View style={{ width: 70, height: 70, borderWidth: 3, marginLeft: 6, borderRadius: 10 }}>
							<Image style={{ resizeMode: 'cover', flex: 1, borderRadius: 10 }} source={image} />
						</View>
					) : null}

					<TouchableOpacity
						onPress={() => navigation.navigate('SelectWarungLocation')}
						style={{ justifyContent: 'center', alignItems: 'center' }}
						disabled={image !== '' ? false : true}
					>
						<View
							style={{
								marginTop: 15,
								padding: 6,
								borderColor: image !== '' ? 'blue' : 'red',
								borderWidth: 1,
								height: 43,
								width: 140,
								borderRadius: 25,
								alignItems: 'center',
								justifyContent: 'center'
							}}
						>
							<Text style={{ fontSize: 18, fontWeight: '500' }}>Next</Text>
						</View>
					</TouchableOpacity>
				</View>
			</View>
		</React.Fragment>
	);
};

export const SelectWarungLocation = ({ navigation }) => {
	let [
		location,
		setLocation
	] = useState(0);

	let [
		refresh,
		setRefresh
	] = useState(false);
	const { width } = Dimensions.get('window');
	const modals = Array.from({ length: 1 }).map((_) => useRef(null).current);

	const onRefresh = React.useCallback(
		() => {
			setRefresh(true);

			Geolocation.getCurrentPosition(
				(position) => {
					location_service = true;
					setLocation(position.coords);

					wait(1000).then(() => setRefresh(false));
				},
				(err) => {
					location_service = false;
					modals[0].open();
				},
				{ enableHighAccuracy: true, distanceFilter: 100, timeout: 10000, maximumAge: 5000 }
			);
		},
		[
			refresh
		]
	);
	const openModal = () => {
		modals[0].open();
	};
	const wait = (timeout) => {
		return new Promise((resolve, reject) => {
			setTimeout(resolve, timeout);
		});
	};
	return (
		<React.Fragment>
			<EnableLocationModal ref={(el) => (modals[0] = el)} refresh_state={() => onRefresh()} />
			<View
				style={{
					flex: 1,
					backgroundColor: 'white',
					justifyContent: 'center',
					alignItems: 'center'
				}}
				refreshControl={<RefreshControl refreshing={refresh} onRefresh={onRefresh} />}
			>
				<View style={{ padding: 16 }}>
					<View style={{ marginTop: -70, justifyContent: 'center', alignItems: 'center' }}>
						<Text style={{ fontSize: 30, fontWeight: 'bold' }}>Lokasi Warung</Text>
					</View>

					<View style={{ padding: 6, width: width - 35 * 2, flexDirection: 'column', paddingTop: 30 }}>
						<View style={{ marginBottom: 6, flexDirection: 'row', alignItems: 'center' }}>
							<Text style={{ fontSize: 15 }}>Pilih Lokasi Warung melalui Google Maps</Text>
						</View>
						<TouchableOpacity
							activeOpacity={0.5}
							onPress={() => openModal()}
							style={{
								padding: 4,
								borderColor: 'blue',
								borderWidth: 1,
								height: 50,
								borderRadius: 5,
								flexDirection: 'row',
								justifyContent: 'space-between',
								alignItems: 'center'
							}}
						>
							<View style={{ flexDirection: 'row', alignItems: 'center' }}>
								<Icon name='ios-map' type='ionicon' />
								<Text
									numberOfLines={1}
									ellipsizeMode={'tail'}
									style={{ color: location !== 0 ? 'black' : 'silver', marginLeft: 5 }}
								>
									{location !== 0 ? 'Selected' : 'Pilih Lokasi'}
								</Text>
							</View>

							{location !== 0 ? (
								<View style={{ padding: 4, justifyContent: 'center', alignItems: 'center' }}>
									<Icon name='ios-checkmark-circle' type='ionicon' />
								</View>
							) : null}
						</TouchableOpacity>
					</View>

					<TouchableOpacity
						onPress={() => navigation.navigate('DishListing')}
						style={{ justifyContent: 'center', alignItems: 'center' }}
						disabled={location !== 0 ? false : true}
					>
						<View
							style={{
								marginTop: 15,
								padding: 6,
								borderColor: location !== 0 ? 'blue' : 'red',
								borderWidth: 1,
								height: 43,
								width: 140,
								borderRadius: 25,
								alignItems: 'center',
								justifyContent: 'center'
							}}
						>
							<Text style={{ fontSize: 18, fontWeight: '500' }}>Next</Text>
						</View>
					</TouchableOpacity>
				</View>
			</View>
		</React.Fragment>
	);
};

const ProductListing = ({
	View_Single_Food,
	distance,
	name,
	id,
	warung,
	NumHandler,
	price,
	AddToCardHandler,
	qty,
	pos,
	item
}) => {
	const width = Dimensions.get('window').width;
	return pos === 0 ? null : (
		<View style={{ padding: 6 }}>
			<View style={{ flexDirection: 'row' }}>
				<TouchableOpacity onPress={() => View_Single_Food(item, id)} style={{ borderRadius: 10 }}>
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
								width: '100%',
								flex: 1
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
							ellipsizeMode={'tail'}
							numberOfLines={2}
							style={{
								fontSize: width < 410 ? 15 : 18,
								fontWeight: 'bold',
								marginTop: 14,
								color: 'white',
								textTransform: 'capitalize'
							}}
						>
							{name}
						</Text>
						<Text style={{ marginTop: 2, fontSize: width < 410 ? 14 : 17, color: 'white' }}>
							Rp.{price},-
						</Text>
					</View>
				</TouchableOpacity>
				<View style={{ marginLeft: 16, flex: 1, flexDirection: 'column' }}>
					<Text
						ellipsizeMode={'tail'}
						numberOfLines={2}
						style={{
							fontSize: 20,
							fontWeight: 'bold',
							fontFamily: 'Roboto',
							textTransform: 'capitalize'
						}}
					>
						{name}
					</Text>
					<View style={{ padding: 4 }}>
						<Text style={{ fontSize: 15, marginTop: 5 }}>wqeqweqweqweqweqwewqeqweqweqwewqeqwewqe</Text>
					</View>
					<View
						style={{
							flex: 1,
							padding: 6,
							justifyContent: 'center',
							alignItems: 'center'
						}}
					>
						<View
							style={{
								width: '35%',
								height: 50,
								left: 0,
								top: 0,
								alignItems: 'center',
								justifyContent: 'center'
							}}
						>
							<NumericInput
								initValue={qty}
								value={qty}
								minValue={1}
								editable={true}
								onChange={(value) => NumHandler(id, value)}
								borderColor={'white'}
								totalHeight={34}
								containerStyle={{
									borderWidth: 0
								}}
								iconSize={25}
							/>
						</View>
						<TouchableOpacity
							onPress={() => AddToCardHandler(item, id)}
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
	);
};

export const DishListing = ({ navigation }) => {
	const CART_ITEMS = useSelector((state) => state.CART_ITEMS);
	const dispatch = useDispatch();
	let [
		menu_list,
		setMenuList
	] = useState([
		{
			id: 1,
			menu_name: 'Kerikil ABCQWEQWEWQEQWEWQE',
			price_ea: 8000,
			qty: 1,
			total: 8000,
			deleted_from_cart: false,
			distance: 0,
			warung: 'Warung Bu UDIN',
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
			warung: 'Warung Bu UDIN',
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
			warung: 'Warung Bu UDIN',
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
	const pos = {
		latitude: -0.53109341,
		longitude: 117.16818794
	};
	const ViewSingleFood = (val, idx) => {
		dispatch(VIEW_SINGLE({ val }));
		if (val !== null) {
			props.navigation.navigate('FoodSingle');
		}
	};

	const AddToOrderList = (val, idx) => {
		if (CART_ITEMS.CART_ITEMS.some((v, i) => v.id === val.id)) {
			ToastAndroid.showWithGravity(
				val.menu_name + ' sudah ada di keranjang',
				ToastAndroid.SHORT,
				ToastAndroid.BOTTOM,
				25,
				50
			);
			return;
		}
		dispatch({ type: 'EDIT_VALUE_TO_MINIM', id: idx, qty: val.qty, total: val.total });

		dispatch(ADD_CART_COUNT());
		dispatch(ADD_CART_ITEMS({ val }));
	};

	const IncreaseQtyNum = (index, value) => {
		setMenuList(
			(menu_list = menu_list.map(
				(v, i) => (v.id == index ? Object.assign(v, { qty: value, total: v.price_ea * value }) : v)
			))
		);
	};
	const empty = true;
	return (
		<ScrollView style={{ flex: 1, backgroundColor: 'white' }} showsVerticalScrollIndicator={false}>
			<View style={{ padding: 16 }}>
				<View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
					<View
						style={{
							flexDirection: 'row',
							justifyContent: 'center',
							alignItems: 'center'
						}}
					>
						<Text style={{ fontWeight: '700', fontSize: 24, letterSpacing: 1 }}>Food</Text>

						<Text style={{ marginLeft: 2, fontSize: 18 }}> - 0</Text>
					</View>
					<TouchableOpacity
						activeOpacity={0.5}
						onPress={() => navigation.navigate('AddDish', { type: 'Food' })}
						style={{
							paddingVertical: 6,
							justifyContent: 'center',
							alignItems: 'center',
							flexDirection: 'row'
						}}
					>
						<Icon name='ios-add' size={30} type='ionicon' />
					</TouchableOpacity>
				</View>
				{empty ? null : (
					<FlatList
						data={menu_list}
						renderItem={({ item }) => (
							<ProductListing
								id={item.id}
								pos={pos}
								warung={item.warung}
								View_Single_Food={ViewSingleFood}
								AddToCardHandler={AddToOrderList}
								name={item.menu_name}
								NumHandler={IncreaseQtyNum}
								price={item.price_ea}
								qty={item.qty}
								distance={item.distance}
								item={item}
							/>
						)}
						keyExtractor={(item) => item.id}
					/>
				)}

				<View style={{ flex: 1 }}>
					<View
						style={{
							padding: 10,
							flexDirection: 'row',
							justifyContent: 'center',
							alignItems: 'center'
						}}
					>
						<Text style={{ textAlign: 'center', fontWeight: '600', fontSize: 16, marginLeft: 6 }}>
							{empty ? '- Tidak ada data ditemukan -' : 'Last Updated Sun, 29 Apr 2020'}
						</Text>
					</View>
					<View style={{ borderBottomColor: '#2296F3', borderBottomWidth: 1 }} />
				</View>
			</View>
			<View style={{ padding: 16 }}>
				<View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
					<View style={{ paddingVertical: 6 }}>
						<Text style={{ fontWeight: '700', fontSize: 24, letterSpacing: 1 }}>Drink</Text>
					</View>
					<TouchableOpacity
						activeOpacity={0.5}
						onPress={() => navigation.navigate('AddDish', { type: 'Drink' })}
						style={{
							paddingVertical: 6,
							justifyContent: 'center',
							alignItems: 'center',
							flexDirection: 'row'
						}}
					>
						<Icon name='ios-add' size={30} type='ionicon' />
					</TouchableOpacity>
				</View>
				{empty ? null : (
					<FlatList
						data={menu_list}
						renderItem={({ item }) => (
							<ProductListing
								id={item.id}
								pos={pos}
								warung={item.warung}
								View_Single_Food={ViewSingleFood}
								AddToCardHandler={AddToOrderList}
								name={item.menu_name}
								NumHandler={IncreaseQtyNum}
								price={item.price_ea}
								qty={item.qty}
								distance={item.distance}
								item={item}
							/>
						)}
						keyExtractor={(item) => item.id}
					/>
				)}

				<View style={{ flex: 1 }}>
					<View
						style={{
							padding: 10,
							flexDirection: 'row',
							justifyContent: 'center',
							alignItems: 'center'
						}}
					>
						<Text style={{ textAlign: 'center', fontWeight: '600', fontSize: 16, marginLeft: 6 }}>
							{empty ? '- Tidak ada data ditemukan -' : 'Last Updated Sun, 29 Apr 2020'}
						</Text>
					</View>
					<View style={{ borderBottomColor: '#2296F3', borderBottomWidth: 1 }} />
				</View>
			</View>
			<View style={{ padding: 16 }}>
				<View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
					<View style={{ paddingVertical: 6 }}>
						<Text style={{ fontWeight: '700', fontSize: 24, letterSpacing: 1 }}>Cemilan</Text>
					</View>
					<TouchableOpacity
						activeOpacity={0.5}
						onPress={() => navigation.navigate('AddDish', { type: 'Cemilan' })}
						style={{
							paddingVertical: 6,
							justifyContent: 'center',
							alignItems: 'center',
							flexDirection: 'row'
						}}
					>
						<Icon name='ios-add' size={30} type='ionicon' />
					</TouchableOpacity>
				</View>
				{empty ? null : (
					<FlatList
						data={menu_list}
						renderItem={({ item }) => (
							<ProductListing
								id={item.id}
								pos={pos}
								warung={item.warung}
								View_Single_Food={ViewSingleFood}
								AddToCardHandler={AddToOrderList}
								name={item.menu_name}
								NumHandler={IncreaseQtyNum}
								price={item.price_ea}
								qty={item.qty}
								distance={item.distance}
								item={item}
							/>
						)}
						keyExtractor={(item) => item.id}
					/>
				)}

				<View style={{ flex: 1 }}>
					<View
						style={{
							padding: 10,
							flexDirection: 'row',
							justifyContent: 'center',
							alignItems: 'center'
						}}
					>
						<Text style={{ textAlign: 'center', fontWeight: '600', fontSize: 16, marginLeft: 6 }}>
							{empty ? '- Tidak ada data ditemukan -' : 'Last Updated Sun, 29 Apr 2020'}
						</Text>
					</View>
					<View style={{ borderBottomColor: '#2296F3', borderBottomWidth: 1 }} />
				</View>
			</View>
		</ScrollView>
	);
};

export const AddDish = ({ navigation, route }) => {
	let [
		image,
		setImage
	] = useState('');
	let [
		filename,
		setFilename
	] = useState('');
	const { width } = Dimensions.get('window');
	let [
		name,
		setName
	] = useState('');
	let [
		desc,
		setDesc
	] = useState('');
	let [
		price,
		setPrice
	] = useState('');
	let { type } = route.params;
	let indexType = type;
	let [
		alamat,
		setAlamat
	] = useState('');
	const openGallery = () => {
		const options = {
			mediaType: 'photo',
			quality: 1.0,
			maxWidth: 500,
			maxHeight: 500,
			storageOptions: {
				skipBackup: true
			}
		};
		ImagePicker.launchImageLibrary(options, (res) => {
			if (res.didCancel) {
				setImage('');
			}
			else if (res.error) {
				console.log(res.error);
			}
			else {
				const source = { uri: res.uri };

				setImage(source);
				setFilename(res.fileName);
			}
		});
	};

	const t = filename.length > 20 ? filename.slice(0, 20) + '... ' + 'Selected' : null;
	return (
		<React.Fragment>
			<View
				style={{
					flex: 1,
					backgroundColor: 'white',
					justifyContent: 'center',
					alignItems: 'center'
				}}
			>
				<View style={{ padding: 16 }}>
					<View style={{ marginTop: -70, justifyContent: 'center', alignItems: 'center' }}>
						<Text style={{ fontSize: 30, fontWeight: 'bold' }}>{type + 's'}</Text>
					</View>
					<View style={{ padding: 6, width: width - 35 * 2, flexDirection: 'column', paddingTop: 30 }}>
						<View style={{ marginBottom: 6, flexDirection: 'row', alignItems: 'center' }}>
							<Text style={{ fontSize: 15 }}>Name</Text>
						</View>
						<TouchableOpacity
							activeOpacity={0.5}
							style={{
								padding: 4,
								borderColor: 'blue',
								borderWidth: 1,
								height: 50,
								borderRadius: 5,
								flexDirection: 'row',
								justifyContent: 'space-between',
								alignItems: 'center'
							}}
						>
							<View style={{ flexDirection: 'row', alignItems: 'center' }}>
								<Icon name='ios-restaurant' type='ionicon' />
								<TextInput style={{ marginLeft: 5 }} placeholder='Nasi Kucing.' />
							</View>

							{image !== '' ? (
								<View style={{ padding: 4, justifyContent: 'center', alignItems: 'center' }}>
									<Icon name='ios-checkmark-circle' type='ionicon' />
								</View>
							) : null}
						</TouchableOpacity>
					</View>
					<View style={{ padding: 6, width: width - 35 * 2, flexDirection: 'column' }}>
						<View style={{ marginBottom: 6, flexDirection: 'row', alignItems: 'center' }}>
							<Text style={{ fontSize: 15 }}>Harga (Rp.)</Text>
						</View>
						<TouchableOpacity
							activeOpacity={0.5}
							style={{
								padding: 4,
								borderColor: 'blue',
								borderWidth: 1,
								height: 50,
								borderRadius: 5,
								flexDirection: 'row',
								justifyContent: 'space-between',
								alignItems: 'center'
							}}
						>
							<View style={{ flexDirection: 'row', alignItems: 'center' }}>
								<Text style={{ fontWeight: 'bold', fontSize: 17 }}>Rp.</Text>
								<TextInput placeholder='8000' keyboardType='numeric' style={{ flex: 1 }} />
							</View>

							{image !== '' ? (
								<View style={{ padding: 4, justifyContent: 'center', alignItems: 'center' }}>
									<Icon name='ios-checkmark-circle' type='ionicon' />
								</View>
							) : null}
						</TouchableOpacity>
					</View>
					<View style={{ padding: 6, width: width - 35 * 2, flexDirection: 'column' }}>
						<View style={{ marginBottom: 6, flexDirection: 'row', alignItems: 'center' }}>
							<Text style={{ fontSize: 15 }}>Type (Food, Drink, Cemilan...)</Text>
						</View>
						<TouchableOpacity
							activeOpacity={0.5}
							style={{
								padding: 4,
								borderColor: 'blue',
								borderWidth: 1,
								height: 50,
								borderRadius: 5,
								flexDirection: 'row',
								justifyContent: 'space-between',
								alignItems: 'center'
							}}
						>
							<View style={{ flexDirection: 'row', alignItems: 'center' }}>
								<Icon name='ios-restaurant' type='ionicon' />
								<TextInput editable={false} value={type} style={{ marginLeft: 5, color: 'black' }} />
							</View>
							<View style={{ padding: 4, justifyContent: 'center', alignItems: 'center' }}>
								<Icon name='ios-checkmark-circle' type='ionicon' />
							</View>
						</TouchableOpacity>
					</View>
					<View style={{ padding: 6, width: width - 35 * 2, flexDirection: 'column' }}>
						<View style={{ marginBottom: 6 }}>
							<Text style={{ fontSize: 15 }}>Description</Text>
						</View>
						<View
							style={{
								padding: 4,
								borderColor: 'blue',
								borderWidth: 1,
								height: 70,
								borderRadius: 5,
								flexDirection: 'row',
								justifyContent: 'space-between'
							}}
						>
							<TextInput
								onChangeText={(v) => setAlamat(v)}
								multiline={true}
								placeholder='Jalan santi murni blok d rt 14 no 510 sungai kapih sambutan'
								style={{ flex: 1, textAlign: 'justify' }}
							/>
							{alamat !== '' && alamat.length < 20 ? (
								<View style={{ padding: 4, justifyContent: 'center', alignItems: 'center' }}>
									<Icon name='ios-checkmark-circle' type='ionicon' />
								</View>
							) : null}
						</View>
					</View>
					<View style={{ padding: 6, width: width - 35 * 2, flexDirection: 'column', paddingTop: 30 }}>
						<View style={{ marginBottom: 6, flexDirection: 'row', alignItems: 'center' }}>
							<Text style={{ fontSize: 15 }}>Upload Foto Makanan (Maks 1)</Text>
						</View>
						<TouchableOpacity
							activeOpacity={0.5}
							onPress={() => openGallery()}
							style={{
								padding: 4,
								borderColor: 'blue',
								borderWidth: 1,
								height: 50,
								borderRadius: 5,
								flexDirection: 'row',
								justifyContent: 'space-between',
								alignItems: 'center'
							}}
						>
							<View style={{ flexDirection: 'row', alignItems: 'center' }}>
								<Icon name='ios-images' type='ionicon' />
								<Text
									numberOfLines={1}
									ellipsizeMode={'tail'}
									style={{ color: image !== '' ? 'black' : 'silver', marginLeft: 5 }}
								>
									{image !== '' ? t : 'Choose Image'}
								</Text>
							</View>

							{image !== '' ? (
								<View style={{ padding: 4, justifyContent: 'center', alignItems: 'center' }}>
									<Icon name='ios-checkmark-circle' type='ionicon' />
								</View>
							) : null}
						</TouchableOpacity>
					</View>
					{image !== '' ? (
						<View style={{ width: 70, height: 70, borderWidth: 3, marginLeft: 6, borderRadius: 10 }}>
							<Image style={{ resizeMode: 'cover', flex: 1, borderRadius: 10 }} source={image} />
						</View>
					) : null}

					<TouchableOpacity
						onPress={() => navigation.navigate('SelectWarungLocation')}
						style={{ justifyContent: 'center', alignItems: 'center' }}
						disabled={image !== '' ? false : true}
					>
						<View
							style={{
								marginTop: 15,
								padding: 6,
								borderColor: image !== '' ? 'blue' : 'red',
								borderWidth: 1,
								height: 43,
								width: 140,
								borderRadius: 25,
								alignItems: 'center',
								justifyContent: 'center'
							}}
						>
							<Text style={{ fontSize: 18, fontWeight: '500' }}>Next</Text>
						</View>
					</TouchableOpacity>
				</View>
			</View>
		</React.Fragment>
	);
};
