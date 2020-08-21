import React, { useState, useEffect } from 'react';
import {
	View,
	Text,
	Image,
	Dimensions,
	ScrollView,
	TouchableOpacity,
	ToastAndroid,
	Switch,
	StatusBar
} from 'react-native';
import { Icon } from 'react-native-elements';
import ImagePicker from 'react-native-image-picker';
import { useDarkMode } from 'react-native-dark-mode';
import AsyncStorage from '@react-native-community/async-storage';

export const Account = ({ navigation }) => {
	const isDarkMode = useDarkMode();
	const width = Dimensions.get('window').width;
	let ratings = 4.5;
	const costumer = true;
	let [
		image,
		setImage
	] = useState('');
	const openGallery = () => {
		const options = {
			mediaType      : 'photo',
			quality        : 1.0,
			storageOptions : {
				skipBackup : true
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
			}
		});
	};
	let [
		activeOrder,
		setActiveOrder
	] = useState([]);

	useEffect(() => {
		AsyncStorage.getItem('active_order', (e, r) => r)
			.then((res) => {
				setActiveOrder(JSON.parse(res));
				console.log('mounted, getting lists of active order was successful');
			})
			.catch((err) => {
				throw new Error(err);
			});
	}, []);
	return (
		<ScrollView style={{ flex: 1, backgroundColor: 'white' }}>
			<StatusBar
				translucent
				barStyle={isDarkMode ? 'light-content' : 'dark-content'}
				backgroundColor={isDarkMode ? '#18191C' : 'white'}
				animated
			/>
			<View style={{ alignItems: 'center' }}>
				<View style={{ position: 'relative', alignItems: 'center', padding: 10, borderRadius: 4 }}>
					<View
						style={{
							height : 250,
							width  : width - 10 * 2
						}}
					>
						<Image
							style={{ width: '100%', height: '100%', resizeMode: 'cover' }}
							source={image === '' ? require('../../../assets/banner/warlock.jpg') : image}
						/>
						<View
							style={{
								width           : '100%',
								height          : '100%',
								position        : 'absolute',
								top             : 0,
								left            : 0,
								backgroundColor : 'black',
								opacity         : 0.5
							}}
						/>
					</View>
					<View style={{ position: 'absolute', right: 10, zIndex: 10 }}>
						<TouchableOpacity onPress={() => openGallery()} style={{ padding: 10 }}>
							<Icon name='ios-camera' size={35} color='white' type='ionicon' />
						</TouchableOpacity>
					</View>
					<View
						style={{
							padding      : 6,
							height       : 100,
							width        : 100,
							borderRadius : 10,
							zIndex       : 10,
							position     : 'absolute',
							bottom       : 10,
							left         : 10
						}}
					>
						<Image
							style={{
								width        : '100%',
								height       : '100%',
								resizeMode   : 'cover',
								borderRadius : 10,
								borderColor  : 'white',
								borderWidth  : 1
							}}
							source={require('../../../assets/banner/q3.png')}
						/>
					</View>
					<View
						style={{
							padding        : 6,
							marginLeft     : 100,
							zIndex         : 10,
							position       : 'absolute',
							bottom         : 10,
							left           : 10,
							justifyContent : 'center'
						}}
					>
						<View style={{ width: 180, padding: 4 }}>
							<Text
								ellipsizeMode={'tail'}
								numberOfLines={1}
								style={{ fontWeight: 'bold', color: 'white', fontSize: 18 }}
							>
								Mada Nugraha
							</Text>
						</View>
						<View style={{ padding: 4 }}>
							<Text
								ellipsizeMode={'tail'}
								numberOfLines={1}
								style={{ marginLeft: 4, fontWeight: '600', fontSize: 15, color: 'white' }}
							>
								{costumer ? 'Member' : 'Owner / Courier Warung h3h3'}
							</Text>
						</View>
					</View>
				</View>
			</View>
			<View style={{ padding: 16 }}>
				<View style={{ padding: 6, marginLeft: 6 }}>
					<Text style={{ fontWeight: '300', fontSize: 14 }}>Hello World :)</Text>
				</View>
				<View>
					<Text style={{ letterSpacing: 2, color: '#819C8B' }}>
						--------------------------------------------------------------------------
					</Text>
				</View>
				<View style={{ flexDirection: 'row', justifyContent: 'space-between', padding: 10 }}>
					<View
						style={{
							padding       : 4,
							flexDirection : 'column'
						}}
					>
						<View style={{ flexDirection: 'row', alignItems: 'center' }}>
							<Icon name='ios-happy' size={20} color='blue' type='ionicon' />
							<Text style={{ marginLeft: 4, fontWeight: 'bold', fontSize: 20 }}>3</Text>
						</View>
						<Text style={{ marginTop: 4, fontSize: 13.3 }}>
							{costumer ? 'Product Purchased' : 'Delivered Product'}
						</Text>
					</View>
					<View
						style={{
							padding       : 4,
							flexDirection : 'column'
						}}
					>
						<View style={{ flexDirection: 'row', alignItems: 'center' }}>
							<Icon name={costumer ? null : 'ios-pin'} size={20} color='blue' type='ionicon' />
							<Text style={{ marginLeft: 4, fontWeight: 'bold', fontSize: 20 }}>
								{costumer ? '20 Jan 2020' : 3.9}
							</Text>
						</View>
						<Text style={{ marginTop: 4, fontSize: 13.3, textAlign: costumer ? 'center' : 'left' }}>
							{costumer ? 'Account Created' : 'Distance Travelled'}
						</Text>
					</View>
					<View
						style={{
							padding       : 4,
							flexDirection : 'column'
						}}
					>
						<View style={{ flexDirection: 'row', alignItems: 'center' }}>
							<Icon name={costumer ? 'ios-bookmark' : 'ios-star'} size={20} color='blue' type='ionicon' />
							<Text style={{ marginLeft: 4, fontWeight: 'bold', fontSize: 20 }}>
								{costumer ? 'Yes' : ratings}
							</Text>
						</View>
						<Text style={{ marginTop: 4, fontSize: 13.3 }}>{costumer ? 'Verified' : 'Ratings'}</Text>
					</View>
				</View>
				{costumer ? null : (
					<React.Fragment>
						<View
							style={{
								padding          : 6,
								borderWidth      : 0.6,
								borderColor      : 'blue',
								borderRadius     : 4,
								marginHorizontal : 20,
								flexDirection    : 'row',
								justifyContent   : 'space-between',
								alignItems       : 'center'
							}}
						>
							<Text>Lihat Profil Warung</Text>
							<Icon name='ios-arrow-dropright' type='ionicon' color='blue' />
						</View>
						<View
							style={{
								padding          : 6,
								borderWidth      : 0.6,
								borderColor      : 'blue',
								borderRadius     : 4,
								marginHorizontal : 20,
								flexDirection    : 'row',
								justifyContent   : 'space-between',
								alignItems       : 'center',
								marginTop        : 10
							}}
						>
							<Text>Product Delivered History {0 === 0 ? '(3)' : null}</Text>
							<Icon name='ios-arrow-dropright' type='ionicon' color='blue' />
						</View>
					</React.Fragment>
				)}

				<TouchableOpacity
					activeOpacity={0.5}
					onPress={() => AsyncStorage.removeItem('active_order')}
					style={{
						padding          : 6,
						borderWidth      : 0.6,
						borderColor      : 'blue',
						borderRadius     : 4,
						marginHorizontal : 20,
						flexDirection    : 'row',
						justifyContent   : 'space-between',
						alignItems       : 'center',
						marginTop        : 10
					}}
				>
					<Text>Order History {1 === 0 ? '(2)' : null}</Text>
					<Icon name='ios-arrow-dropright' type='ionicon' color='blue' />
				</TouchableOpacity>
				<TouchableOpacity
					activeOpacity={0.5}
					onPress={() => navigation.navigate('ViewProfil')}
					style={{
						padding          : 6,
						borderWidth      : 0.6,
						borderColor      : 'blue',
						borderRadius     : 4,
						marginHorizontal : 20,
						flexDirection    : 'row',
						justifyContent   : 'space-between',
						alignItems       : 'center',
						marginTop        : 10
					}}
				>
					<Text>Wishlist {1 === 0 ? '(2)' : null}</Text>
					<Icon name='ios-arrow-dropright' type='ionicon' color='blue' />
				</TouchableOpacity>
				<TouchableOpacity
					activeOpacity={0.5}
					onPress={() => navigation.navigate('ViewProfil')}
					style={{
						padding          : 6,
						borderWidth      : 0.6,
						borderColor      : 'blue',
						borderRadius     : 4,
						marginHorizontal : 20,
						flexDirection    : 'row',
						justifyContent   : 'space-between',
						alignItems       : 'center',
						marginTop        : 10
					}}
				>
					<Text>Bookmarked Warung {1 === 0 ? '(2)' : null}</Text>
					<Icon name='ios-arrow-dropright' type='ionicon' color='blue' />
				</TouchableOpacity>
			</View>
			{costumer ? null : (
				<React.Fragment>
					<View style={{ height: 17, backgroundColor: '#F2F2F4', marginTop: 10 }} />
					<View style={{ flex: 1, padding: 16 }}>
						<View style={{ padding: 4, flexDirection: 'row', justifyContent: 'space-between' }}>
							<Text style={{ fontSize: 20, fontWeight: '700', letterSpacing: 1 }}>Order Entry</Text>
							<Icon name='ios-list' color='blue' type='ionicon' />
						</View>
						<View
							style={{ borderColor: 'blue', borderWidth: 1, borderRadius: 10, padding: 2, marginTop: 10 }}
						>
							<View style={{ padding: 6 }}>
								<View
									style={{
										padding        : 4,
										flexDirection  : 'row',
										alignItems     : 'center',
										justifyContent : 'space-between'
									}}
								>
									<Text style={{ fontWeight: 'bold', fontSize: 16 }}>
										{new Date().toLocaleString('id-ID')}
									</Text>
									<View
										style={{
											padding         : 4,
											borderRadius    : 20,
											width           : 30,
											height          : 30,
											justifyContent  : 'center',
											alignItems      : 'center',
											backgroundColor : 'red'
										}}
									>
										<Text style={{ fontWeight: 'bold', color: 'white' }}>3</Text>
									</View>
								</View>
								<View style={{ padding: 6 }}>
									<View style={{ padding: 4, flexDirection: 'row', alignItems: 'center' }}>
										<Text style={{ fontSize: 14 }}>Pembeli : </Text>
										<Text style={{ fontSize: 16, fontWeight: 'bold' }}>Abogoboga</Text>
										<Text> / 08123123123</Text>
									</View>
								</View>
								<View style={{ padding: 6 }}>
									<View style={{ padding: 4, flexDirection: 'row' }}>
										<Text style={{ fontSize: 14 }}>Order Items : </Text>
										<View style={{ flexDirection: 'column' }}>
											<View style={{ flexDirection: 'row', marginBottom: 4 }}>
												<Text style={{ fontSize: 16 }}>Nasi Kucing</Text>
												<Text style={{ fontSize: 16 }}> ( 1 )</Text>
											</View>
											<View style={{ flexDirection: 'row', marginBottom: 4 }}>
												<Text style={{ fontSize: 16 }}>Nasi Kucing</Text>
												<Text style={{ fontSize: 16 }}> ( 1 )</Text>
											</View>
											<View style={{ flexDirection: 'row', marginBottom: 4 }}>
												<Text style={{ fontSize: 16 }}>Nasi Kucing</Text>
												<Text style={{ fontSize: 16 }}> ( 1 )</Text>
											</View>
										</View>
									</View>
								</View>
								<View style={{ padding: 6 }}>
									<View style={{ padding: 4, flexDirection: 'row', alignItems: 'center' }}>
										<Text style={{ fontSize: 14 }}>Total Pembayaran : </Text>
										<Text style={{ fontSize: 16, fontWeight: 'bold' }}>Rp.30000,-</Text>
										<Text style={{ fontSize: 11, marginLeft: 5 }}> *sudah termasuk ongkir</Text>
									</View>
								</View>
								<View style={{ padding: 6 }}>
									<View style={{ padding: 4, flexDirection: 'row', alignItems: 'center' }}>
										<Text style={{ fontSize: 14 }}>Status : </Text>
										<Text style={{}}>Menunggu</Text>
									</View>
								</View>
								<View style={{ padding: 6 }}>
									<View style={{ padding: 4, flexDirection: 'row', alignItems: 'center' }}>
										<Text style={{ fontSize: 14 }}>Lokasi Pembeli : </Text>
										<View
											style={{
												padding        : 4,
												flexDirection  : 'row',
												justifyContent : 'center',
												alignItems     : 'center',
												borderWidth    : 1,
												borderColor    : 'blue'
											}}
										>
											<Icon name='ios-map' type='ionicon' />
											<Text style={{ marginLeft: 6, fontSize: 16 }}>lihat maps</Text>
										</View>
									</View>
								</View>
								<View style={{ borderBottomWidth: 1, borderBottomColor: 'blue' }} />
								<View
									style={{
										alignItems     : 'center',
										flexDirection  : 'row',
										justifyContent : 'space-between',
										marginTop      : 10
									}}
								>
									<View
										style={{
											padding        : 4,
											justifyContent : 'center',
											alignItems     : 'center',
											marginLeft     : 20
										}}
									>
										<View
											style={{
												flexDirection  : 'row',
												alignItems     : 'center',
												justifyContent : 'center'
											}}
										>
											<Icon name='ios-paper' size={17} type='ionicon' />
											<Text style={{ fontSize: 17 }}> Edit</Text>
										</View>
									</View>
									<TouchableOpacity
										activeOpacity={0.5}
										onPress={() => navigation.navigate('Courier')}
										style={{
											padding        : 8,
											justifyContent : 'center',
											alignItems     : 'center'
										}}
									>
										<View
											style={{
												flexDirection  : 'row',
												alignItems     : 'center',
												justifyContent : 'center'
											}}
										>
											<Icon name='ios-checkmark' size={17} type='ionicon' />
											<Text style={{ fontSize: 17 }}> Accept Order {true ? null : '(1)'}</Text>
										</View>
									</TouchableOpacity>
									<View
										style={{
											padding        : 4,
											justifyContent : 'center',
											alignItems     : 'center',
											marginRight    : 20
										}}
									>
										<View
											style={{
												flexDirection  : 'row',
												alignItems     : 'center',
												justifyContent : 'center'
											}}
										>
											<Icon name='ios-checkmark-circle' color='black' size={17} type='ionicon' />
											<Text style={{ fontSize: 17 }}> Done</Text>
										</View>
									</View>
								</View>
							</View>
						</View>
					</View>
				</React.Fragment>
			)}
			<View style={{ height: 17, backgroundColor: '#F2F2F4', marginTop: 10 }} />
			<View style={{ flex: 1, padding: 16 }}>
				<View style={{ padding: 4, flexDirection: 'row', alignItems: 'center' }}>
					<Text style={{ fontSize: 20, fontWeight: '700', letterSpacing: 1 }}>Active Order</Text>
					<Text style={{ marginLeft: 6 }}>
						{' '}
						{activeOrder === null ? '-tidak ada data.' : activeOrder.length + ' order aktif.'}
					</Text>
				</View>
				{activeOrder !== null ? (
					activeOrder.map((x, y) => {
						return x.order_items.map((v, i) => {
							return (
								<View
									style={{
										borderColor  : 'blue',
										borderWidth  : 1,
										borderRadius : 10,
										padding      : 2,
										marginTop    : 10
									}}
								>
									<View style={{ padding: 6 }}>
										<View
											style={{
												padding        : 4,
												flexDirection  : 'row',
												alignItems     : 'center',
												justifyContent : 'space-between'
											}}
										>
											<Text style={{ fontWeight: 'bold', fontSize: 16 }}>{x.date}</Text>
											<View
												style={{
													padding         : 4,
													borderRadius    : 20,
													width           : 30,
													height          : 30,
													justifyContent  : 'center',
													alignItems      : 'center',
													backgroundColor : 'red'
												}}
											>
												<Text style={{ fontWeight: 'bold', color: 'white' }}>
													{v[Object.keys(v)].order_items.length}
												</Text>
											</View>
										</View>
										<View style={{ padding: 6 }}>
											<View style={{ padding: 4, flexDirection: 'row', alignItems: 'center' }}>
												<Text style={{ fontSize: 14 }}>Seller : </Text>
												<Text style={{}}>{Object.keys(v)}</Text>
											</View>
										</View>
										<View style={{ padding: 6 }}>
											<View style={{ padding: 4, flexDirection: 'row', alignItems: 'center' }}>
												<Text style={{ fontSize: 14 }}>ORDER ID : </Text>
												<Text style={{}}>{v[Object.keys(v)].details.order_id}</Text>
											</View>
										</View>
										<View style={{ padding: 6 }}>
											<View style={{ padding: 4, flexDirection: 'row' }}>
												<Text style={{ fontSize: 14 }}>Order Items : </Text>
												<View style={{ flexDirection: 'column' }}>
													{v[Object.keys(v)].order_items.map((_, i) => (
														<View style={{ flexDirection: 'row', marginBottom: 4 }}>
															<Text style={{ fontSize: 16 }}>
																{_.menu_name.length > 24 ? (
																	_.menu_name.slice(0, 24) + '...'
																) : (
																	_.menu_name
																)}
															</Text>
															<Text style={{ fontSize: 16 }}> ( {_.qty} )</Text>
														</View>
													))}
												</View>
											</View>
										</View>
										<View style={{ padding: 6 }}>
											<View style={{ padding: 4, flexDirection: 'row', alignItems: 'center' }}>
												<Text style={{ fontSize: 14 }}>Total Pembayaran : </Text>
												<Text style={{ fontSize: 16, fontWeight: 'bold' }}>
													Rp.{v[Object.keys(v)].order_items
														.map((x, y) => x.total)
														.reduce((a, c) => {
															return a + c;
														}, 0) +
														(v[Object.keys(v)].warung_info.distance < 1000
															? 1000 / 1000 * 2500
															: parseInt(
																	Math.round(
																		v[Object.keys(v)].warung_info.distance / 1000
																	) * 2500
																)) || 0},-
												</Text>
												<Text style={{ fontSize: 11, marginLeft: 5 }}>
													{' '}
													*sudah termasuk ongkir
												</Text>
											</View>
										</View>
										<View style={{ padding: 6 }}>
											<View style={{ padding: 4, flexDirection: 'row', alignItems: 'center' }}>
												<Text style={{ fontSize: 14 }}>Status : </Text>
												<Text style={{}}>Sedang di proses</Text>
											</View>
										</View>

										<View style={{ borderBottomWidth: 1, borderBottomColor: 'blue' }} />
										<View
											style={{
												alignItems     : 'center',
												flexDirection  : 'row',
												justifyContent : 'center',
												marginTop      : 10
											}}
										>
											<TouchableOpacity
												activeOpacity={0.5}
												onPress={() => navigation.navigate('Courier', { data: x, d: v })}
												style={{
													padding        : 8,
													justifyContent : 'center',
													alignItems     : 'center'
												}}
											>
												<View
													style={{
														flexDirection  : 'row',
														alignItems     : 'center',
														justifyContent : 'center'
													}}
												>
													<Icon name='ios-checkmark' size={17} type='ionicon' />
													<Text style={{ fontSize: 17 }}>
														{' '}
														Detail ( {v[Object.keys(v)].order_items.length} )
													</Text>
												</View>
											</TouchableOpacity>
										</View>
									</View>
								</View>
							);
						});
					})
				) : null}
			</View>
		</ScrollView>
	);
};

export const ViewProfil = ({ navigation }) => {
	const width = Dimensions.get('window').width;
	let ratings = 4.5;
	const costumer = true;
	return (
		<ScrollView style={{ flex: 1, backgroundColor: 'white' }}>
			<View style={{ alignItems: 'center' }}>
				<View style={{ position: 'relative', alignItems: 'center', padding: 10, borderRadius: 4 }}>
					<View
						style={{
							height : 250,
							width  : width - 10 * 2
						}}
					>
						<Image
							style={{ width: '100%', height: '100%', resizeMode: 'cover' }}
							source={require('../../../assets/banner/warlock.jpg')}
						/>
						<View
							style={{
								width           : '100%',
								height          : '100%',
								position        : 'absolute',
								top             : 0,
								left            : 0,
								backgroundColor : 'black',
								opacity         : 0.5
							}}
						/>
					</View>
					<View
						style={{
							padding      : 6,
							height       : 100,
							width        : 100,
							borderRadius : 10,
							zIndex       : 10,
							position     : 'absolute',
							bottom       : 10,
							left         : 10
						}}
					>
						<Image
							style={{
								width        : '100%',
								height       : '100%',
								resizeMode   : 'cover',
								borderRadius : 10,
								borderColor  : '#C48e69',
								borderWidth  : 1
							}}
							source={require('../../../assets/banner/q3.png')}
						/>
					</View>
					<View
						style={{
							padding        : 6,
							marginLeft     : 100,
							zIndex         : 10,
							position       : 'absolute',
							bottom         : 10,
							left           : 10,
							justifyContent : 'center'
						}}
					>
						<View style={{ width: 180, padding: 4 }}>
							<Text
								ellipsizeMode={'tail'}
								numberOfLines={1}
								style={{ fontWeight: 'bold', color: 'white', fontSize: 18 }}
							>
								Mada Nugraha
							</Text>
						</View>
						<View style={{ padding: 4 }}>
							<Text
								ellipsizeMode={'tail'}
								numberOfLines={1}
								style={{ marginLeft: 4, fontWeight: '600', fontSize: 15, color: 'white' }}
							>
								{costumer ? 'Member' : 'Owner / Courier Warung h3h3'}
							</Text>
						</View>
					</View>
				</View>
			</View>
			<View style={{ padding: 16 }}>
				<View style={{ padding: 6, marginLeft: 6 }}>
					<Text style={{ fontWeight: '300', fontSize: 14 }}>Hello World :)</Text>
				</View>
				<View>
					<Text style={{ letterSpacing: 2, color: '#819C8B' }}>
						--------------------------------------------------------------------------
					</Text>
				</View>
				<View style={{ flexDirection: 'row', justifyContent: 'space-between', padding: 10 }}>
					<View
						style={{
							padding       : 4,
							flexDirection : 'column'
						}}
					>
						<View style={{ flexDirection: 'row', alignItems: 'center' }}>
							<Icon name='ios-happy' size={20} color='blue' type='ionicon' />
							<Text style={{ marginLeft: 4, fontWeight: 'bold', fontSize: 20 }}>3</Text>
						</View>
						<Text style={{ marginTop: 4, fontSize: 13.3 }}>
							{costumer ? 'Product Purchased' : 'Delivered Product'}
						</Text>
					</View>
					<View
						style={{
							padding       : 4,
							flexDirection : 'column'
						}}
					>
						<View style={{ flexDirection: 'row', alignItems: 'center' }}>
							<Icon name={costumer ? null : 'ios-pin'} size={20} color='blue' type='ionicon' />
							<Text style={{ marginLeft: 4, fontWeight: 'bold', fontSize: 20 }}>
								{costumer ? '20 Jan 2020' : 3.9}
							</Text>
						</View>
						<Text style={{ marginTop: 4, fontSize: 13.3, textAlign: costumer ? 'center' : 'left' }}>
							{costumer ? 'Account Created' : 'Distance Travelled'}
						</Text>
					</View>
					<View
						style={{
							padding       : 4,
							flexDirection : 'column'
						}}
					>
						<View style={{ flexDirection: 'row', alignItems: 'center' }}>
							<Icon name={costumer ? 'ios-bookmark' : 'ios-star'} size={20} color='blue' type='ionicon' />
							<Text style={{ marginLeft: 4, fontWeight: 'bold', fontSize: 20 }}>
								{costumer ? 'Yes' : ratings}
							</Text>
						</View>
						<Text style={{ marginTop: 4, fontSize: 13.3 }}>{costumer ? 'Verified' : 'Ratings'}</Text>
					</View>
				</View>

				<View
					style={{
						padding          : 6,
						marginHorizontal : 20,
						flexDirection    : 'row',
						alignItems       : 'center',
						marginTop        : 10,
						justifyContent   : 'center'
					}}
				>
					<Icon name='ios-pin' type='ionicon' color='blue' />
					<Text> Sambutan, Samarinda</Text>
				</View>
			</View>

			<View style={{ height: 17, backgroundColor: '#F2F2F4', marginTop: 10 }} />
		</ScrollView>
	);
};

export const UserSetttings = ({ navigation }) => {
	const alamat = 'Jalan Jati negara santi murni blok dr rt 14 no 510';
	const isDarkMode = useDarkMode();
	return (
		<ScrollView style={{ flex: 1, backgroundColor: 'black' }}>
			<View
				style={{
					height          : 240,
					justifyContent  : 'center',
					alignItems      : 'center',
					backgroundColor : '#18191C',
					flex            : 1
				}}
			>
				<View style={{ padding: 6, justifyContent: 'center', alignItems: 'center', marginTop: 30 }}>
					<View style={{ height: 120, width: 120, borderRadius: 60 }}>
						<Image
							style={{ height: '100%', width: '100%', resizeMode: 'cover', borderRadius: 60 }}
							source={require('../../../assets/banner/q3.png')}
						/>
					</View>
					<View style={{ padding: 8, flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
						<Text style={{ fontSize: 25, fontWeight: '600', letterSpacing: 1, color: 'white' }}>
							Pepega
						</Text>
					</View>
				</View>
			</View>
			<View style={{ flex: 1, backgroundColor: 'black' }}>
				<View style={{ padding: 16 }}>
					<Text style={{ color: '#999999', fontWeight: '400', fontSize: 17 }}>User Settings</Text>
					<View style={{ paddingVertical: 30 }}>
						<View
							style={{
								flexDirection  : 'row',
								alignItems     : 'center',
								justifyContent : 'space-between',
								paddingBottom  : 30
							}}
						>
							<View style={{ flexDirection: 'row', alignItems: 'center' }}>
								<Icon name='ios-mail' size={27} type='ionicon' color='#999999' />
								<Text style={{ marginLeft: 15, fontSize: 17, fontWeight: '200', color: 'white' }}>
									Email
								</Text>
							</View>
							<View>
								<Text style={{ color: 'white' }}>kalleriakrons24@gmial.com</Text>
							</View>
						</View>
						<View
							style={{
								flexDirection  : 'row',
								alignItems     : 'center',
								justifyContent : 'space-between',
								paddingBottom  : 20
							}}
						>
							<View style={{ flexDirection: 'row', alignItems: 'center' }}>
								<Icon name='ios-call' size={27} type='ionicon' color='#999999' />
								<Text style={{ marginLeft: 15, fontSize: 17, fontWeight: '200', color: 'white' }}>
									Phone Number
								</Text>
							</View>
							<View>
								<Text style={{ color: 'white' }}>+62891123123</Text>
							</View>
						</View>
						<View
							style={{
								flexDirection  : 'row',
								alignItems     : 'center',
								justifyContent : 'space-between',
								paddingBottom  : 20
							}}
						>
							<View style={{ flexDirection: 'row', alignItems: 'center' }}>
								<Icon name='ios-pin' size={27} type='ionicon' color='#999999' />
								<Text style={{ marginLeft: 15, fontSize: 17, fontWeight: '200', color: 'white' }}>
									Alamat
								</Text>
							</View>
							<View>
								<Text style={{ color: 'white' }}>
									{alamat.length > 26 ? alamat.slice(0, 26) + '...' : alamat}
								</Text>
							</View>
						</View>
						<View
							style={{
								flexDirection  : 'row',
								alignItems     : 'center',
								justifyContent : 'space-between',
								paddingBottom  : 20
							}}
						>
							<View style={{ flexDirection: 'row', alignItems: 'center' }}>
								<Icon name='ios-pin' size={27} type='ionicon' color='#999999' />
								<Text style={{ marginLeft: 15, fontSize: 17, fontWeight: '200', color: 'white' }}>
									Kota
								</Text>
							</View>
							<View>
								<Text style={{ color: 'white' }}>-</Text>
							</View>
						</View>
						<View
							style={{
								flexDirection  : 'row',
								alignItems     : 'center',
								justifyContent : 'space-between',
								paddingBottom  : 20
							}}
						>
							<View style={{ flexDirection: 'row', alignItems: 'center' }}>
								<Icon name='ios-pin' size={27} type='ionicon' color='#999999' />
								<Text style={{ marginLeft: 15, fontSize: 17, fontWeight: '200', color: 'white' }}>
									Kecamatan
								</Text>
							</View>
							<View>
								<Text style={{ color: 'white' }}>-</Text>
							</View>
						</View>
						<View
							style={{
								flexDirection  : 'row',
								alignItems     : 'center',
								justifyContent : 'space-between',
								paddingBottom  : 20
							}}
						>
							<View style={{ flexDirection: 'row', alignItems: 'center' }}>
								<Icon name='ios-pin' size={27} type='ionicon' color='#999999' />
								<Text style={{ marginLeft: 15, fontSize: 17, fontWeight: '200', color: 'white' }}>
									Kelurahan
								</Text>
							</View>
							<View>
								<Text style={{ color: 'white' }}>-</Text>
							</View>
						</View>
						<View
							style={{
								flexDirection  : 'row',
								alignItems     : 'center',
								justifyContent : 'space-between',
								paddingBottom  : 20
							}}
						>
							<View style={{ flexDirection: 'row', alignItems: 'center' }}>
								<Icon name='ios-card' size={27} type='ionicon' color='#999999' />
								<Text style={{ marginLeft: 15, fontSize: 17, fontWeight: '200', color: 'white' }}>
									Nomor KTP
								</Text>
							</View>
							<View>
								<Text style={{ color: 'white' }}>-</Text>
							</View>
						</View>
					</View>
				</View>
				<View style={{ borderBottomWidth: 1, borderBottomColor: '#999999' }} />
				<View style={{ padding: 16 }}>
					<Text style={{ color: '#999999', fontWeight: '400', fontSize: 17 }}>Connections</Text>
					<View style={{ paddingVertical: 30 }}>
						<View
							style={{
								flexDirection  : 'row',
								alignItems     : 'center',
								justifyContent : 'space-between',
								paddingBottom  : 30
							}}
						>
							<View style={{ flexDirection: 'row', alignItems: 'center' }}>
								<Icon name='logo-facebook' size={27} type='ionicon' color='#999999' />
								<Text style={{ marginLeft: 15, fontSize: 17, fontWeight: '200', color: 'white' }}>
									Facebook
								</Text>
							</View>
							<View>
								<Text style={{ color: 'white' }}>Not Linked</Text>
							</View>
						</View>
					</View>
				</View>
				<View style={{ borderBottomWidth: 1, borderBottomColor: '#999999' }} />
				<View style={{ padding: 16 }}>
					<Text style={{ color: '#999999', fontWeight: '400', fontSize: 17 }}>App Settings</Text>
					<View style={{ paddingVertical: 30 }}>
						<View
							style={{
								flexDirection  : 'row',
								alignItems     : 'center',
								justifyContent : 'space-between',
								paddingBottom  : 30
							}}
						>
							<View style={{ flexDirection: 'row', alignItems: 'center' }}>
								<Icon name='ios-color-palette' size={27} type='ionicon' color='#999999' />
								<Text style={{ marginLeft: 15, fontSize: 17, fontWeight: '200', color: 'white' }}>
									Dark Theme
								</Text>
							</View>
							<View>
								<Switch value={isDarkMode ? true : false} />
							</View>
						</View>
					</View>
				</View>
				<View style={{ borderBottomWidth: 1, borderBottomColor: '#999999' }} />
				<View style={{ padding: 16 }}>
					<Text style={{ color: '#999999', fontWeight: '400', fontSize: 17 }}>App Information - v0.0.1</Text>
					<View style={{ paddingVertical: 30 }}>
						<View
							style={{
								flexDirection  : 'row',
								alignItems     : 'center',
								justifyContent : 'space-between',
								paddingBottom  : 30
							}}
						>
							<View style={{ flexDirection: 'row', alignItems: 'center' }}>
								<Icon name='md-information' size={27} type='ionicon' color='#999999' />
								<Text style={{ marginLeft: 15, fontSize: 17, fontWeight: '200', color: 'white' }}>
									Change Log
								</Text>
							</View>
						</View>
						<View
							style={{
								flexDirection  : 'row',
								alignItems     : 'center',
								justifyContent : 'space-between',
								paddingBottom  : 30
							}}
						>
							<View style={{ flexDirection: 'row', alignItems: 'center' }}>
								<Icon name='ios-help' size={27} type='ionicon' color='#999999' />
								<Text style={{ marginLeft: 15, fontSize: 17, fontWeight: '200', color: 'white' }}>
									Support
								</Text>
							</View>
						</View>
						<View
							style={{
								flexDirection  : 'row',
								alignItems     : 'center',
								justifyContent : 'space-between',
								paddingBottom  : 30
							}}
						>
							<View style={{ flexDirection: 'row', alignItems: 'center' }}>
								<Icon name='ios-information' size={27} type='ionicon' color='#999999' />
								<Text style={{ marginLeft: 15, fontSize: 17, fontWeight: '200', color: 'white' }}>
									Guidance
								</Text>
							</View>
						</View>
					</View>
				</View>
				<View style={{ justifyContent: 'center', alignItems: 'center', marginBottom: 30 }}>
					<Text style={{ fontWeight: '500', fontSize: 20, letterSpacing: 1, color: 'white' }}>
						{'\u00A9'}Cafely 2020
					</Text>
				</View>
			</View>
		</ScrollView>
	);
};
