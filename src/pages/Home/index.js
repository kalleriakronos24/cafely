import React, { Component, useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
	View,
	StyleSheet,
	Text,
	StatusBar,
	TouchableOpacity,
	Dimensions,
	Image,
	ScrollView,
	TextInput,
	Animated,
	TouchableWithoutFeedback
} from 'react-native';
import Footer from '../../../src/components/Footer/index';
import SearchPanel from '../../../src/components/Search/index';
import Features from '../../../src/components/Features/index';
import News from '../../../src/components/News/index';
import Infos from '../../../src/components/Info/index';
import Vouchers from '../../../src/components/Vouchers/index';
import Listings from '../../../src/components/Listings/index';
import AsyncStorage from '@react-native-community/async-storage';
import { Icon } from 'react-native-elements';
import { useDarkMode } from 'react-native-dark-mode';

export const Home = (props) => {
	const barHeight = StatusBar.currentHeight;
	let scrollY = new Animated.Value(0);

	let [
		menu_list,
		setMenuList
	] = useState([
		{
			id                : 1,
			menu_name         : 'Test A',
			price_ea          : 8000,
			qty               : 1,
			total             : 8000,
			deleted_from_cart : false,
			tambahan_lainnya  : {
				sambel    : true,
				serondeng : true,
				tempe     : true
			}
		},
		{
			id                : 2,
			menu_name         : 'Test B',
			price_ea          : 8000,
			qty               : 1,
			total             : 8000,
			deleted_from_cart : false,
			tambahan_lainnya  : {
				sambel    : true,
				serondeng : true,
				tempe     : true
			}
		},
		{
			id                : 3,
			menu_name         : 'Test C',
			price_ea          : 8000,
			qty               : 1,
			total             : 8000,
			deleted_from_cart : false,
			tambahan_lainnya  : {
				sambel    : true,
				serondeng : true,
				tempe     : true
			}
		}
	]);
	let [
		refresh,
		setRefresh
	] = useState(false);

	const onRefresh = React.useCallback(
		() => {
			setRefresh(true);
			fetchApi();
			wait(2000).then(() => setRefresh(false));
		},
		[
			refresh
		]
	);
	let { width, height } = Dimensions.get('window');
	let baseWidth = 350;
	let baseHeight = 680;

	let scale = (size) => width / baseWidth * size;

	let moderateScale = (size, factor = 0.5) => size + (scale(size) - size) * factor;
	useEffect(() => {
		setRandText(searchText[Math.floor(Math.random() * searchText.length)]);
	}, []);

	const wait = (timeout) => {
		return new Promise((resolve, reject) => {
			setTimeout(resolve, timeout);
		});
	};
	let HEADER_MAX_HEIGHT = width < 410 ? 270 : 300;
	let HEADER_MIN_HEIGHT = 170;
	let HEADER_SCROLL_DISTANCE = HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT;
	const styles = StyleSheet.create({
		fill              : {
			flex : 1
		},
		header            : {
			height          : HEADER_MAX_HEIGHT,
			backgroundColor : '#03A9F4',
			overflow        : 'hidden'
		},
		bar               : {
			backgroundColor : 'transparent',
			top             : 0,
			left            : 0,
			right           : 0,
			position        : 'absolute',
			marginTop       : 30,
			alignItems      : 'center',
			justifyContent  : 'center'
		},
		title             : {
			backgroundColor : 'transparent',
			color           : 'white',
			fontSize        : 18
		},
		scrollViewContent : {
			marginTop : HEADER_MAX_HEIGHT
		},
		backgroundImage   : {
			position   : 'absolute',
			top        : 0,
			left       : 0,
			right      : 0,
			width      : null,
			height     : '100%',
			resizeMode : 'cover'
		}
	});
	const headerOpacity = scrollY.interpolate({
		inputRange  : [
			0,
			10,
			HEADER_SCROLL_DISTANCE
		],
		outputRange : [
			0,
			0,
			1
		],
		extrapolate : 'clamp'
	});
	const statusBarOpacity = scrollY.interpolate({
		inputRange  : [
			0,
			10,
			HEADER_SCROLL_DISTANCE
		],
		outputRange : [
			'0,0,0,0.251',
			'0,0,0,0.251',
			'22,18,18,0.72'
		],
		extrapolate : 'clamp'
	});
	let searchText = [
		'Nasi Kuning',
		'Nasi Pecel',
		'Nasi Padang',
		'Es Milo'
	];
	let [
		randText,
		setRandText
	] = useState('');

	const statusBarColor = scrollY.interpolate({
		inputRange  : [
			0,
			10,
			HEADER_SCROLL_DISTANCE
		],
		outputRange : [
			'blue',
			'blue',
			'red'
		],
		extrapolate : 'clamp'
	});
	const ms = 1000;

	const isDarkMode = useDarkMode();

	const AnimatedStatusBar = Animated.createAnimatedComponent(StatusBar);
	return (
		<View style={{ flex: 1 }}>
			<AnimatedStatusBar translucent barStyle='light-content' backgroundColor='rgba(22,18,18,0.72)' animated />

			<Animated.ScrollView
				style={{
					backgroundColor : isDarkMode ? '#121212' : 'white',
					flex            : 1
				}}
				onScroll={Animated.event(
					[
						{
							nativeEvent : { contentOffset: { y: scrollY } }
						}
					],
					{ useNativeDriver: true }
				)}
				scrollEventThrottle={1}
				showsVerticalScrollIndicator={false}
			>
				<View
					style={[
						styles.header,
						{ flex: 1 }
					]}
				>
					<Image
						style={[
							styles.backgroundImage
						]}
						source={require('../../../assets/banner/warlock.jpg')}
					/>
					<View
						style={[
							{
								width           : '100%',
								height          : '100%',
								position        : 'absolute',
								opacity         : isDarkMode ? 0.4 : 0,
								top             : 0,
								left            : 0,
								backgroundColor : isDarkMode ? 'black' : 'white'
							}
						]}
					/>
					<View
						style={[
							{
								paddingBottom     : 38,
								position          : 'absolute',
								bottom            : 0,
								left              : 0,
								width             : '100%',
								flexDirection     : 'row',
								alignItems        : 'center',
								justifyContent    : 'center',
								paddingHorizontal : 16
							}
						]}
					>
						<View>
							<Text
								style={{
									color        : 'white',
									fontSize     : width < 410 ? 15 : 20,
									fontWeight   : 'bold',
									marginBottom : 6
								}}
							>
								In Light of COVID-19
							</Text>
							<Text style={{ color: 'white', fontSize: width < 410 ? 12 : 15 }}>Sunday, 15 Mar 2020</Text>
						</View>
						<View
							style={[
								{ flex: 1, paddingLeft: 12 }
							]}
						>
							<TouchableOpacity
								onPress={() => props.navigation.navigate('Covid')}
								style={{
									backgroundColor   : '#2296F3',
									borderRadius      : 4,
									paddingHorizontal : 12,
									paddingVertical   : 11,
									alignSelf         : 'stretch',
									alignItems        : 'center',
									justifyContent    : 'center'
								}}
							>
								<View>
									<Text style={{ fontSize: width < 410 ? 12 : 14, color: 'white' }}>
										See what's happenings
									</Text>
								</View>
							</TouchableOpacity>
						</View>
					</View>
				</View>

				<Features navigation={props.navigation} />

				<View style={{ height: 17, backgroundColor: isDarkMode ? '#121212' : '#F2F2F2', marginTop: 20 }} />
				<View style={{ padding: 16, flex: 1 }}>
					<Text
						style={{
							fontSize      : 20,
							letterSpacing : 0.8,
							fontWeight    : '800',
							color         : isDarkMode ? '#B1B1B1' : 'black'
						}}
					>
						Offers of the day
					</Text>
					<ScrollView
						horizontal={true}
						style={{ flexDirection: 'row', flex: 1, margin: 16 }}
						showsHorizontalScrollIndicator={false}
					>
						<View
							style={{
								padding          : 6,
								borderWidth      : 1,
								justifyContent   : 'center',
								alignItems       : 'center',
								borderColor      : isDarkMode ? '#B1B1B1' : 'black',
								height           : 35,
								borderRadius     : 5,
								marginHorizontal : 10,
								elevation        : 1,
								shadowColor      : 'blue',
								shadowOpacity    : 0.8,
								shadowOffset     : {
									width  : 0,
									height : 1
								},
								shadowRadius     : 5
							}}
						>
							<Text
								style={{
									letterSpacing : 1,
									fontSize      : 14,
									textTransform : 'uppercase',
									color         : isDarkMode ? '#B1B1B1' : 'black'
								}}
							>
								Nasi Kuning Ikan Tongkol
							</Text>
						</View>
						<View
							style={{
								padding          : 6,
								borderWidth      : 1,
								justifyContent   : 'center',
								alignItems       : 'center',
								height           : 35,
								borderRadius     : 5,
								marginHorizontal : 10,
								elevation        : 1,
								shadowColor      : 'blue',
								shadowOpacity    : 0.8,
								shadowOffset     : {
									width  : 0,
									height : 1
								},
								shadowRadius     : 5,
								borderColor      : isDarkMode ? '#B1B1B1' : 'black'
							}}
						>
							<Text
								style={{
									letterSpacing : 1,
									fontSize      : 14,
									textTransform : 'uppercase',
									color         : isDarkMode ? '#B1B1B1' : 'black'
								}}
							>
								Nasi Kuning Ayam Bumbu Merah
							</Text>
						</View>
						<View
							style={{
								padding          : 6,
								borderWidth      : 1,
								justifyContent   : 'center',
								alignItems       : 'center',
								height           : 35,
								borderRadius     : 5,
								marginHorizontal : 10,
								elevation        : 1,
								shadowColor      : 'blue',
								shadowOpacity    : 0.8,
								shadowOffset     : {
									width  : 0,
									height : 1
								},
								shadowRadius     : 5,
								borderColor      : isDarkMode ? '#B1B1B1' : 'black'
							}}
						>
							<Text
								style={{
									letterSpacing : 1,
									fontSize      : 14,
									textTransform : 'uppercase',
									color         : isDarkMode ? '#B1B1B1' : 'black'
								}}
							>
								Nasi Kuning Ikan Haruan Bumbu Merah
							</Text>
						</View>
					</ScrollView>
				</View>
				<View style={{ padding: 16 }}>
					<Text
						style={{
							fontSize      : 20,
							letterSpacing : 0.8,
							fontWeight    : '800',
							color         : isDarkMode ? '#B1B1B1' : 'black'
						}}
					>
						Connections
					</Text>
					<Infos />
				</View>

				<Listings navigation={props.navigation} />
			</Animated.ScrollView>
			<View
				style={{
					position  : 'absolute',
					top       : 0,
					left      : 0,
					marginTop : barHeight,
					height    : 60
				}}
			>
				<View style={{ flex: 1, position: 'relative' }}>
					<Animated.View
						style={{
							backgroundColor : 'rgba(22,18,18,0.72)',
							height          : '100%',
							width           : '100%',
							opacity         : headerOpacity,
							position        : 'absolute'
						}}
					/>

					<View
						style={{
							paddingHorizontal : 10,
							flexDirection     : 'row',
							alignItems        : 'center',
							zIndex            : 10
						}}
					>
						<TouchableOpacity
							activeOpacity={0.8}
							onPress={() => props.navigation.navigate('Search')}
							style={{
								flexDirection   : 'row',
								borderWidth     : 0.6,
								backgroundColor : 'white',
								alignItems      : 'center',
								marginTop       : 10,
								padding         : 5,
								height          : 40,
								borderRadius    : 10,
								width           : width - 10 - 50 * 2
							}}
						>
							<Icon name='ios-search' type='ionicon' />
							<Text style={{ color: 'black', opacity: 0.5, marginLeft: 5 }}>Cari {randText} ...</Text>
						</TouchableOpacity>
						<TouchableOpacity
							activeOpacity={0.5}
							onPress={() => props.navigation.navigate('Wishlist')}
							style={{
								padding        : 5,
								height         : 50,
								width          : 50,
								justifyContent : 'center',
								alignItems     : 'center',
								marginTop      : 10
							}}
						>
							<Icon name='ios-bookmark' color='white' type='ionicon' size={30} />
						</TouchableOpacity>
						<TouchableOpacity
							activeOpacity={0.5}
							onPress={() => props.navigation.navigate('Promotion')}
							style={{
								padding        : 5,
								height         : 50,
								width          : 50,
								justifyContent : 'center',
								alignItems     : 'center',
								marginTop      : 10
							}}
						>
							<Icon name='md-pricetags' color='white' type='ionicon' size={30} />
						</TouchableOpacity>
					</View>
				</View>
			</View>
			<Footer navigation={props.navigation} home_active_link={true} />
		</View>
	);
};
