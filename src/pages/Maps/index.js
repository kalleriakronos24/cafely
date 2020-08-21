import React, { useState, useEffect, useRef } from 'react';
import { View, Image, TouchableOpacity, Dimensions, Text } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import MapView, { MarkerAnimated } from 'react-native-maps';
import MapViewDirections from 'react-native-maps-directions';
import * as geolib from 'geolib';
import Geolocation from '@react-native-community/geolocation';
import RNAndroidLocationEnabler from 'react-native-android-location-enabler';
import Geocoder from 'react-native-geocoding';
import { DEC_CART_COUNT, VIEW_SINGLE } from '../../Redux/actions/action';
import { Icon } from 'react-native-elements';

Geocoder.init('AIzaSyCbpEHfzwBGfdSIfbFCODyH_muffddTZvg');

export let Maps = ({ navigation, route }) => {
	let dispatch = useDispatch();
	let cart = useSelector((state) => state.CART_ITEMS);
	let cart_count = useSelector((state) => state.CART_COUNT);
	const order_list = false;

	let [
		pos,
		setPos
	] = useState(0);
	let [
		address,
		setAddress
	] = useState('');
	let [
		val,
		setVal
	] = useState(0);
	let [
		isVisible,
		setVisible
	] = useState(false);
	let [
		order_type,
		setOrderType
	] = useState({
		name : 'Biasa',
		text : 'Pesanan Biasa artinya Pesanan yang langsung Dikirim Hari Ini Juga'
	});

	let { width, height } = Dimensions.get('window');
	let [
		is_checked,
		setCheck
	] = useState(true);
	let [
		is_checked_2,
		setCheck1
	] = useState(false);
	let [
		order_hours,
		setOrderHours
	] = useState('--');
	let [
		order_minutes,
		setOrderMinutes
	] = useState('--');
	let [
		order_count,
		setOrderCount
	] = useState(0);
	let [
		order_items,
		setOrderItems
	] = useState([]);
	let [
		subtotal,
		setSub
	] = useState(0);
	let [
		hours
	] = useState([
		'00',
		'01',
		'02',
		'03',
		'04',
		'05',
		'06',
		'07',
		'08',
		'09',
		'10',
		'11',
		'12',
		'13',
		'14',
		'15',
		'16',
		'17',
		'18',
		'19',
		'20',
		'21',
		'22',
		'23'
	]);
	let [
		minutes
	] = useState([
		'00',
		'01',
		'02',
		'03',
		'04',
		'05',
		'06',
		'07',
		'08',
		'09',
		'10',
		'11',
		'12',
		'13',
		'14',
		'15',
		'16',
		'17',
		'18',
		'19',
		'20',
		'21',
		'22',
		'23',
		'24',
		'25',
		'26',
		'27',
		'28',
		'29',
		'30',
		'31',
		'32',
		'33',
		'34',
		'35',
		'36',
		'37',
		'38',
		'39',
		'40',
		'41',
		'42',
		'43',
		'44',
		'45',
		'46',
		'47',
		'48',
		'49',
		'50',
		'51',
		'52',
		'53',
		'54',
		'55',
		'56',
		'57',
		'58',
		'59'
	]);

	useEffect(() => {
		setOrderItems((order_items = cart.CART_ITEMS));
		setOrderCount((order_count = cart_count));
	}, []);
	const OrderTypeHandler = (val) => {
		switch (val) {
			case 'Biasa':
				setOrderType(
					(order_type = {
						name : 'Biasa',
						text : 'Pesanan Biasa artinya Pesanan yang langsung Dikirim Hari Ini Juga'
					})
				);
				break;
			case 'Acara':
				setOrderType(
					(order_type = {
						name : 'Acara',
						text : 'Pesanan Acara artinya Pesanan yang dikirim berdasarkan waktu yang ditentukan.'
					})
				);
				break;
			default:
				null;
		}
	};

	const GetCurrentLocation = (e) => {
		RNAndroidLocationEnabler.promptForEnableLocationIfNeeded({ interval: 10000, fastInterval: 5000 })
			.then((data) => {
				if (data) {
					Geolocation.getCurrentPosition(
						(position) => {
							setPos((pos = position.coords));

							console.log(position);
							console.log(
								'You are ',
								geolib.getDistance(position.coords, {
									latitude  : -0.530587,
									longitude : 117.168558
								}),
								'meters away from 51.525, 7.4575'
							);
						},
						(err) => {
							alert('Lokasi Tidak Ditemukan', err);
						},
						{ enableHighAccuracy: true, distanceFilter: 100, timeout: 20000, maximumAge: 1000 }
					);
				}
				// The user has accepted to enable the location services
				// data can be :
				//  - "already-enabled" if the location services has been already enabled
				//  - "enabled" if user has clicked on OK button in the popup
			})
			.catch((err) => {
				// The user has not accepted to enable the location services or something went wrong during the process
				// "err" : { "code" : "ERR00|ERR01|ERR02", "message" : "message"}
				// codes :
				//  - ERR00 : The user has clicked on Cancel button in the popup
				//  - ERR01 : If the Settings change are unavailable
				//  - ERR02 : If the popup has failed to open
				console.log(err);
			});
	};
	const isCheckedA = (e) => {
		setCheck((is_checked = true));
		setCheck1((is_checked_2 = false));
	};
	const isCheckedB = (e) => {
		setCheck((is_checked = false));
		setCheck1((is_checked_2 = true));
		setVisible((isVisible = true));
	};

	const RemoveCartItems = (val, idx) => {
		dispatch({ type: 'REMOVE', id: idx });
		dispatch(DEC_CART_COUNT());

		dispatch({ type: 'EDIT_VALUE_TO_DEFAULT', id: idx });
		dispatch({ type: 'EDIT_STATUS_MENU_LIST_TO_FALSE', id: idx });
	};

	const destination = { latitude: -0.49821, longitude: 117.156735 };
	const coordinate = {
			latitude  : -0.500376,
			longitude : 117.158409
		}
	const GOOGLE_MAPS_APIKEY = 'AIzaSyCbpEHfzwBGfdSIfbFCODyH_muffddTZvg';
	const waypoints = [
		-0.500376,
		117.158409,
		-0.49821,
		117.156735
	];

	const IncreaseQtyNum = (index, value) => {
		// dispatch({ type : 'CHANGE_PRICE_BY_QTY', id: index , qty : value })
		// dispatch({ type : 'CHANGE_PRICE_BY_QTY_MENU', id: index, qty : value })
		setOrderItems(
			(order_items = order_items.map(
				(v, i) => (v.id == index ? Object.assign(v, { qty: value, total: v.price_ea * value }) : v)
			))
		);
		// setMenuList(menu_list = menu_list.map((v,i) => (index == i ? Object.assign(v, { qty : value }) : v)));
		// setMenuList(menu_list = menu_list.map((x,y) => (index == y ? Object.assign(x, { total : x.price_ea * value }) : x)));
	};
	const { currLocation } = route.params;
	console.log('ini currlocation', currLocation);
	const ViewSingleFood = (val, idx) => {
		dispatch(VIEW_SINGLE({ val }));
		if (val !== null) {
			navigation.navigate('FoodSingle');
		}
	};
	var mapRef = useRef(null);

	const origin = { latitude: currLocation.latitude, longitude: currLocation.longitude };
	const mapFitToCoordinates = () => {
		return order_items.map((v, i) =>
			mapRef.fitToSuppliedMarkers(
				[
					'penerima',
					'mk' + i
				],
				{
					edgePadding : {
						top    : 150,
						right  : 150,
						left   : 150,
						bottom : 150
					}
				}
			)
		);
	};
	return order_list ? null : (
		<View style={{ flex: 1, backgroundColor: 'white', paddingTop: width < 410 ? 25 : 32 }}>
			<View style={{ flex: 1, position: 'relative' }}>
				<View
					style={{
						position         : 'absolute',
						zIndex           : 10,
						marginHorizontal : 17,
						paddingTop       : 15,
						flexDirection    : 'row'
					}}
				>
					<TouchableOpacity
						onPress={() => navigation.goBack()}
						style={{ width: 40, alignItems: 'center', marginTop: 5, marginRight: 10 }}
					>
						<Image style={{ width: 30, height: 30 }} source={require('../../../assets/icon/arrow_l.png')} />
					</TouchableOpacity>
				</View>

				<MapView
					ref={(ref) => (mapRef = ref)}
					onLayout={() => mapFitToCoordinates()}
					style={{ flex: 1 }}
					initialRegion={{
						latitude       : origin.latitude,
						longitude      : origin.longitude,
						longitudeDelta : 0.005,
						latitudeDelta  : 0.005
					}}
					zoomEnabled={true}
					cacheEnabled={true}
					loadingEnabled={true}
				>
					{order_items.map((v, i) => {
						return (
							<MapView.Marker
								identifier={'mk' + i}
								title='Pengirim'
								key={i}
								description='Lokasi Pengirim'
								coordinate={{ latitude: v.coords.latitude, longitude: v.coords.longitude }}
							>
								<View style={{ padding: 16, flexDirection: 'column', zIndex: 10 }}>
									<Text style={{ fontSize: 23 }}>{v.warung} </Text>
									<View style={{ padding: 3 }}>
										<Icon name='ios-pin' color='red' type='ionicon' size={40} />
									</View>
								</View>
							</MapView.Marker>
						);
					})}
					<MapView.Marker
						identifier='penerima'
						title='Penerima'
						description='Lokasi Penerima'
						coordinate={origin}
						key={1}
					>
						<View style={{ padding: 16, flexDirection: 'column', zIndex: 10 }}>
							<Text style={{ fontSize: 23 }}>Penerima </Text>
							<View style={{ padding: 3 }}>
								<Icon name='ios-pin' color='red' type='ionicon' size={40} />
							</View>
						</View>
					</MapView.Marker>
					<MapViewDirections
						origin={origin}
						destination={destination}
						apikey={GOOGLE_MAPS_APIKEY}
						strokeColor='black'
						strokeWidth={100}
						waypoints={coordinate}
						mode='DRIVING'
						optimizeWaypoints={true}
					/>
				</MapView>
			</View>
		</View>
	);
};

// export class Checkout extends Component {
//     letructor(props){
//         super(props);

//         this.state = {
//             address: '',
//             isVisible : false,
//             val : 0,
//             is_checked: true,
//             is_checked_2 : false,
//             order_type : {
//                 name : 'Biasa',
//                 text : 'Pesanan Biasa artinya Pesanan yang langsung Dikirim Hari Ini Juga'
//             },
//             selected_order : 'Biasa',
//            order_hours : '--',
//            order_minutes : '--',
//            order_counts : 0,
//            pos : 0,
//            order_items :[],
//             hours : ['00','01','02','03','04','05','06','07','08','09','10','11','12','13','14','15','16','17','18','19','20','21','22','23'],
//             minutes : ['00','01','02','03','04','05','06','07','08','09','10','11','12','13','14','15','16','17','18','19','20','21','22','23','24','25','26','27','28','29','30','31','32','33','34','35','36','37','38','39','40','41','42','43','44','45','46','47','48','49','50','51','52','53','54','55','56','57','58','59']
//         }
//     }
//     componentDidMount(){
//         this.setState({
//             order_items : $.cart_items,
//             order_counts : $.cart_counts
//         })
//     }

//     render() {

//         return (

//         )
//     }
// }

// Geocoder.from(position.coords.latitude, position.coords.longitude)
// .then(json => {
//         var addressComponent = json.results[0].formatted_address;
//         if(json){
//             this.setState({
//                 address: addressComponent
//             })
//         }
// })
// .catch(error => console.warn(error));

// <ScrollView style={{ flex: 1}}>
// <View style={{ padding: 16}}>
// <Text style={{ textAlign:'center', marginVertical: 16, fontSize: width / 22, fontWeight: 'bold'}}>CART</Text>
// <View style={{ borderWidth: 1, borderColor: 'blue'}}></View>
// </View>
// <View style={{ paddingHorizontal: 16}}>
//     <View>
//         <View style={{ width:70}}>
//         <Text style={{ fontSize: width / 22 }}>Pesanan</Text>
//         <View style={{ borderWidth: 0.7, borderColor: 'blue'}}/>
//         </View>

//         {/* Cart ITEMS */}
//     <View style={{flex: 1}}>

// {
// order_items.map((v,i) => {
// return (
// <View style={{ padding: 13 }}>
// <View style={{ flexDirection: 'row'}}>
// <View>
// <Image style={{ height: 100, width: 100 }} source={require('../../../assets/icon/rice.png')}/>
// </View>
// <View style={{ marginLeft: 16, flex: 1}}>
// <Text style={{ fontSize: 17, fontWeight: 'bold'}}>{v.menu_name}</Text>
// <TouchableOpacity onPress={() => ViewSingleFood(v, i)}>
// <Text style={{ fontSize: 16}}>Lihat Detail ...</Text>
// </TouchableOpacity>

// </View>
// </View>
// <View style={{ marginBottom: -4,width: '35%', height: 50, paddingHorizontal: 12, alignSelf: 'flex-end', alignItems:'center', justifyContent:'center'}}>
// <NumericInput
// initValue={v.qty}
// value={v.qty}
//  onChange={value => IncreaseQtyNum(v.id, value)}
//  minValue={1}
//  editable={true}
//  totalHeight={32}
//  totalWidth={128}
//  />
// </View>

// <View style={{ flexDirection: 'row', justifyContent: 'space-between'}}>
// <Text style={{ paddingLeft: 16, fontSize: 20, fontWeight: 'bold'}}>Rp.{v.price_ea} / <Text style={{ fontSize: 15}}>Bungkus</Text></Text>
// <TouchableOpacity onPress={() => RemoveCartItems(v,v.id)} style={{ backgroundColor: '#d63447', width: '35%', height: 32, borderRadius: 4, paddingHorizontal: 12, paddingVertical: 11, alignSelf: 'flex-end', alignItems:'center', justifyContent:'center'}}>
// <Text style={{ fontSize: 14, color: 'white'}}>HAPUS</Text>
// </TouchableOpacity>
// </View>
// <View style={{ paddingBottom: 20, borderBottomColor: '#2296F3', borderBottomWidth: 1}}></View>
// </View>
// )
// })
// }

//             </View>
//         {/* CART ITEMS ENDS */}

//         <View>
//         {
//             order_type.name == 'Pesan dan Ambil Ditempat' ?
//             null :

//             <View>
//                 <View style={{ width: 128}}>
//         <Text style={{ fontSize: width / 22 }}>Alamat Pengirim</Text>
//         <View style={{ borderWidth: 0.7, borderColor: 'blue'}}/>
//         </View>
//             <View style={{ margin: 9}}>
//                     <Text>Jalan Sejati Perum PKL BLOK D RT 14 NO 510 SUNGAI KAPIH, SAMBUTAN</Text>
//             </View>
//             </View>
//         }

//         <View style={{ width: 128}}>
//     <Text style={{ fontSize: width / 22 }}>{order_type.name == 'Pesan dan Ambil Ditempat' ? 'Alamat Pembeli' : 'Alamat Penerima'}</Text>
//         <View style={{ borderWidth: 0.7, borderColor: 'blue'}}/>
//         </View>
//         <View style={{ margin: 9}}>
//             <TextInput
//             value={'Jalan Santi Murni'}
//             style={{
//                 borderColor:'black',
//                 borderWidth: 0.7,
//                 paddingLeft: 10
//             }}/>
//         </View>

//         <View style={{ width: 128}}>
//         <Text style={{ fontSize: width / 22 }}>{order_type.name == 'Pesan dan Ambil Ditempat' ? 'Nama Pembeli' : 'Nama Penerima'}</Text>
//         <View style={{ borderWidth: 0.7, borderColor: 'blue'}}/>
//         </View>
//         <View style={{ margin: 9}}>
//         <TextInput
//         value={'UDIN GAMBUT'}
//         style={{
//                 borderColor:'black',
//                 borderWidth: 0.7,
//                 paddingLeft: 10
//             }}/>
//         </View>

//         <View style={{ width: 128}}>
//         <Text style={{ fontSize: width / 22 }}>{order_type.name == 'Pesan dan Ambil Ditempat' ? 'No.HP Pembeli' : 'No.HP Penerima'}</Text>
//         <View style={{ borderWidth: 0.7, borderColor: 'blue'}}/>
//         </View>
//         <View style={{ margin: 9}}>
//         <TextInput
//         value={'08121239812938'}
//         style={{
//                 borderColor:'black',
//                 borderWidth: 0.7,
//                 paddingLeft: 10
//             }}/>
//         </View>

//         <View style={{ width: 128}}>
//         <Text style={{ fontSize: width / 22 }}>Tipe Pesanan</Text>
//         <View style={{ borderWidth: 0.7, borderColor: 'blue'}}/>
//         </View>
//         <View style={{ margin: 9}}>
//             <Text>Tetapkan ini Sebagai Pesanan : </Text>
//             <Picker
//                 selectedValue={order_type.name}
//                 style={{height: 50, width: 180, borderWidth: 1, borderColor: 'black'}}
//                 onValueChange={(itemValue, itemIndex) => {
//                     if(itemValue == 'Biasa'){
//                         setOrderType(order_type = {
//                                 name : 'Biasa',
//                                 text : 'Pesanan Biasa artinya Pesanan yang langsung Dikirim Hari Ini Juga'
//                         })
//                     } else if(itemValue == 'Acara'){
//                         setOrderType(order_type = {
//                                 name : 'Acara',
//                                 text : 'Pesanan Acara artinya Pesanan yang dikirim berdasarkan waktu yang ditentukan.'
//                         })
//                     } else if(itemValue == 'Pesan dan Ambil Ditempat'){
//                         setOrderType(order_type = {
//                                 name : 'Pesan dan Ambil Ditempat',
//                                 text : 'Pesanan ini hanya bersifat memesan dan mengambil pesanan langsung di warung kami.'
//                         })
//                     }else{
//                         setOrderType(order_type = {
//                                 name : 'Biasa',
//                                 text : 'Pesanan Biasa artinya Pesanan yang langsung Dikirim Hari Ini Juga'
//                         })
//                     }
//                 }}>
//             <Picker.Item label="Biasa" value="Biasa" />
//             <Picker.Item label="Acara" value="Acara" />
//             <Picker.Item label="Pesan dan Ambil Ditempat" value="Pesan dan Ambil Ditempat" />
//         </Picker>
//             <Text>{order_type.text}</Text>
//         </View>

// {
// order_type.name == 'Pesan dan Ambil Ditempat' ?
// null
// :
// <View>
//         <View style={{ width: 145}}>
//         <Text style={{ fontSize: width / 22 }}>Jadwal Pengiriman</Text>
//         <View style={{ borderWidth: 0.7, borderColor: 'blue'}}/>
//         </View>
//         <View style={{ margin: 9}}>
//             <CheckBox
//             containerStyle={{
//                 backgroundColor: 'none',
//                 borderWidth: 0
//             }}
//             checked={is_checked}
//             title="Sekarang"
//             onPress={isCheckedA}
//             />
//             <CheckBox
//             containerStyle={{
//                 backgroundColor: 'none',
//                 borderWidth: 0
//             }}
//             checked={is_checked_2}
//             title="Atur Jam"
//             onPress={isCheckedB}
//             />
//           {
//               is_checked_2 ?  <Text>Jam Pengantaran : {order_hours} : {order_minutes}</Text> : null
//           }
//         </View>
//         </View>
// }
//         <Modal isVisible={isVisible}
//         onBackdropPress={() => setVisible(isVisible = false)}
//         onSwipeComplete={() =>  setVisible(isVisible = false)}
//         onBackButtonPress={() =>  setVisible(isVisible = false)}
//         swipeDirection="left">
//                 <View style={{ padding: 30, backgroundColor:'white'}}>
//                     <View style={{ alignItems:'center',padding: 4 , flexDirection:'row', justifyContent:'space-between'}}>
//                 <Text>Jam </Text>
//             <Picker
//                 selectedValue={order_hours}
//                 style={{height: 50, width: 120, borderWidth: 1, borderColor: 'black', textAlign:'center'}}
//                 onValueChange={(itemValue, itemIndex) => {
//                    setOrderHours(order_hours = itemValue)
//                 }}>
//                     {
//                         hours.map(v => {
//                             return (
//                                 <Picker.Item label={`${v}`} value={`${v}`} />
//                             )
//                         })
//                     }
//         </Picker>
//         <Text style={{ textAlign:'center', fontSize: 18, fontWeight:'bold'}}>: </Text>
//         <Text>Menit</Text>
//         <Picker
//                 selectedValue={order_minutes}
//                 style={{height: 50, width: 120, borderWidth: 1, borderColor: 'black', textAlign:'center'}}
//                 onValueChange={(itemValue, itemIndex) => {
//                    setOrderMinutes(order_minutes = itemValue);
//                 }}>
//                      {
//                         minutes.map(v => {
//                             return (
//                                 <Picker.Item label={`${v}`} value={`${v}`} />
//                             )
//                         })
//                     }
//         </Picker>
//                     </View>
//             </View>
//         </Modal>
//         <View style={{ width: 128}}>
//         <Text style={{ fontSize: width / 24 }}>SUBTOTAL</Text>
//         <View style={{ borderWidth: 0.7, borderColor: 'blue'}}/>
//         </View>

//         <View style={{ padding: 12}}>
//           {
//               order_type.name == 'Pesan dan Ambil Ditempat' ?
//         <View>
//             <Text>Total Biaya : Rp.{q.toLocaleString('id-ID', { style : 'currency', currency : 'IDR'})},-</Text>
//           </View>
//             :
//         <View>
//             <Text style={{ fontSize: width / 29 }}>Ongkos Kirim Per Km : Rp.{cart.ongkir.toLocaleString('id-ID', { style : 'currency', currency : 'IDR'})},-</Text>
//             <Text style={{ fontSize: width / 29 }}>Biaya Belanja : Rp.{q.toLocaleString('id-ID', { style : 'currency', currency : 'IDR'})},-</Text>
//             <Text style={{ fontSize: width / 29 }}>Total Biaya : Rp.{q+cart.ongkir},-</Text>
//         </View>
//           }

//         </View>

//             <TouchableOpacity onPress={() => console.log('width', width, 'height', height)} style={{ flex: 1, justifyContent:'center', alignItems:'center', padding:16, marginBottom: 16, backgroundColor:'#2296F3'}}>
//                 <Text style={{ fontSize: width / 24, textAlign:'center', color:'white' }}>BAYAR</Text>
//             </TouchableOpacity>

//         </View>

//     </View>
// </View>
// </ScrollView>
