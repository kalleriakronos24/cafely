import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { Icon } from 'react-native-elements';

export const BukaWarung = ({ navigation }) => {
	const empty = true;
	return (
		<View style={{ flex: 1, backgroundColor: 'white' }}>
			{empty ? (
				<View style={{ alignItems: 'center', justifyContent: 'center', flex: 1, padding: 16 }}>
					<View style={{ padding: 4, height: 200, width: 300, marginTop: -30 }}>
						<Icon name='ios-sad' color='blue' type='ionicon' size={200} />
					</View>
					<View style={{ padding: 10, marginTop: 5 }}>
						<Text style={{ textAlign: 'center' }}>
							Tidak ada data warung ditemukan, ayo daftarkan warungmu sekarang juga :)
						</Text>
					</View>
					<TouchableOpacity
						activeOpacity={0.5}
						onPress={() => navigation.navigate('Warung_Create')}
						style={{
							padding         : 10,
							borderWidth     : 1,
							marginTop       : 10,
							borderRadius    : 5,
							backgroundColor : '#2296F3',
							borderColor     : '#2296F3'
						}}
					>
						<Text style={{ fontSize: 20, fontWeight: 'bold', color: 'white' }}>Buka warung sekarang!</Text>
					</TouchableOpacity>
				</View>
			) : (
				<React.Fragment>
					<View style={{ padding: 16 }}>
						<View
							style={{
								padding        : 4,
								flexDirection  : 'row',
								justifyContent : 'space-between',
								alignItems     : 'center'
							}}
						>
							<Text style={{ fontSize: 19, fontWeight: '600' }}>Warungku</Text>
							<View
								style={{
									padding         : 6,
									borderRadius    : 20,
									width           : 30,
									height          : 30,
									justifyContent  : 'center',
									alignItems      : 'center',
									backgroundColor : 'blue'
								}}
							>
								<Text style={{ fontSize: 17, fontWeight: 'bold', color: 'white' }}>1</Text>
							</View>
						</View>
						<View style={{ borderBottomWidth: 1, borderColor: 'blue', marginVertical: 15 }} />
						<View
							style={{
								padding      : 10,
								borderWidth  : 1,
								borderRadius : 5
							}}
						>
							<View style={{ flexDirection: 'row' }}>
								<View style={{ padding: 4, height: 130, width: 130, borderRadius: 10 }}>
									<Image
										source={require('../../../../assets/banner/q3.png')}
										style={{ height: '100%', width: '100%', resizeMode: 'cover', borderRadius: 10 }}
									/>
								</View>
								<View style={{ flexDirection: 'column', padding: 4 }}>
									<Text
										style={{
											fontSize      : 16,
											fontWeight    : 'bold',
											textTransform : 'capitalize',
											padding       : 5
										}}
										ellipsizeMode={'tail'}
										numberOfLines={1}
									>
										Warung makan prapatan
									</Text>
									<Text
										style={{
											marginLeft    : 10,
											letterSpacing : 0.4,
											fontSize      : 13,
											textTransform : 'capitalize'
										}}
									>
										Makanan, Minuman, Cemilan
									</Text>
									<View style={{ padding: 2, width: 200, flexDirection: 'row', marginLeft: 10 }}>
										<Icon name='ios-pin' type='ionicon' size={15} />
										<Text numberOfLines={2} ellipsizeMode={'tail'} style={{ fontSize: 13 }}>
											Jalan santi murni sejati 3 kelurahansungai kapih sambutan samarinda no 510
										</Text>
									</View>
								</View>
							</View>
							<View
								style={{
									flexDirection     : 'row',
									justifyContent    : 'space-between',
									alignItems        : 'center',
									paddingHorizontal : 6,
									paddingVertical   : 4
								}}
							>
								<View
									style={{
										padding         : 10,
										justifyContent  : 'center',
										alignItems      : 'center',
										flexDirection   : 'row',
										backgroundColor : 'green',
										width           : 100,
										borderRadius    : 5
									}}
								>
									<Icon name='ios-paper' color='white' type='ionicon' />
									<Text style={{ marginLeft: 5, fontWeight: 'bold', color: 'white' }}>Edit</Text>
								</View>
								<View
									style={{
										padding         : 10,
										justifyContent  : 'center',
										alignItems      : 'center',
										flexDirection   : 'row',
										backgroundColor : 'blue',
										width           : 100,
										borderRadius    : 5
									}}
								>
									<Icon name='md-eye' color='white' type='ionicon' />
									<Text style={{ marginLeft: 5, fontWeight: 'bold', color: 'white' }}>Lihat</Text>
								</View>
								<View
									style={{
										padding         : 10,
										justifyContent  : 'center',
										alignItems      : 'center',
										flexDirection   : 'row',
										backgroundColor : 'red',
										width           : 100,
										borderRadius    : 5
									}}
								>
									<Icon name='md-trash' color='white' type='ionicon' />
									<Text style={{ marginLeft: 5, fontWeight: 'bold', color: 'white' }}>Hapus</Text>
								</View>
							</View>
						</View>
					</View>
				</React.Fragment>
			)}
		</View>
	);
};
