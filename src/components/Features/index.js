import React, { Component, useState, useEffect } from 'react';
import { View, Text, Image, Dimensions } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Icon } from 'react-native-elements';
import { useDarkMode } from 'react-native-dark-mode';
const Features = (props) => {
	let { width, height } = Dimensions.get('window');

	const isDarkMode = useDarkMode();
	return (
		<View
			style={{
				flexDirection: 'row',
				flexWrap: 'wrap',
				marginHorizontal: 0,
				marginTop: 18
			}}
		>
			<View style={{ justifyContent: 'space-between', flexDirection: 'row', width: '100%', marginBottom: 18 }}>
				<View style={{ alignItems: 'center', width: `${100 / 4}%` }}>
					<TouchableOpacity activeOpacity={0} onPress={() => props.navigation.navigate('Buy')}>
						<View
							style={{
								width: 58,
								height: 58,
								borderWidth: 1,
								borderColor: isDarkMode ? '#B1B1B1' : 'black',
								borderRadius: 14,
								justifyContent: 'center',
								alignItems: 'center'
							}}
						>
							<Icon
								name='restaurant'
								size={44}
								color={isDarkMode ? '#B1B1B1' : 'black'}
							/>
						</View>
						<Text
							style={{
								fontSize: width < 410 ? 11 : 13,
								fontWeight: 'bold',
								textAlign: 'center',
								marginTop: 6,
								color: isDarkMode ? '#B1B1B1' : 'black'
							}}
						>
							FOOD
						</Text>
					</TouchableOpacity>
				</View>

				<View style={{ alignItems: 'center', width: `${100 / 4}%` }}>
					<TouchableOpacity
						activeOpacity={0}
						style={{
							width: 58,
							height: 58,
							borderWidth: 1,
							borderColor: isDarkMode ? '#B1B1B1' : 'black',
							borderRadius: 14,
							justifyContent: 'center',
							alignItems: 'center'
						}}
						onPress={() => props.navigation.navigate('Laundry')}
					>
						<Icon name='ios-help' size={44} color={isDarkMode ? '#B1B1B1' : 'black'} type='ionicon' />
					</TouchableOpacity>
					<Text
						style={{
							fontSize: width < 410 ? 11 : 13,
							fontWeight: 'bold',
							textAlign: 'center',
							marginTop: 6,
							color: isDarkMode ? '#B1B1B1' : 'black'
						}}
					>
						Laundry
					</Text>
				</View>

				<View style={{ alignItems: 'center', width: `${100 / 4}%` }}>
					<View
						style={{
							width: 58,
							height: 58,
							borderWidth: 1,
							borderColor: isDarkMode ? '#B1B1B1' : 'black',
							borderRadius: 14,
							justifyContent: 'center',
							alignItems: 'center'
						}}
					>
						<Icon name='ios-help' size={44} color={isDarkMode ? '#B1B1B1' : 'black'} type='ionicon' />
					</View>
					<Text
						style={{
							fontSize: width < 410 ? 11 : 13,
							fontWeight: 'bold',
							textAlign: 'center',
							marginTop: 6,
							color: isDarkMode ? '#B1B1B1' : 'black'
						}}
					>
						Coming Soon
					</Text>
				</View>

				<View style={{ alignItems: 'center', width: `${100 / 4}%` }}>
					<View
						style={{
							width: 58,
							height: 58,
							borderWidth: 1,
							borderColor: isDarkMode ? '#B1B1B1' : 'black',
							borderRadius: 14,
							justifyContent: 'center',
							alignItems: 'center'
						}}
					>
						<Icon name='ios-help' size={44} color={isDarkMode ? '#B1B1B1' : 'black'} type='ionicon' />
					</View>
					<Text
						style={{
							fontSize: width < 410 ? 11 : 13,
							fontWeight: 'bold',
							textAlign: 'center',
							marginTop: 6,
							color: isDarkMode ? '#B1B1B1' : 'black'
						}}
					>
						Coming Soon
					</Text>
				</View>
			</View>

			<View style={{ justifyContent: 'space-between', flexDirection: 'row', width: '100%' }}>
				<View style={{ alignItems: 'center', width: `${100 / 4}%` }}>
					<View
						style={{
							width: 58,
							height: 58,
							borderWidth: 1,
							borderColor: isDarkMode ? '#B1B1B1' : 'black',
							borderRadius: 14,
							justifyContent: 'center',
							alignItems: 'center'
						}}
					>
						<Icon name='ios-help' size={44} color={isDarkMode ? '#B1B1B1' : 'black'} type='ionicon' />
					</View>
					<Text
						style={{
							fontSize: width < 410 ? 11 : 13,
							fontWeight: 'bold',
							textAlign: 'center',
							marginTop: 6,
							color: isDarkMode ? '#B1B1B1' : 'black'
						}}
					>
						Coming Soon
					</Text>
				</View>

				<View style={{ alignItems: 'center', width: `${100 / 4}%` }}>
					<View
						style={{
							width: 58,
							height: 58,
							borderWidth: 1,
							borderColor: isDarkMode ? '#B1B1B1' : 'black',
							borderRadius: 14,
							justifyContent: 'center',
							alignItems: 'center'
						}}
					>
						<Icon name='ios-help' size={44} color={isDarkMode ? '#B1B1B1' : 'black'} type='ionicon' />
					</View>
					<Text
						style={{
							fontSize: width < 410 ? 11 : 13,
							fontWeight: 'bold',
							textAlign: 'center',
							marginTop: 6,
							color: isDarkMode ? '#B1B1B1' : 'black'
						}}
					>
						Coming Soon
					</Text>
				</View>

				<View style={{ alignItems: 'center', width: `${100 / 4}%` }}>
					<View
						style={{
							width: 58,
							height: 58,
							borderWidth: 1,
							borderColor: isDarkMode ? '#B1B1B1' : 'black',
							borderRadius: 14,
							justifyContent: 'center',
							alignItems: 'center'
						}}
					>
						<Icon name='ios-help' size={44} color={isDarkMode ? '#B1B1B1' : 'black'} type='ionicon' />
					</View>
					<Text
						style={{
							fontSize: width < 410 ? 11 : 13,
							fontWeight: 'bold',
							textAlign: 'center',
							marginTop: 6,
							color: isDarkMode ? '#B1B1B1' : 'black'
						}}
					>
						Coming Soon
					</Text>
				</View>

				<View style={{ alignItems: 'center', width: `${100 / 4}%` }}>
					<View
						style={{
							width: 58,
							height: 58,
							borderWidth: 1,
							borderColor: isDarkMode ? '#B1B1B1' : 'black',
							borderRadius: 14,
							justifyContent: 'center',
							alignItems: 'center'
						}}
					>
						<Icon name='ios-help' size={44} color={isDarkMode ? '#B1B1B1' : 'black'} type='ionicon' />
					</View>
					<Text
						style={{
							fontSize: width < 410 ? 11 : 13,
							fontWeight: 'bold',
							textAlign: 'center',
							marginTop: 6,
							color: isDarkMode ? '#B1B1B1' : 'black'
						}}
					>
						Coming Soon
					</Text>
				</View>
			</View>
		</View>
	);
};

export default Features;
