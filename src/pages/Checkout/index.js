import React, { useEffect } from 'react';
import { View, Text, Image, TouchableOpacity, ToastAndroid } from 'react-native';
import { useDispatch } from 'react-redux';
import AsyncStorage from '@react-native-community/async-storage';
export const Checkout = (props) => {
	const dispatch = useDispatch();

	let checkoutItems = props.route.params.checkoutItems;
	console.log(checkoutItems.order_items[0]['Warung Makan Bu UDIN'].details);
	const addToActiveOrder = async (data) => {
		const item = await AsyncStorage.getItem('active_order');
		var arr = JSON.parse(item) || [];

		if (!arr) {
			arr = [];
		}
		const check = true;

		if (!check) {
			return;
		}
		else {
			arr.push(data);
			await AsyncStorage.setItem('active_order', JSON.stringify(arr))
				.then(() => {
					console.log('Forwarded to Courier Screen.');
					props.navigation.navigate('Courier', { data: data });
				})
				.catch((err) => {
					throw new Error(err);
				});
		}
	};
	const confirmBuy = async (value) => {
		if (value === null) {
			throw new Error('wahapen');
		}
		else {
			await addToActiveOrder(value);
		}
	};
	useEffect(() => {});
	return (
		<View style={{ flex: 1, backgroundColor: 'white' }}>
			<View style={{ padding: 16 }}>
				<View
					style={{ flexDirection: 'row', justifyContent: 'space-between', padding: 7, alignItems: 'center' }}
				>
					<Text style={{ fontSize: 19, fontWeight: 'bold', textAlign: 'center' }}>Metode Pembayaran</Text>
					<Text style={{ fontSize: 14, textAlign: 'center' }}>COD / Bayar Ditempat</Text>
				</View>
				<View style={{ padding: 7 }}>
					<Text style={{ fontSize: 19, fontWeight: 'bold' }}>Total Biaya </Text>
					<View style={{ flexDirection: 'column', padding: 8 }}>
						<Text style={{ fontSize: 14 }}>Warung A = Rp.50.000,-</Text>
						<Text style={{ fontSize: 14 }}>Warung B = Rp.50.000,-</Text>
					</View>
				</View>
				<View style={{ padding: 7 }}>
					<Text style={{ fontSize: 19, fontWeight: 'bold' }}>Informasi Pembeli</Text>
					<View style={{ padding: 8, flexDirection: 'column' }}>
						<Text style={{ fontSize: 15, marginTop: 4 }}>Atas Nama : Udin Gambut</Text>
						<Text style={{ fontSize: 15, marginTop: 4 }}>No.HP : 0812387123812</Text>
						<Text style={{ fontSize: 15, marginTop: 4 }}>Alamat</Text>
						<View
							style={{
								padding        : 8,
								borderRadius   : 4,
								borderWidth    : 1,
								borderColor    : 'blue',
								marginTop      : 4,
								justifyContent : 'center'
							}}
						>
							<Text>Jlan ululuululululluluuluulullullulululuuluulullullululul</Text>
						</View>
					</View>
				</View>
				<View style={{ padding: 6 }}>
					<Text>Order ID : {checkoutItems.order_id}</Text>
				</View>

				<TouchableOpacity
					onPress={() => confirmBuy(checkoutItems)}
					activeOpacity={0.5}
					style={{
						padding         : 10,
						borderColor     : '#2296F3',
						backgroundColor : '#2296F3',
						borderRadius    : 4,
						borderWidth     : 1,
						justifyContent  : 'center',
						alignItems      : 'center'
					}}
				>
					<Text style={{ fontSize: 17, color: 'white', fontWeight: 'bold' }}>KIRIM</Text>
				</TouchableOpacity>
			</View>

			<View style={{ height: 12, backgroundColor: '#F2F2F4' }} />
			<View style={{ justifyContent: 'center', alignItems: 'center', padding: 16, flex: 1 }}>
				<View style={{ height: 200, width: 200 }}>
					<Image
						style={{
							borderRadius : 8,
							resizeMode   : 'cover',
							height       : '100%',
							width        : '100%',
							flex         : 1
						}}
						source={require('../../../assets/banner/q3.png')}
					/>
				</View>
				<View style={{ padding: 14, flexDirection: 'column' }}>
					<Text style={{ fontSize: 16 }}>Terima Kasih Telah Menggunakan Aplikasi Kami :)</Text>
					<Text style={{ textAlign: 'center', marginTop: 3 }}>{'\u00A9'}Cafely 2020</Text>
				</View>
			</View>
		</View>
	);
};
