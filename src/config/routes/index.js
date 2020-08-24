import React, { useRef, useEffect, useState } from 'react';
import {
	createStackNavigator,
	TransitionSpecs,
	HeaderStyleInterpolators,
	CardStyleInterpolators
} from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import { Home } from '../../pages/Home/index';
import About from '../../pages/About/index';
import { Buy } from '../../pages/Buy/index';
import { Maps } from '../../pages/Maps/index';
import Cart from '../../pages/Cart/index';
import Hire from '../../pages/Hire/index';
import { createDrawerNavigator } from '@react-navigation/drawer';
import FoodSingle from '../../pages/FoodSingle/food.single';
import { Covid19 } from '../../pages/Covid/index.covid';
import { Inbox } from '../../pages/Inbox/index.inbox';
import {
	View,
	Text,
	Image,
	TouchableOpacity,
	TouchableWithoutFeedback,
	ToastAndroid,
	TouchableHighlight
} from 'react-native';
const Stack = createStackNavigator();
import { useSelector, useDispatch } from 'react-redux';
import Icon from 'react-native-vector-icons/Ionicons';
import { Checkout } from '../../pages/Checkout';
import { ViewWarung } from '../../pages/Warung/View';
import { Food_Warung } from '../../pages/Warung/Food/index';
import { Drink_Warung } from '../../pages/Warung/Drink';
import { Cemilan_Warung } from '../../pages/Warung/Cemilan';
import { DirectMessage } from '../../pages/Direct/List';
import { DirectChat } from '../../pages/Direct/Chat';
import { Courier } from '../../pages/Courier';
import { Login } from '../../pages/Login';
import { Register, RegisterDnB, pinVerification, CreatePassword, AlmostThere } from '../../pages/Register';
import { Welcome } from '../../pages/Welcome';
import AsyncStorage from '@react-native-community/async-storage';
import { SplashScreen } from '../../pages/Splash';
import { Account, ViewProfil, UserSetttings } from '../../pages/Account';
import { BukaWarung } from '../../pages/Warung/Create';
import {
	CreateWarung,
	UploadFotoWarung,
	SelectWarungLocation,
	AddDish,
	DishListing
} from '../../pages/Warung/MyWarung';
import { Search } from '../../pages/Search';
import { ViewImage } from '../../pages/View/Image';
import ViewPost from '../../pages/View/Post';
import { Promotion } from '../../pages/Promotion';
import { Wishlist } from '../../pages/Wishlist';
import { useDarkMode } from 'react-native-dark-mode';
import Laundry from '../../pages/Laundry/List';
import { CartNew } from '../../pages/Misc/cart_renewed';


const Router = React.memo((props) => {
	const count = useSelector((state) => state.CART_COUNT);
	let view = useSelector((state) => state.CART_ITEMS);
	let api_token = useSelector((state) => state.token);
	const p = view.warung_name;

	const dispatch = useDispatch();
	const ref = useRef(null);

	const show_mail_modal = () => {
		dispatch({ type: 'modal_new_mail', status: true });
	};
	const forFade = ({ current, closing }) => ({
		cardStyle: {
			opacity: current.progress
		}
	});
	let [
		token,
		setToken
	] = useState(null);
	let [
		isLoading,
		setIsLoading
	] = useState(true);
	let [
		oc,
		setOc
	] = useState(0);

	useEffect(() => {
		AsyncStorage.getItem('LOGIN_TOKEN', (err, res) => res)
			.then((res) => {
				setToken(res);
				setIsLoading(false);
			})
			.catch((err) => {
				console.log(err);
			});
		AsyncStorage.getItem('order_count', (err, res) => res)
			.then((res) => {
				setOc(res);
			})
			.catch((err) => {
				console.log(err);
			});
	});
	const logoutHandler = async () => {
		console.log('logged out');
		dispatch({ type: 'LOGOUT' });
		await AsyncStorage.removeItem('LOGIN_TOKEN');
	};
	const isDarkMode = useDarkMode();
	return (
		<NavigationContainer ref={ref}>
			<Stack.Navigator
				screenOptions={{
					cardStyleInterpolator: CardStyleInterpolators.forScaleFromCenterAndroid
				}}
			>
				{isLoading ? (
					<Stack.Screen
						name='SplashScreen'
						component={SplashScreen}
						options={{
							headerShown: false
						}}
					/>
				) : token !== null || api_token.token !== null ? (
					<React.Fragment>
						<Stack.Screen
							name='Home'
							component={Home}
							options={{
								headerShown: false
							}}
						/>
						<Stack.Screen
							name='Courier'
							component={Courier}
							options={{
								headerShown: false
							}}
						/>
						<Stack.Screen
							name='ViewImage'
							component={ViewImage}
							options={{
								headerShown: true
							}}
						/>
						<Stack.Screen
							name='ViewPost'
							component={ViewPost}
							options={{
								headerShown: false,
								headerTitle: () => {
									return (
										<TouchableOpacity
											activeOpacity={0.5}
											onPress={() => ref.current.navigate('View_Warung')}
											style={{
												flexDirection: 'row',
												alignItems: 'center',
												justifyContent: 'center'
											}}
										>
											<Image
												style={{
													height: 33,
													width: 33,
													borderRadius: 5,
													alignSelf: 'stretch'
												}}
												source={require('../../../assets/banner/q3.png')}
											/>
											<Text
												numberOfLines={1}
												ellipsizeMode={'tail'}
												style={{ paddingLeft: 10, fontSize: 17.5 }}
											>
												{p}
											</Text>
										</TouchableOpacity>
									);
								},
								headerRight: () => {
									return (
										<View style={{ padding: 8 }}>
											<TouchableOpacity
												disabled={count > 0 ? false : true}
												onPress={() => ref.current.navigate('Cart')}
												style={{
													marginRight: 6,
													borderRadius: 30 / 2,
													backgroundColor: 'white',
													height: 30,
													width: 30,
													justifyContent: 'center',
													alignItems: 'center',
													flexDirection: 'row'
												}}
											>
												<Text style={{ textAlign: 'center', fontSize: 15, marginRight: 2 }}>
													{count}
												</Text>
												<Icon name='md-cart' color='blue' />
											</TouchableOpacity>
										</View>
									);
								}
							}}
						/>
						<Stack.Screen
							name='Search'
							component={Search}
							options={{
								headerShown: false
							}}
						/>
						<Stack.Screen
							name='BukaWarung'
							component={BukaWarung}
							options={{
								headerShown: true,
								headerTitle: 'WarungKu'
							}}
						/>
						<Stack.Screen
							name='Warung_Create'
							component={CreateWarung}
							options={{
								headerShown: true,
								headerTitle: 'Daftar Warung'
							}}
						/>
						<Stack.Screen
							name='UploadFotoWarung'
							component={UploadFotoWarung}
							options={{
								headerShown: true,
								headerTitle: 'Daftar Warung'
							}}
						/>
						<Stack.Screen
							name='SelectWarungLocation'
							component={SelectWarungLocation}
							options={{
								headerShown: true,
								headerTitle: 'Lokasi Warung'
							}}
						/>
						<Stack.Screen
							name='DishListing'
							component={DishListing}
							options={{
								headerShown: true,
								headerTitle: 'Dish | Listing'
							}}
						/>
						<Stack.Screen
							name='AddDish'
							component={AddDish}
							options={{
								headerShown: true,
								headerTitle: 'Dish | Add'
							}}
						/>
						<Stack.Screen
							name='Account'
							component={Account}
							options={{
								headerStyle: {
									backgroundColor: isDarkMode ? '#18191C' : 'white'
								},
								headerShown: true,
								headerTitle: 'My Account',
								headerTitleStyle: {
									color: isDarkMode ? 'white' : 'black'
								},
								headerLeft: () => {
									return (
										<View style={{ padding: 6 }}>
											<TouchableHighlight
												underlayColor='#424D51'
												onPress={() => ref.current.goBack()}
												style={{
													padding: 5,
													height: 45,
													width: 45,
													borderRadius: 30,
													justifyContent: 'center',
													alignItems: 'center'
												}}
											>
												<Icon
													name='md-arrow-back'
													size={25}
													color={isDarkMode ? 'white' : 'black'}
												/>
											</TouchableHighlight>
										</View>
									);
								},
								headerRight: () => {
									return (
										<View style={{ justifyContent: 'center', flexDirection: 'row' }}>
											<TouchableOpacity
												activeOpacity={0.5}
												onPress={() => ref.current.navigate('UserSettings')}
												style={{
													marginRight: 6,
													borderRadius: 30 / 2,
													height: 30,
													width: 30,
													justifyContent: 'center',
													alignItems: 'center',
													flexDirection: 'row'
												}}
											>
												<Icon
													name='md-settings'
													color={isDarkMode ? 'white' : 'black'}
													size={25}
												/>
											</TouchableOpacity>
										</View>
									);
								}
							}}
						/>
						<Stack.Screen
							name='UserSettings'
							component={UserSetttings}
							options={{
								headerStyle: {
									backgroundColor: '#18191C'
								},
								headerShown: true,
								headerTitle: 'User Settings',
								headerTitleStyle: {
									color: 'white'
								},
								headerLeft: () => {
									return (
										<View style={{ padding: 6 }}>
											<TouchableHighlight
												underlayColor='#424D51'
												onPress={() => ref.current.goBack()}
												style={{
													padding: 5,
													height: 45,
													width: 45,
													borderRadius: 30,
													justifyContent: 'center',
													alignItems: 'center'
												}}
											>
												<Icon
													name='md-arrow-back'
													size={25}
													color='white'
												/>
											</TouchableHighlight>
										</View>
									);
								},
								headerRight: () => {
									return (
										<View style={{ justifyContent: 'center', flexDirection: 'row' }}>
											<TouchableOpacity
												onLongPress={() =>
													ToastAndroid.showWithGravity(
														'Logout',
														ToastAndroid.SHORT,
														ToastAndroid.BOTTOM,
														25,
														50
													)}
												onPress={() => logoutHandler()}
												style={{
													marginRight: 6,
													borderRadius: 30 / 2,
													height: 30,
													width: 30,
													justifyContent: 'center',
													alignItems: 'center',
													flexDirection: 'row'
												}}
											>
												<Icon name='md-log-out' size={25} color='white' />
											</TouchableOpacity>
											<TouchableOpacity
												onLongPress={() =>
													ToastAndroid.showWithGravity(
														'More',
														ToastAndroid.SHORT,
														ToastAndroid.BOTTOM,
														25,
														50
													)}
												style={{
													marginRight: 6,
													borderRadius: 30 / 2,
													height: 30,
													width: 30,
													justifyContent: 'center',
													alignItems: 'center',
													flexDirection: 'row'
												}}
											>
												<Icon name='md-more' size={25} color='white' />
											</TouchableOpacity>
										</View>
									);
								}
							}}
						/>
						<Stack.Screen
							name='Direct'
							component={DirectMessage}
							options={{
								headerShown: true,
								headerTitle: 'Direct Chat'
							}}
						/>
						<Stack.Screen
							name='CartNew'
							component={CartNew}
							options={{
								headerShown: false,
								headerTitle: 'Cart New'
							}}
						/>
						<Stack.Screen
							name='ViewProfil'
							component={ViewProfil}
							options={{
								headerShown: true,
								headerTitle: 'Mada Nugraha'
							}}
						/>
						<Stack.Screen
							name='DirectChat'
							component={DirectChat}
							options={{
								headerShown: true,
								headerTitle: () => {
									return (
										<TouchableOpacity
											activeOpacity={0.5}
											onPress={() => ref.current.navigate('View_Warung')}
											style={{
												flexDirection: 'row',
												alignItems: 'center',
												justifyContent: 'center'
											}}
										>
											<Image
												style={{
													height: 33,
													width: 33,
													borderRadius: 33 / 2,
													alignSelf: 'stretch'
												}}
												source={require('../../../assets/banner/q3.png')}
											/>
											<Text
												numberOfLines={1}
												ellipsizeMode={'tail'}
												style={{ paddingLeft: 10, fontSize: 17.5, textTransform: 'capitalize' }}
											>
												Si Udin
											</Text>
										</TouchableOpacity>
									);
								},
								headerRight: () => {
									return (
										<View style={{ justifyContent: 'center', flexDirection: 'row' }}>
											<TouchableOpacity
												style={{
													marginRight: 6,
													borderRadius: 30 / 2,
													height: 30,
													width: 30,
													justifyContent: 'center',
													alignItems: 'center',
													flexDirection: 'row'
												}}
											>
												<Icon name='md-more' />
											</TouchableOpacity>
										</View>
									);
								}
							}}
						/>
						<Stack.Screen
							name='About'
							component={About}
							options={{
								headerShown: false
							}}
						/>
						{count !== 0 ? (
							<React.Fragment>
								<Stack.Screen
									name='Checkout'
									component={Checkout}
									options={{
										headerShown: true,
										cardShadowEnabled: true
									}}
								/>
								<Stack.Screen
									name='Cart'
									component={Cart}
									options={{
										headerStyle: {
											backgroundColor: isDarkMode ? '#18191C' : 'white'
										},
										headerTitleStyle: {
											color: isDarkMode ? 'white' : 'black'
										},
										headerShown: true,
										headerTitle: 'CART',
										headerLeft: () => {
											return (
												<View style={{ marginLeft: 20 }}>
													<TouchableWithoutFeedback
														style={{
															justifyContent: 'center',
															alignItems: 'center'
														}}
														onPress={() => ref.current.goBack()}
													>
														<Icon
															name='md-close'
															color={isDarkMode ? 'white' : 'black'}
															size={35}
														/>
													</TouchableWithoutFeedback>
												</View>
											);
										}
									}}
								/>
							</React.Fragment>
						) : null}

						<Stack.Screen
							name='Buy'
							component={Buy}
							options={{
								headerStyle: {
									backgroundColor: isDarkMode ? '#18191C' : 'white'
								},
								headerShown: true,
								headerTitle: 'Dish / Foods',
								headerTitleStyle: {
									color: isDarkMode ? 'white' : 'black'
								},
								headerLeft: () => {
									return (
										<View style={{ padding: 6 }}>
											<TouchableHighlight
												underlayColor='#424D51'
												onPress={() => ref.current.goBack()}
												style={{
													padding: 5,
													height: 45,
													width: 45,
													borderRadius: 30,
													justifyContent: 'center',
													alignItems: 'center'
												}}
											>
												<Icon
													name='md-arrow-back'
													size={25}
													color={isDarkMode ? 'white' : 'black'}
												/>
											</TouchableHighlight>
										</View>
									);
								},
								headerRight: () => {
									return (
										<View style={{ justifyContent: 'center', flexDirection: 'row' }}>
											<TouchableOpacity
												onPress={() => ref.current.navigate('Search')}
												activeOpacity={0.4}
												onLongPress={() =>
													ToastAndroid.showWithGravity(
														'Search',
														ToastAndroid.SHORT,
														ToastAndroid.BOTTOM,
														25,
														50
													)}
												style={{
													marginRight: 6,
													borderRadius: 40 / 2,
													height: 40,
													width: 40,
													justifyContent: 'center',
													alignItems: 'center',
													flexDirection: 'row'
												}}
											>
												<Icon
													name='md-search'
													size={25}
													color={isDarkMode ? 'white' : 'black'}
												/>
											</TouchableOpacity>
											<TouchableOpacity
												disabled={count > 0 ? false : true}
												activeOpacity={0.4}
												onPress={() => ref.current.navigate('Cart')}
												onLongPress={() =>
													ToastAndroid.showWithGravity(
														'Keranjang',
														ToastAndroid.SHORT,
														ToastAndroid.BOTTOM,
														25,
														50
													)}
												style={{
													marginRight: 6,
													borderRadius: 40 / 2,
													height: 40,
													width: 40,
													justifyContent: 'center',
													alignItems: 'center',
													flexDirection: 'row'
												}}
											>
												<Text style={{ color: isDarkMode ? 'white' : 'black' }}>{count}</Text>
												<Icon
													name='md-cart'
													size={25}
													color={isDarkMode ? 'white' : 'black'}
												/>
											</TouchableOpacity>
										</View>
									);
								}
							}}
						/>
						<Stack.Screen
							name='Laundry'
							component={Laundry}
							options={{
								headerStyle: {
									backgroundColor: isDarkMode ? '#18191C' : 'white'
								},
								headerShown: true,
								headerTitle: 'Laundry',
								headerTitleStyle: {
									color: isDarkMode ? 'white' : 'black'
								},
								headerLeft: () => {
									return (
										<View style={{ padding: 6 }}>
											<TouchableHighlight
												underlayColor='#424D51'
												onPress={() => ref.current.goBack()}
												style={{
													padding: 5,
													height: 45,
													width: 45,
													borderRadius: 30,
													justifyContent: 'center',
													alignItems: 'center'
												}}
											>
												<Icon
													name='md-arrow-back'
													size={25}
													color={isDarkMode ? 'white' : 'black'}
												/>
											</TouchableHighlight>
										</View>
									);
								},
								headerRight: () => {
									return (
										<View style={{ justifyContent: 'center', flexDirection: 'row' }}>
											<TouchableOpacity
												onPress={() => ref.current.navigate('Search')}
												activeOpacity={0.4}
												onLongPress={() =>
													ToastAndroid.showWithGravity(
														'Search',
														ToastAndroid.SHORT,
														ToastAndroid.BOTTOM,
														25,
														50
													)}
												style={{
													marginRight: 6,
													borderRadius: 40 / 2,
													height: 40,
													width: 40,
													justifyContent: 'center',
													alignItems: 'center',
													flexDirection: 'row'
												}}
											>
												<Icon
													name='ios-search'
													size={25}
													color={isDarkMode ? 'white' : 'black'}
												/>
											</TouchableOpacity>
											<TouchableOpacity
												activeOpacity={0.4}
												onPress={() => ref.current.navigate('Cart')}
												onLongPress={() =>
													ToastAndroid.showWithGravity(
														'More',
														ToastAndroid.SHORT,
														ToastAndroid.BOTTOM,
														25,
														50
													)}
												style={{
													marginRight: 6,
													borderRadius: 40 / 2,
													height: 40,
													width: 40,
													justifyContent: 'center',
													alignItems: 'center',
													flexDirection: 'row'
												}}
											>
												<Icon
													name='md-more'
													size={25}
													color={isDarkMode ? 'white' : 'black'}
												/>
											</TouchableOpacity>
										</View>
									);
								}
							}}
						/>
						<Stack.Screen
							name='Maps'
							component={Maps}
							options={{
								headerShown: false
							}}
						/>
						<Stack.Screen
							name='Hire'
							component={Hire}
							options={{
								headerShown: false
							}}
						/>
						<Stack.Screen
							name='View_Warung'
							component={ViewWarung}
							options={{
								headerShown: false
							}}
						/>
						<Stack.Screen
							name='Food_Warung'
							component={Food_Warung}
							options={{
								headerShown: true,
								headerTitle: () => {
									return (
										<TouchableOpacity
											activeOpacity={0.5}
											onPress={() => ref.current.navigate('View_Warung')}
											style={{
												flexDirection: 'row',
												alignItems: 'center',
												justifyContent: 'center'
											}}
										>
											<Image
												style={{
													height: 33,
													width: 33,
													borderRadius: 5,
													alignSelf: 'stretch'
												}}
												source={require('../../../assets/banner/q3.png')}
											/>
											<Text
												numberOfLines={1}
												ellipsizeMode={'tail'}
												style={{ paddingLeft: 10, fontSize: 17.5 }}
											>
												{p}
											</Text>
										</TouchableOpacity>
									);
								},
								headerRight: () => {
									return (
										<View style={{ padding: 8, justifyContent: 'center', flexDirection: 'row' }}>
											<TouchableOpacity
												style={{
													marginRight: 6,
													borderRadius: 30 / 2,
													backgroundColor: 'white',
													height: 30,
													width: 30,
													justifyContent: 'center',
													alignItems: 'center'
												}}
											>
												<Icon name='md-search' color='blue' />
											</TouchableOpacity>
											<TouchableOpacity
												disabled={count > 0 ? false : true}
												onPress={() => ref.current.navigate('Cart')}
												style={{
													marginRight: 6,
													borderRadius: 30 / 2,
													backgroundColor: 'white',
													height: 30,
													width: 30,
													justifyContent: 'center',
													alignItems: 'center',
													flexDirection: 'row'
												}}
											>
												<Text style={{ textAlign: 'center', fontSize: 15, marginRight: 2 }}>
													{count}
												</Text>
												<Icon name='md-cart' color='blue' />
											</TouchableOpacity>
										</View>
									);
								}
							}}
						/>
						<Stack.Screen
							name='Drink_Warung'
							component={Drink_Warung}
							options={{
								headerShown: true,
								headerTitle: () => {
									return (
										<TouchableOpacity
											activeOpacity={0.5}
											onPress={() => ref.current.navigate('View_Warung')}
											style={{
												flexDirection: 'row',
												alignItems: 'center',
												justifyContent: 'center'
											}}
										>
											<Image
												style={{
													height: 33,
													width: 33,
													borderRadius: 5,
													alignSelf: 'stretch'
												}}
												source={require('../../../assets/banner/q3.png')}
											/>
											<Text
												numberOfLines={1}
												ellipsizeMode={'tail'}
												style={{ paddingLeft: 10, fontSize: 17.5 }}
											>
												{p}
											</Text>
										</TouchableOpacity>
									);
								},
								headerRight: () => {
									return (
										<View style={{ padding: 8, justifyContent: 'center', flexDirection: 'row' }}>
											<TouchableOpacity
												style={{
													marginRight: 6,
													borderRadius: 30 / 2,
													backgroundColor: 'white',
													height: 30,
													width: 30,
													justifyContent: 'center',
													alignItems: 'center'
												}}
											>
												<Icon name='ios-search' color='blue' />
											</TouchableOpacity>
											<TouchableOpacity
												disabled={count > 0 ? false : true}
												onPress={() => ref.current.navigate('Cart')}
												style={{
													marginRight: 6,
													borderRadius: 30 / 2,
													backgroundColor: 'white',
													height: 30,
													width: 30,
													justifyContent: 'center',
													alignItems: 'center',
													flexDirection: 'row'
												}}
											>
												<Text style={{ textAlign: 'center', fontSize: 15, marginRight: 2 }}>
													{count}
												</Text>
												<Icon name='ios-cart' color='blue' />
											</TouchableOpacity>
										</View>
									);
								}
							}}
						/>
						<Stack.Screen
							name='Cemilan_Warung'
							component={Cemilan_Warung}
							options={{
								headerShown: true,
								headerTitle: () => {
									return (
										<TouchableOpacity
											activeOpacity={0.5}
											onPress={() => ref.current.navigate('View_Warung')}
											style={{
												flexDirection: 'row',
												alignItems: 'center',
												justifyContent: 'center'
											}}
										>
											<Image
												style={{
													height: 33,
													width: 33,
													borderRadius: 5,
													alignSelf: 'stretch'
												}}
												source={require('../../../assets/banner/q3.png')}
											/>
											<Text
												numberOfLines={1}
												ellipsizeMode={'tail'}
												style={{ paddingLeft: 10, fontSize: 17.5 }}
											>
												{p}
											</Text>
										</TouchableOpacity>
									);
								},
								headerRight: () => {
									return (
										<View style={{ padding: 8, justifyContent: 'center', flexDirection: 'row' }}>
											<TouchableOpacity
												style={{
													marginRight: 6,
													borderRadius: 30 / 2,
													backgroundColor: 'white',
													height: 30,
													width: 30,
													justifyContent: 'center',
													alignItems: 'center'
												}}
											>
												<Icon name='ios-search' color='blue' />
											</TouchableOpacity>
											<TouchableOpacity
												disabled={count > 0 ? false : true}
												onPress={() => ref.current.navigate('Cart')}
												style={{
													marginRight: 6,
													borderRadius: 30 / 2,
													backgroundColor: 'white',
													height: 30,
													width: 30,
													justifyContent: 'center',
													alignItems: 'center',
													flexDirection: 'row'
												}}
											>
												<Text style={{ textAlign: 'center', fontSize: 15, marginRight: 2 }}>
													{count}
												</Text>
												<Icon name='ios-cart' color='blue' />
											</TouchableOpacity>
										</View>
									);
								}
							}}
						/>
						<Stack.Screen
							name='Covid'
							component={Covid19}
							options={{
								headerShown: false
							}}
						/>
						<Stack.Screen
							name='Promotion'
							component={Promotion}
							options={{
								headerShown: false
							}}
						/>
						<Stack.Screen
							name='Wishlist'
							component={Wishlist}
							options={{
								headerShown: false
							}}
						/>
						<Stack.Screen
							name='Inbox'
							component={Inbox}
							options={{
								headerShown: true,
								headerRight: () => {
									return (
										<TouchableOpacity
											style={{
												padding: 8,
												borderRadius: 30 / 2,
												backgroundColor: 'white',
												height: 30,
												width: 30,
												justifyContent: 'center',
												alignItems: 'center'
											}}
											onPress={() => show_mail_modal()}
										>
											<Icon name='md-more' color='blue' />
										</TouchableOpacity>
									);
								}
							}}
						/>
					</React.Fragment>
				) : (
							<React.Fragment>
								<Stack.Screen
									name='Welcome'
									component={Welcome}
									options={{
										headerShown: false
									}}
								/>
								<Stack.Screen
									name='Login'
									component={Login}
									options={{
										headerShown: false
									}}
									screenOptions={{
										cardStyleInterpolator: forFade
									}}
								/>
								<Stack.Screen
									name='Register'
									component={Register}
									options={{
										headerShown: false
									}}
									screenOptions={{
										cardStyleInterpolator: forFade
									}}
								/>
								<Stack.Screen
									name='CreatePassword'
									component={CreatePassword}
									options={{
										headerShown: false
									}}
									screenOptions={{
										cardStyleInterpolator: forFade
									}}
								/>
								<Stack.Screen
									name='AlmostThere'
									component={AlmostThere}
									options={{
										headerShown: false
									}}
									screenOptions={{
										cardStyleInterpolator: forFade
									}}
								/>
								<Stack.Screen
									name='RegisterDnB'
									component={RegisterDnB}
									options={{
										headerShown: false
									}}
									screenOptions={{
										cardStyleInterpolator: forFade
									}}
								/>
								<Stack.Screen
									name='pin'
									component={pinVerification}
									options={{
										headerShown: false
									}}
									screenOptions={{
										cardStyleInterpolator: forFade
									}}
								/>
							</React.Fragment>
						)}
			</Stack.Navigator>
		</NavigationContainer>
	);
});

export default Router;
