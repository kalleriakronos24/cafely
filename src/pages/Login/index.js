import React, { useMemo, useState, useContext, useReducer } from 'react';
import { View, Text, StatusBar, TextInput, Dimensions, TouchableHighlight, TouchableOpacity } from 'react-native';
import { Icon } from 'react-native-elements';
import AsyncStorage from '@react-native-community/async-storage';
import { useDispatch } from 'react-redux';
export const Login = ({ navigation }) => {
	const statusBarHeight = StatusBar.currentHeight;
	const width = Dimensions.get('window').width;

	let [
		email,
		setEmail
	] = useState('');
	let [
		password,
		setPassword
	] = useState('');
	const userData = {
		fullname     : 'madkon',
		email        : 'pepega@gmail.com',
		password     : '1234567',
		blackTheme   : false,
		phoneNumber  : '0812345678',
		verified     : true,
		member       : true,
		isSignedIn   : false,
		lastLoggedIn : new Date().toISOString()
	};
	let token = new Date().toISOString();
	let [
		err,
		setErr
	] = useState(false);
	let [
		errMsg,
		setErrMsg
	] = useState(false);
	const dispatch = useDispatch();
	const loginSubmit = async () => {
		const json = JSON.stringify(userData);
		if (email === userData.email && password === userData.password) {
			await AsyncStorage.setItem('USER_DATA', json, () => {
				setErr(false);
				setErrMsg('');
			});
			dispatch({ type: 'REFRESH_TOKEN', token: token });
			await AsyncStorage.setItem('LOGIN_TOKEN', token);
		}
		else {
			setErr(true);
			setErrMsg('User tidak ditemukan.');
		}
	};
	return (
		<React.Fragment>
			<StatusBar translucent barStyle='light-content' backgroundColor='rgba(0,0,0,0.251)' animated />
			<View style={{ flex: 1, paddingTop: statusBarHeight, backgroundColor: 'white' }}>
				<View style={{ padding: 6 }}>
					<TouchableHighlight
						underlayColor='#ABABAB'
						onPress={() => navigation.goBack()}
						style={{
							height         : 40,
							width          : 40,
							borderRadius   : 20,
							justifyContent : 'center',
							alignItems     : 'center'
						}}
					>
						<Icon name='md-arrow-back' type='ionicon' size={30} />
					</TouchableHighlight>
				</View>
				<View style={{ flex: 1, paddingTop: '30%' }}>
					<View
						style={{
							backgroundColor : 'white',
							justifyContent  : 'center',
							alignItems      : 'center'
						}}
					>
						<View style={{ padding: 16 }}>
							<View style={{ marginTop: -70, justifyContent: 'center', alignItems: 'center' }}>
								<Text style={{ fontSize: 30, fontWeight: 'bold' }}>Cafely</Text>
							</View>
							<View style={{ padding: 6, width: width - 35 * 2, marginTop: 30, flexDirection: 'column' }}>
								<View
									style={{
										padding       : 4,
										borderColor   : 'blue',
										borderWidth   : 1,
										height        : 50,
										borderRadius  : 5,
										flexDirection : 'row',
										alignItems    : 'center'
									}}
								>
									<TextInput
										onChangeText={(v) => setEmail(v)}
										placeholder='Email Address'
										style={{ flex: 1 }}
									/>
								</View>
							</View>
							<View style={{ padding: 6, width: width - 35 * 2, flexDirection: 'column' }}>
								<View
									style={{
										padding       : 4,
										borderColor   : 'blue',
										borderWidth   : 1,
										height        : 50,
										borderRadius  : 5,
										flexDirection : 'row',
										alignItems    : 'center'
									}}
								>
									<TextInput
										placeholder='Password'
										style={{ flex: 1 }}
										secureTextEntry={true}
										onChangeText={(v) => setPassword(v)}
									/>
								</View>
							</View>
							{err ? <Text>{errMsg}</Text> : null}
							<View style={{ flexDirection: 'row', marginTop: 10, padding: 6 }}>
								<View style={{ flex: 1 }}>
									<View
										style={{
											padding        : 4,
											width          : 130,
											borderRadius   : 10,
											justifyContent : 'center',
											alignItems     : 'center'
										}}
									>
										<Text style={{ fontSize: 15, fontWeight: '700' }}>Forgot Password ?</Text>
									</View>
								</View>
								<TouchableOpacity
									activeOpacity={0.5}
									onPress={() => loginSubmit()}
									style={{ justifyContent: 'center', alignItems: 'center' }}
								>
									<View
										style={{
											borderColor    : 'blue',
											borderWidth    : 1,
											height         : 43,
											width          : 140,
											borderRadius   : 5,
											alignItems     : 'center',
											justifyContent : 'center'
										}}
									>
										<Text style={{ fontSize: 18, fontWeight: '500' }}>Login</Text>
									</View>
								</TouchableOpacity>
							</View>
						</View>
					</View>
					<View style={{ flexDirection: 'row', width: width, paddingTop: 15 }}>
						<View style={{ justifyContent: 'center', alignItems: 'center' }}>
							<View style={{ borderBottomWidth: 1, width: width / 2 - 20 }} />
						</View>
						<View style={{ paddingHorizontal: 20, justifyContent: 'center', alignItems: 'center' }}>
							<Text style={{ fontSize: 17, letterSpacing: 1 }}>or</Text>
						</View>
						<View style={{ justifyContent: 'center', alignItems: 'center' }}>
							<View style={{ borderBottomWidth: 1, width: width / 2 - 20 }} />
						</View>
					</View>
					<View style={{ flex: 1 }}>
						<View style={{ padding: 16 }}>
							<View style={{ padding: 6, flexDirection: 'column' }}>
								<View
									style={{
										padding        : 4,
										borderColor    : 'blue',
										borderWidth    : 1,
										height         : 37,
										borderRadius   : 5,
										flexDirection  : 'row',
										alignItems     : 'center',
										justifyContent : 'center'
									}}
								>
									<Text>Log In with Google</Text>
								</View>
							</View>
							<View style={{ padding: 6, flexDirection: 'column' }}>
								<View
									style={{
										padding        : 4,
										borderColor    : 'blue',
										borderWidth    : 1,
										height         : 37,
										borderRadius   : 5,
										flexDirection  : 'row',
										alignItems     : 'center',
										justifyContent : 'center'
									}}
								>
									<Text>Log In with Facebook</Text>
								</View>
							</View>
						</View>
					</View>
				</View>
				{/* <View
					style={{
						justifyContent : 'flex-end',
						alignItems     : 'center',
						padding        : 16,
						position       : 'absolute',
						left           : width / 2 - 250 / 2,
						bottom         : 0
					}}
				>
					<View
						style={{
							flexDirection   : 'row',
							justifyContent  : 'center',
							alignItems      : 'center',
							backgroundColor : 'yellow',
							width           : 250
						}}
					>
						<Text style={{ fontSize: 17, letterSpacing: 0.7 }}>No Account ? Get Started</Text>
						<TouchableOpacity onPress={() => navigation.navigate('Register')}>
							<Text style={{ marginLeft: 5, color: 'blue', fontSize: 15 }}>here.</Text>
						</TouchableOpacity>
					</View>
				</View> */}
			</View>
		</React.Fragment>
	);
};
