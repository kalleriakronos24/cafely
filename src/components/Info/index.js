import React, { Component, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { View, Image, Text, TouchableOpacity, Dimensions, ActivityIndicator } from 'react-native';
import { useDarkMode } from 'react-native-dark-mode';

const Infos = ({ navigation }) => {
	let { width, height } = Dimensions.get('window');
	let [
		isLoading,
		setLoading
	] = useState(true);
	const isDarkMode = useDarkMode();
	return (
		<View>
			<View style={{ padding: 16 }}>
				<View style={{ flexDirection: 'row' }}>
					<View>
						<Image style={{ height: 100, width: 100 }} source={require('../../../assets/img/fb.png')} />
					</View>

					<View style={{ marginLeft: 16, flex: 1 }}>
						<Text
							style={{
								fontSize   : width < 410 ? 15 : 17,
								fontWeight : 'bold',
								color      : isDarkMode ? '#B1B1B1' : 'black'
							}}
						>
							Connect with Facebook
						</Text>
						<Text style={{ fontSize: width < 410 ? 13 : 16, color: isDarkMode ? '#B1B1B1' : 'black' }}>
							Login Cepat Menggunakan Facebook, tanpa harus memerlukan kode verifikasi
						</Text>
					</View>
				</View>
				<TouchableOpacity
					style={{
						backgroundColor   : '#2296F3',
						width             : '35%',
						height            : 32,
						borderRadius      : 4,
						paddingHorizontal : 12,
						paddingVertical   : 11,
						alignSelf         : 'flex-end',
						alignItems        : 'center',
						justifyContent    : 'center',
						color             : isDarkMode ? '#B1B1B1' : 'black'
					}}
				>
					<Text style={{ fontSize: width < 410 ? 12 : 14, color: 'white' }}>CONNECT</Text>
				</TouchableOpacity>
				<View style={{ paddingBottom: 20, borderBottomColor: '#2296F3', borderBottomWidth: 1 }} />
			</View>
		</View>
	);
};

export default Infos;
