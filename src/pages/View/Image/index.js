import React from 'react';
import { View, Text, StatusBar, Dimensions } from 'react-native';

export const ViewImage = ({ navigation }) => {

	const { width, height } = Dimensions.get('window');
	const statusBarHeight = StatusBar.currentHeight;

	return (
		<View>
			<Text>qwe</Text>
		</View>
	);
};
