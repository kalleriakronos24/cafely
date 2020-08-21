import React, { useEffect, useState } from 'react';
import {
	View,
	Text,
	Animated,
	Dimensions,
	StatusBar,
	TouchableOpacity,
	ScrollView,
	Image,
	ActivityIndicator
} from 'react-native';
import { Icon } from 'react-native-elements';
import NumericInput from 'react-native-numeric-input';

import { ADD_CART_COUNT, ADD_CART_ITEMS, VIEW_SINGLE } from '../../Redux/actions/action';
import AsyncStorage from '@react-native-community/async-storage';
export const Wishlist = ({ navigation }) => {
	let scrollY = new Animated.Value(0);

	const { width, height } = Dimensions.get('window');
	const statusBarHeight = StatusBar.currentHeight;
	const headerOpacity = scrollY.interpolate({
		inputRange: [
			0,
			(statusBarHeight + 60 + 16 + 10) / 2,
			statusBarHeight + 60 + 16 + 10
		],
		outputRange: [
			0,
			0.5,
			1
		],
		extrapolate: 'clamp'
	});

	const hideTextOpacity = scrollY.interpolate({
		inputRange: [
			0,
			(statusBarHeight + 60 + 16 + 10) / 2,
			statusBarHeight + 60 + 16 + 10
		],
		outputRange: [
			1,
			0.7,
			0
		],
		extrapolate: 'clamp'
	});
	const showTextOpacity = scrollY.interpolate({
		inputRange: [
			0,
			(statusBarHeight + 60 + 16) / 2,
			statusBarHeight + 60 + 16
		],
		outputRange: [
			0,
			0.7,
			1
		],
		extrapolate: 'clamp'
	});
	const empty = false;
	const ViewSingleFood = (val, idx) => {
		dispatch(VIEW_SINGLE({ val }));
		if (val !== null) {
			navigation.navigate('FoodSingle');
		}
	};
	const name = 'qweqweqweqweqweqweqweqweqwe';
	let [
		bookmark,
		setBookmark
	] = useState([]);
	useEffect(() => {
		AsyncStorage.getItem('bookmark', (e, r) => r)
			.then((res) => {
				setBookmark(JSON.parse(res));
			})
			.catch((err) => {
				console.log(err);
			});
	}, []);
	const removeBookmark = async (idx) => {
		setBookmark(bookmark.filter((_, i) => i !== idx));
		const item = await AsyncStorage.getItem('bookmark');
		var arr = JSON.parse(item) || [];

		if (!arr) {
			arr = [];
		}

		const newItem = arr.filter((v, i) => i !== idx);
		await AsyncStorage.setItem('bookmark', JSON.stringify(newItem))
			.then(() => {
				console.log('unsaved');
			})
			.catch((err) => {
				throw new Error(err);
			});
	};
	return (
		<React.Fragment>
			<Animated.ScrollView
				showsVerticalScrollIndicator={false}
				onScroll={Animated.event(
					[
						{
							nativeEvent: { contentOffset: { y: scrollY } }
						}
					],
					{ useNativeDriver: true }
				)}
				scrollEventThrottle={16}
				style={{ paddingTop: statusBarHeight + 60, backgroundColor: 'white' }}
			>
				{bookmark.length < 1 ? (
					<View
						style={{
							padding: 16,
							flex: 1,
							justifyContent: 'center',
							alignItems: 'center',
							flexDirection: 'row',
							marginTop: (height - statusBarHeight - 60 - 16 - 10) / 2
						}}
					>
						<Text style={{ fontSize: 16 }}>-</Text>
						<View style={{ padding: 6, marginHorizontal: 10 }}>
							<Text style={{ fontSize: 18, fontWeight: '600', letterSpacing: 1 }}>
								Tidak ada data Bookmark ditemukan
							</Text>
						</View>
						<Text style={{ fontSize: 16 }}>-</Text>
					</View>
				) : (
						<React.Fragment>
							<View style={{ padding: 16, flex: 1 }}>
								{bookmark.map((v, i) => (
									<React.Fragment>
										<View style={{ paddingBottom: 7 }}>
											<View
												style={{
													borderWidth: 1,
													borderColor: 'blue',
													padding: 6,
													borderRadius: 10
												}}
											>
												<TouchableOpacity
													activeOpacity={0.5}
													onPress={() => removeBookmark(i)}
													style={{ flexDirection: 'row', justifyContent: 'space-between' }}
												>
													<View />
													<View style={{ padding: 6, height: 30, width: 30 }}>
														<Icon name='ios-close' type='ionicon' size={30} />
													</View>
												</TouchableOpacity>
												<View style={{ flexDirection: 'row' }}>
													<TouchableOpacity style={{ borderRadius: 10 }}>
														<View
															style={{
																borderRadius: 8,
																height: 200,
																width: 187,
																position: 'relative'
															}}
														>
															<Image
																style={{
																	borderRadius: 8,
																	resizeMode: 'cover',
																	height: '100%',
																	width: '100%',
																	flex: 1
																}}
																source={require('../../../assets/banner/q3.png')}
															/>
															<View
																style={{
																	borderRadius: 8,
																	width: '100%',
																	height: '100%',
																	position: 'absolute',
																	top: 0,
																	left: 0,
																	backgroundColor: 'black',
																	opacity: 0.2
																}}
															/>
														</View>
														<View
															style={{
																paddingBottom: 10,
																paddingLeft: 10,
																position: 'absolute',
																bottom: 0,
																left: 0,
																width: '100%',
																flexDirection: 'column',
																paddingHorizontal: 2
															}}
														>
															<Text
																ellipsizeMode={'tail'}
																numberOfLines={1}
																style={{
																	fontSize: width < 410 ? 15 : 18,
																	fontWeight: 'bold',
																	marginTop: 14,
																	color: 'white',
																	textTransform: 'capitalize'
																}}
															>
																{v.menu_name}
															</Text>
															<Text
																style={{
																	marginTop: 2,
																	fontSize: width < 410 ? 14 : 17,
																	color: 'white'
																}}
															>
																Rp.{v.price_ea},-
														</Text>
														</View>
													</TouchableOpacity>
													<View style={{ marginLeft: 16, flex: 1, flexDirection: 'column' }}>
														<Text
															ellipsizeMode={'tail'}
															numberOfLines={1}
															style={{
																fontSize: 20,
																fontWeight: 'bold',
																fontFamily: 'Roboto',
																textTransform: 'capitalize'
															}}
														>
															qqqweqweqweqweqweqweqwqwqweqweqweqwewqwe
													</Text>
														<View style={{ padding: 4 }}>
															<Text
																ellipsizeMode={'tail'}
																numberOfLines={2}
																style={{ fontSize: 15, marginTop: 5 }}
															>
																wqeqweqweqweqweqwewqeqweqweqwewqeqwewqe
																qweqweqweqweqweqweqwe
														</Text>
														</View>

														<View style={{ padding: 4, justifyContent: 'flex-start' }}>
															{0 === 0 ? (
																<View style={{ flexDirection: 'row' }}>
																	<Icon name='ios-pin' type='ionicon' />
																	<Text style={{ marginLeft: 5 }}>0.9 km</Text>
																</View>
															) : (
																	<ActivityIndicator />
																)}
														</View>
														<View
															style={{
																flex: 1,
																padding: 6,
																justifyContent: 'center',
																alignItems: 'center'
															}}
														>
															<View
																style={{
																	width: '35%',
																	height: 50,
																	left: 0,
																	top: 0,
																	alignItems: 'center',
																	justifyContent: 'center'
																}}
															>
																<NumericInput
																	initValue={1}
																	value={1}
																	minValue={1}
																	editable={true}
																	borderColor={'white'}
																	totalHeight={34}
																	containerStyle={{
																		borderWidth: 0
																	}}
																	iconSize={25}
																/>
															</View>
															<TouchableOpacity
																style={{
																	backgroundColor: '#2296F3',
																	width: '100%',
																	height: 32,
																	borderRadius: 4,
																	alignItems: 'center',
																	justifyContent: 'center'
																}}
															>
																<Text style={{ fontSize: 14, color: 'white' }}>ORDER</Text>
															</TouchableOpacity>
														</View>
													</View>
												</View>
											</View>
										</View>
									</React.Fragment>
								))}
							</View>
							<View style={{ paddingBottom: statusBarHeight + 60 + 16 }} />
						</React.Fragment>
					)}
			</Animated.ScrollView>
			<View
				style={{
					position: 'absolute',
					top: 0,
					left: 0,
					marginTop: statusBarHeight,
					height: 60,
					backgroundColor: 'transparent',
					marginBottom: 10
				}}
			>
				<View style={{ flex: 1, position: 'relative' }}>
					<Animated.View
						style={{
							backgroundColor: 'rgba(22,18,18,0.72)',
							height: '100%',
							width: '100%',
							opacity: headerOpacity,
							position: 'absolute'
						}}
					/>

					<View
						style={{
							paddingHorizontal: 10,
							flexDirection: 'row',
							alignItems: 'center',
							zIndex: 10,
							opacity: 0.9
						}}
					>
						<TouchableOpacity
							onPress={() => navigation.goBack()}
							style={{
								padding: 5,
								height: 40,
								width: 40,
								justifyContent: 'center',
								alignItems: 'center',
								marginTop: 10
							}}
						>
							<Icon name='md-arrow-round-back' color='black' type='ionicon' size={20} />
						</TouchableOpacity>
						<View
							style={{
								flexDirection: 'column',
								marginTop: 10,
								padding: 5,
								width: width - 10 * 2 - 40 * 3 - 5
							}}
						>
							<View style={{ position: 'relative' }}>
								<Animated.Text
									style={{
										color: 'white',
										opacity: showTextOpacity,
										marginLeft: 5,
										fontSize: 20,
										fontWeight: 'bold',
										letterSpacing: 0.8,
										position: 'absolute'
									}}
								>
									Bookmarks
								</Animated.Text>
								<Animated.Text
									style={{
										color: 'black',
										opacity: hideTextOpacity,
										marginLeft: 5,
										fontSize: 20,
										fontWeight: 'bold',
										letterSpacing: 0.8,
										position: 'absolute'
									}}
								>
									Bookmarks
								</Animated.Text>
							</View>

							<Animated.Text
								style={{
									color: 'white',
									opacity: showTextOpacity,
									marginLeft: 5,
									fontSize: 14,
									marginTop: 20
								}}
							>
								5 items
							</Animated.Text>
						</View>
						<TouchableOpacity
							style={{
								padding: 5,
								height: 40,
								width: 40,
								justifyContent: 'center',
								alignItems: 'center',
								marginTop: 10,
								marginRight: 5
							}}
						>
							<Icon name='ios-cart' color='black' type='ionicon' size={20} />
						</TouchableOpacity>
						<TouchableOpacity
							style={{
								padding: 5,
								height: 40,
								width: 40,
								justifyContent: 'center',
								alignItems: 'center',
								marginTop: 10
							}}
						>
							<Icon name='md-more' color='black' type='ionicon' size={20} />
						</TouchableOpacity>
					</View>

					<View style={{ borderBottomColor: 'silver', borderBottomWidth: 1 }} />
				</View>
			</View>
		</React.Fragment>
	);
};
