import React from 'react';
import { View, Text, Dimensions, StatusBar, Image, TouchableOpacity } from 'react-native';

export const Welcome = ({ navigation }) => {
	const statusBarHeight = StatusBar.currentHeight;
	const height = Dimensions.get('window').height;
	return (
		<React.Fragment>
			<StatusBar translucent barStyle='light-content' backgroundColor='rgba(0,0,0,0.251)' animated />
			<View style={{ flex: 1, paddingTop: statusBarHeight, backgroundColor: 'white' }}>
				<View style={{ flex: 1, backgroundColor: 'white' }}>
					<View style={{ padding: 16 }}>
						<Text style={{ fontWeight: 'bold', fontSize: 25 }}>Cafely</Text>
					</View>
					<View
						style={{
							padding        : 16,
							justifyContent : 'center',
							alignItems     : 'center',
							flex: 1
						}}
					>
						<View style={{ padding: 4 }}>
							<Text style={{ fontSize: 28, fontWeight: 'bold', textAlign: 'center' }}>
								Sometextawokawokawokalaskdlaksdwqweqweqwe
							</Text>
						</View>
						<View style={{ padding: 4, marginTop: 15 }}>
							<TouchableOpacity
								onPress={() => navigation.navigate('Register')}
								style={{ borderWidth: 1, borderColor: 'blue', padding: 10, borderRadius: 15 }}
							>
								<Text style={{ fontSize: 20, fontWeight: '600', textAlign: 'center' }}>
									Daftar Sekarang!
								</Text>
							</TouchableOpacity>
							<TouchableOpacity
								onPress={() => navigation.navigate('Login')}
								activeOpacity={0.6}
								style={{
									borderWidth: 1,
									borderColor: 'blue',
									padding: 10,
									borderRadius: 15,
									marginTop: 8
								}}
							>
								<Text style={{ fontSize: 20, fontWeight: '600', textAlign: 'center' }}>Masuk</Text>
							</TouchableOpacity>
						</View>
					</View>
				</View>
				<View style={{ justifyContent: 'flex-end', backgroundColor: 'white' }}>
					<View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
						<View style={{ padding: 16 }}>
							<Text>Hak Cipta Cafely 2020</Text>
						</View>
						<View style={{ padding: 16 }}>
							<Text>Privacy and Agreement</Text>
						</View>
					</View>
				</View>
			</View>
		</React.Fragment>
	);
};
