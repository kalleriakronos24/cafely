import React from 'react';
import { View, Text, ActivityIndicator, StatusBar } from 'react-native';
import { useDarkMode } from 'react-native-dark-mode';
const LoadingSpinner = () => {
	const isDarkMode = useDarkMode();
	return (
		<ActivityIndicator
			style={{
				justifyContent : 'center',
				alignItems     : 'center'
			}}
			size='large'
			color={isDarkMode ? '#2296F3' : 'blue'}
		/>
	);
};
export const SplashScreen = () => {
	const barHeight = StatusBar.currentHeight;
	const isDarkMode = useDarkMode();
	return (
		<React.Fragment>
			<StatusBar
				backgroundColor={isDarkMode ? 'rgba(22,18,18,0.72)' : 'rgba(0,0,0,0.251)'}
				barStyle='light-content'
				animated
				translucent
			/>
			<View
				style={{
					flex            : 1,
					backgroundColor : isDarkMode ? '#121212' : 'white',
					justifyContent  : 'center',
					alignItems      : 'center',
					paddingTop      : barHeight
				}}
			>
				<LoadingSpinner />
			</View>
		</React.Fragment>
	);
};
