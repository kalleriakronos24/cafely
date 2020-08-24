import React, { Component } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

import AsyncStorage from '@react-native-community/async-storage';
import Icon from 'react-native-vector-icons/Ionicons';
import { os } from '../../globals/global'
import { useDarkMode } from 'react-native-dark-mode';

const Footer = (props) => {
	const { navigation } = props;
	const isDarkMode = useDarkMode();

	return (
		<View
			style={{
				backgroundColor: isDarkMode ? '#121212' : 'white',
				height: 54,
				flexDirection: 'row'
			}}
		>
			<TouchableOpacity
				activeOpacity={0.6}
				onPress={() => navigation.navigate('Home')}
				style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}
			>
				<View style={{ width: 26, height: 26, justifyContent: 'center', alignItems: 'center' }}>
					<Icon name='md-home' color={'white'} size={26} />
				</View>
				<Text
					style={{
						fontSize: 10,
						marginTop: 4,
						color: isDarkMode ? '#B1B1B1' : 'black'
					}}
				>
					Home
				</Text>
			</TouchableOpacity>
			<TouchableOpacity
				activeOpacity={0.6}
				onPress={() => navigation.navigate('Courier')}
				style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}
			>
				<View style={{ width: 26, height: 26 }}>
					<Icon name='md-heart' size={26} color={isDarkMode ? '#B1B1B1' : 'blue'} />
				</View>
				<Text
					style={{
						fontSize: 10,
						marginTop: 4,
						color: isDarkMode ? '#B1B1B1' : 'black'
					}}
				>
					Orders
				</Text>
			</TouchableOpacity>
			<TouchableOpacity
				activeOpacity={0.6}
				onPress={() => navigation.navigate('CartNew')}
				style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}
			>
				<View style={{ width: 26, height: 26 }}>
					<Icon name='ios-happy' size={26} color={isDarkMode ? '#B1B1B1' : 'blue'} />
				</View>
				<Text
					style={{
						fontSize: 10,
						marginTop: 4,
						color: isDarkMode ? '#B1B1B1' : 'black'
					}}
				>
					Warungku
				</Text>
			</TouchableOpacity>
			<TouchableOpacity
				activeOpacity={0.6}
				onPress={() => navigation.navigate('Inbox')}
				style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}
			>
				<View style={{ width: 26, height: 26 }}>
					<Icon name='md-mail' size={26} color={isDarkMode ? '#B1B1B1' : 'blue'} />
				</View>
				<Text
					style={{
						fontSize: 10,
						marginTop: 4,
						color: isDarkMode ? '#B1B1B1' : 'black'
					}}
				>
					Inbox
				</Text>
			</TouchableOpacity>
			<TouchableOpacity
				activeOpacity={0.6}
				style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}
				onPress={() => navigation.navigate('Account')}
			>
				<View style={{ width: 26, height: 26 }}>
					<Icon name='md-person' size={26} color={isDarkMode ? '#B1B1B1' : 'blue'} />
				</View>
				<Text
					style={{
						fontSize: 10,
						marginTop: 4,
						color: isDarkMode ? '#B1B1B1' : 'black'
					}}
				>
					Account
				</Text>
			</TouchableOpacity>
		</View>
	);
};

export default Footer;
