import React from 'react';
import { View, Text, Animated, Dimensions, StatusBar, TouchableOpacity, ScrollView, Image } from 'react-native';
import { Icon } from 'react-native-elements';

export const Promotion = ({ navigation }) => {
	let scrollY = new Animated.Value(0);

	const { width, height } = Dimensions.get('window');
	const statusBarHeight = StatusBar.currentHeight;
	const headerOpacity = scrollY.interpolate({
		inputRange  : [
			0,
			(statusBarHeight + 60 + 16 + 10) / 2,
			statusBarHeight + 60 + 16 + 10
		],
		outputRange : [
			0,
			0.5,
			1
		],
		extrapolate : 'clamp'
	});

	const hideTextOpacity = scrollY.interpolate({
		inputRange  : [
			0,
			(statusBarHeight + 60 + 16 + 10) / 2,
			statusBarHeight + 60 + 16 + 10
		],
		outputRange : [
			1,
			0.7,
			0
		],
		extrapolate : 'clamp'
	});
	const showTextOpacity = scrollY.interpolate({
		inputRange  : [
			0,
			(statusBarHeight + 60 + 16) / 2,
			statusBarHeight + 60 + 16
		],
		outputRange : [
			0,
			0.7,
			1
		],
		extrapolate : 'clamp'
	});
	const empty = true;
	return (
		<React.Fragment>
			<Animated.ScrollView
				showsVerticalScrollIndicator={false}
				onScroll={Animated.event(
					[
						{
							nativeEvent : { contentOffset: { y: scrollY } }
						}
					],
					{ useNativeDriver: true }
				)}
				scrollEventThrottle={1}
				style={{ paddingTop: statusBarHeight + 60, backgroundColor: 'white' }}
			>
				{empty ? (
					<View
						style={{
							padding        : 16,
							flex           : 1,
							justifyContent : 'center',
							alignItems     : 'center',
							flexDirection  : 'row',
							marginTop      : (height - statusBarHeight - 60 - 16 - 10) / 2
						}}
					>
						<Text style={{ fontSize: 16 }}>-</Text>
						<View style={{ padding: 6, marginHorizontal: 10 }}>
							<Text style={{ fontSize: 18, fontWeight: '600', letterSpacing: 1 }}>
								Tidak ada Promo ditemukan
							</Text>
						</View>
						<Text style={{ fontSize: 16 }}>-</Text>
					</View>
				) : (
					<React.Fragment>
						<View style={{ padding: 16, flex: 1 }}>
							<Text style={{ fontSize: 20, fontWeight: 'bold' }}>Warungs Promotion</Text>
							<View style={{ marginTop: 10 }}>
								<View style={{ flex: 1 }}>
									<View
										style={{
											flexDirection  : 'row',
											justifyContent : 'space-between',
											alignItems     : 'center'
										}}
									>
										<Text style={{ fontSize: 20 }}>Warung Test</Text>
										<Icon name='ios-list' type='ionicon' color='blue' />
									</View>
									<ScrollView
										horizontal={true}
										style={{ flexDirection: 'row', padding: 10 }}
										showsHorizontalScrollIndicator={false}
									>
										<TouchableOpacity style={{ marginHorizontal: 8 }}>
											<View
												style={{
													borderRadius : 8,
													width        : width < 410 ? 110 : 180,
													height       : width < 410 ? 170 : 240,
													position     : 'relative'
												}}
											>
												<Image
													style={{
														borderRadius : 8,
														resizeMode   : 'cover',
														height       : '100%',
														width        : '100%'
													}}
													source={require('../../../assets/banner/q3.png')}
												/>
												<View
													style={{
														borderRadius    : 8,
														width           : '100%',
														height          : '100%',
														position        : 'absolute',
														top             : 0,
														left            : 0,
														backgroundColor : 'black',
														opacity         : 0.2
													}}
												/>
											</View>
											<View
												style={{
													paddingBottom     : 10,
													paddingLeft       : 10,
													position          : 'absolute',
													bottom            : 0,
													left              : 0,
													width             : '100%',
													flexDirection     : 'column',
													paddingHorizontal : 2
												}}
											>
												<Text
													style={{
														fontSize      : width < 410 ? 15 : 18,
														fontWeight    : 'bold',
														marginTop     : 14,
														color         : 'white',
														textTransform : 'capitalize'
													}}
												>
													ppg
												</Text>
												<View style={{ flexDirection: 'row' }}>
													<Text
														style={{
															marginTop : 2,
															fontSize  : width < 410 ? 14 : 17,
															color     : 'white'
														}}
													>
														Rp.12324,-{' '}
													</Text>
													<Text
														style={{
															marginTop           : 2,
															fontSize            : width < 410 ? 11 : 14,
															color               : 'white',
															textDecorationLine  : 'line-through',
															textDecorationStyle : 'solid'
														}}
													>
														Rp.12324,-
													</Text>
												</View>
											</View>
										</TouchableOpacity>
										{false ? (
											<React.Fragment>
												<View style={{ marginHorizontal: 8 }}>
													<View
														style={{
															borderRadius    : 8,
															width           : width < 410 ? 110 : 180,
															height          : width < 410 ? 170 : 240,
															borderWidth     : 1,
															justifyContent  : 'center',
															alignItems      : 'center',
															backgroundColor : '#121212'
														}}
													>
														<View
															style={{
																marginTop      : -20,
																flexDirection  : 'column',
																justifyContent : 'center',
																alignItems     : 'center'
															}}
														>
															<View
																style={{
																	padding         : 4,
																	height          : 60,
																	width           : 60,
																	borderRadius    : 30,
																	justifyContent  : 'center',
																	alignItems      : 'center',
																	backgroundColor : '#252420'
																}}
															>
																<Icon
																	name='ios-images'
																	color='white'
																	type='ionicon'
																	size={35}
																/>
															</View>
															<View
																style={{
																	justifyContent : 'center',
																	alignItems     : 'center',
																	padding        : 8
																}}
															>
																<Text
																	style={{
																		fontWeight : 'bold',
																		fontSize   : 16,
																		textAlign  : 'center',
																		color      : '#B1B1B1'
																	}}
																>
																	Lihat Promo Lainnya Dari Warung Test
																</Text>
															</View>
															<TouchableOpacity
																style={{
																	marginTop       : 15,
																	padding         : 4,
																	borderWidth     : 1,
																	borderRadius    : 40,
																	backgroundColor : '#252420',
																	height          : 40,
																	width           : 80,
																	justifyContent  : 'center',
																	alignItems      : 'center'
																}}
															>
																<Text style={{ color: '#B1B1B1', fontSize: 16 }}>
																	Explore
																</Text>
															</TouchableOpacity>
														</View>
													</View>
												</View>
											</React.Fragment>
										) : null}
									</ScrollView>
								</View>
							</View>
						</View>
						<View style={{ paddingBottom: statusBarHeight + 60 + 16 }} />
					</React.Fragment>
				)}
			</Animated.ScrollView>
			<View
				style={{
					position        : 'absolute',
					top             : 0,
					left            : 0,
					marginTop       : statusBarHeight,
					height          : 60,
					backgroundColor : 'transparent',
					marginBottom    : 10
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
							zIndex            : 10,
							opacity           : 0.9
						}}
					>
						<TouchableOpacity
							onPress={() => navigation.goBack()}
							style={{
								padding         : 5,
								height          : 40,
								width           : 40,
								justifyContent  : 'center',
								alignItems      : 'center',
								marginTop       : 10,
								backgroundColor : 'black',
								borderRadius    : 20
							}}
						>
							<Icon name='md-arrow-round-back' color='white' type='ionicon' size={20} />
						</TouchableOpacity>
						<TouchableOpacity
							activeOpacity={0.8}
							onPress={() => props.navigation.navigate('Search')}
							style={{
								flexDirection : 'column',
								marginTop     : 10,
								padding       : 5,
								width         : width - 10 * 2 - 40 * 2
							}}
						>
							<View style={{ position: 'relative' }}>
								<Animated.Text
									style={{
										color         : 'white',
										opacity       : showTextOpacity,
										marginLeft    : 5,
										fontSize      : 20,
										fontWeight    : 'bold',
										letterSpacing : 0.8,
										position      : 'absolute'
									}}
								>
									Promotion
								</Animated.Text>
								<Animated.Text
									style={{
										color         : 'black',
										opacity       : hideTextOpacity,
										marginLeft    : 5,
										fontSize      : 20,
										fontWeight    : 'bold',
										letterSpacing : 0.8,
										position      : 'absolute'
									}}
								>
									Promotion
								</Animated.Text>
							</View>

							<Animated.Text
								style={{
									color      : 'white',
									opacity    : showTextOpacity,
									marginLeft : 5,
									fontSize   : 14,
									marginTop  : 20
								}}
							>
								4 items
							</Animated.Text>
						</TouchableOpacity>

						<TouchableOpacity
							style={{
								padding         : 5,
								height          : 40,
								width           : 40,
								justifyContent  : 'center',
								alignItems      : 'center',
								marginTop       : 10,
								backgroundColor : 'black',
								borderRadius    : 20
							}}
						>
							<Icon name='md-more' color='white' type='ionicon' size={20} />
						</TouchableOpacity>
					</View>
				</View>
				<View
					style={{ borderBottomColor: 'silver', borderBottomWidth: 1, position: 'absolute', marginTop: 10 }}
				/>
			</View>
		</React.Fragment>
	);
};
