import React from 'react';
import { View, Text, ActivityIndicator } from 'react-native';

const ImagePlacebo = () => {
	return (
		<View
			style={{
				backgroundColor : '#282621',
				flex            : 1,
				width           : '100%',
				height          : '100%',
				justifyContent  : 'center',
				alignItems      : 'center'
			}}
		>
			<ActivityIndicator color='white' size={'large'} />
		</View>
	);
};
export default ImagePlacebo;
