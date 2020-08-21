import React from 'react';
import { View, ActivityIndicator, StatusBar, Dimensions } from 'react-native';
import Modal from 'react-native-modal';

export const PreloadContent = (props = null) => {
	const statusBarHeight = StatusBar.currentHeight;
	const { height, width } = Dimensions.get('window');
	return (
		<View
			style={{
				backgroundColor : 'rgba(22,18,18,0.72)',
				justifyContent  : 'center',
				alignItems      : 'center',
				flex            : 1,
				zIndex          : 10
			}}
		>
			<View style={{ justifyContent: 'center', alignItems: 'center' }}>
				<ActivityIndicator size='large' color='#2296F3' />
			</View>
		</View>
	);
};

export const Preloader = () => {
	const { height, width } = Dimensions.get('window');
	return (
		<Modal
			isVisible={false}
			animationIn='fadeIn'
			animationOut='slideOutDown'
			animationInTiming={120}
			animationOutTiming={120}
			backdropTransitionInTiming={120}
			backdropTransitionOutTiming={120}
			style={{
				height,
				width,
				margin : 0,
				zIndex : 1
			}}
		>
			<PreloadContent />
		</Modal>
	);
};
