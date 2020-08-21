import React from 'react';
import { StyleSheet, Text, View, ScrollView } from 'react-native';

const Laundry = () => {
	return (
		<View style={styles.wrapper}>
			<ScrollView style={styles.wrapperContent}>
				<View style={{ flex: 1 }}>
					<View style={styles.headerContainer}>
						<View style={styles.headerContent}>
							<Text>Laundry is now ! (BETA).png</Text>
						</View>
					</View>
					<View style={{ paddingTop: 10, justifyContent: 'space-between', flexDirection: 'row' }}>
						<Text>4 Laundry's Open</Text>
					</View>
				</View>
			</ScrollView>
		</View>
	);
};

export default Laundry;

const styles = StyleSheet.create({
	wrapper         : {
		flex            : 1,
		backgroundColor : 'white'
	},
	wrapperContent  : {
		padding : 16
	},
	headerContainer : {
		height       : 150,
		borderWidth  : 0.5,
		borderRadius : 6
	},
	headerContent   : {
		flex           : 1,
		alignItems     : 'center',
		justifyContent : 'center'
	}
});
