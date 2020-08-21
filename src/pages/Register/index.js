import React, { memo, useState, useEffect, useRef } from 'react';
import {
	Animated,
	View,
	Text,
	StatusBar,
	TextInput,
	Dimensions,
	TouchableHighlight,
	TouchableOpacity
} from 'react-native';
import { Icon } from 'react-native-elements';
import DateTimePicker from '@react-native-community/datetimepicker';
import SmoothPinCodeInput from 'react-native-smooth-pincode-input';

export const Register = ({ navigation }) => {
	const statusBarHeight = StatusBar.currentHeight;
	const width = Dimensions.get('window').width;
	let [
		email,
		setEmail
	] = useState('');
	let [
		emailCheck,
		setEmailCheck
	] = useState(false);
	let [
		namaCheck,
		setNamaCheck
	] = useState(false);
	let [
		alamatCheck,
		setAlamatCheck
	] = useState(false);
	let [
		nama,
		setNama
	] = useState('');
	let [
		alamat,
		setAlamat
	] = useState('');
	let [
		emailError,
		setEmailError
	] = useState(false);
	let [
		emailErrorMessage,
		setEmailErrorMessage
	] = useState('');
	let [
		namaErrorMessage,
		setNamaErrMsg
	] = useState('');
	let [
		alamatErrMsg,
		setAlamatErrMsg
	] = useState('');
	const emailValidation = (email) => {
		let reg = /^\w+([\,.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
		if (reg.test(email) === false) {
			setEmailError(true);
			setEmailErrorMessage('Email harus berisi tanda @');
			setEmailCheck(false);
		}
		else {
			setEmail(email);
			setEmailCheck(true);
			setEmailError(false);
		}
	};
	const nameValidation = (name) => {
		if (name === '') {
			setNamaErrMsg('Nama tidak boleh kosong.');
			setNamaCheck(false);
		}
		else {
			setNamaCheck(true);
		}
	};
	const alamatValidation = (alamat) => {
		if (alamat === '') {
			setAlamatErrMsg('Alamat tidak boleh kosong.');
			setAlamatCheck(false);
		}
		else {
			setAlamatCheck(true);
		}
	};
	return (
		<React.Fragment>
			<StatusBar translucent barStyle='light-content' backgroundColor='rgba(0,0,0,0.251)' animated />
			<View style={{ backgroundColor: 'white', paddingTop: statusBarHeight }}>
				<View style={{ padding: 6, justifyContent: 'flex-start', alignItems: 'flex-start' }}>
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
			</View>
			<View
				style={{
					flex            : 1,
					backgroundColor : 'white',
					paddingTop      : statusBarHeight,
					justifyContent  : 'center',
					alignItems      : 'center'
				}}
			>
				<View style={{ padding: 16 }}>
					<View style={{ marginTop: -70, justifyContent: 'center', alignItems: 'center' }}>
						<Text style={{ fontSize: 30, fontWeight: 'bold' }}>Buat Akun</Text>
					</View>
					<View style={{ padding: 6, width: width - 35 * 2, marginTop: 30, flexDirection: 'column' }}>
						<View style={{ marginBottom: 6 }}>
							<Text style={{ fontSize: 22, fontWeight: '600' }}>Alamat Email</Text>
						</View>
						<View
							style={{
								padding        : 4,
								borderColor    : 'blue',
								borderWidth    : 1,
								height         : 50,
								borderRadius   : 5,
								flexDirection  : 'row',
								alignItems     : 'center',
								justifyContent : 'space-between'
							}}
						>
							<TextInput
								value={email}
								keyboardType='email-address'
								placeholder='e.g test@gmail.com'
								style={{ flex: 1 }}
								onChangeText={(v) => setEmail(v)}
								onEndEditing={() => emailValidation(email)}
							/>
							{emailCheck ? (
								<View style={{ padding: 4, justifyContent: 'center', alignItems: 'center' }}>
									<Icon name='ios-checkmark-circle' type='ionicon' />
								</View>
							) : null}
						</View>
					</View>
					{emailError ? <Text style={{ color: 'red', padding: 4 }}>{emailErrorMessage}</Text> : null}
					<View
						style={{
							padding       : 6,
							width         : width - 35 * 2,
							flexDirection : 'column'
						}}
					>
						<View style={{ marginBottom: 6 }}>
							<Text style={{ fontSize: 22, fontWeight: '600' }}>Nama Lengkap</Text>
						</View>
						<View
							style={{
								padding        : 4,
								borderColor    : 'blue',
								borderWidth    : 1,
								height         : 50,
								borderRadius   : 5,
								flexDirection  : 'row',
								alignItems     : 'center',
								justifyContent : 'space-between'
							}}
						>
							<TextInput
								value={nama}
								onChangeText={(v) => setNama(v)}
								placeholder='Srikaya Waraswati'
								style={{ flex: 1 }}
								textContentType='password'
								onEndEditing={() => nameValidation(nama)}
							/>
							{nama !== '' ? (
								<View style={{ padding: 4, justifyContent: 'center', alignItems: 'center' }}>
									<Icon name='ios-checkmark-circle' type='ionicon' />
								</View>
							) : null}
						</View>
					</View>
					{!namaCheck ? <Text style={{ color: 'red', padding: 4 }}>{namaErrorMessage}</Text> : null}
					<View style={{ padding: 6, width: width - 35 * 2, flexDirection: 'column' }}>
						<View style={{ marginBottom: 6 }}>
							<Text style={{ fontSize: 22, fontWeight: '600' }}>Alamat Lengkap</Text>
						</View>
						<View
							style={{
								padding        : 4,
								borderColor    : 'blue',
								borderWidth    : 1,
								height         : 70,
								borderRadius   : 5,
								flexDirection  : 'row',
								justifyContent : 'space-between'
							}}
						>
							<TextInput
								value={alamat}
								onChangeText={(v) => setAlamat(v)}
								multiline={true}
								placeholder='Jalan santi murni blok d rt 14 no 510 sungai kapih sambutan'
								style={{ flex: 1, textAlign: 'justify' }}
								textContentType='password'
								onEndEditing={() => alamatValidation(alamat)}
							/>
							{alamat !== '' ? (
								<View style={{ padding: 4, justifyContent: 'center', alignItems: 'center' }}>
									<Icon name='ios-checkmark-circle' type='ionicon' />
								</View>
							) : null}
						</View>
					</View>

					<TouchableOpacity
						onPress={() => navigation.navigate('CreatePassword')}
						style={{ justifyContent: 'center', alignItems: 'center' }}
						disabled={email === '' || nama === '' || alamat === '' ? true : false}
					>
						<View
							style={{
								marginTop      : 15,
								padding        : 6,
								borderColor    : email === '' || nama === '' || alamat === '' ? 'red' : 'blue',
								borderWidth    : 1,
								height         : 43,
								width          : 140,
								borderRadius   : 25,
								alignItems     : 'center',
								justifyContent : 'center'
							}}
						>
							<Text style={{ fontSize: 18, fontWeight: '500' }}>Next</Text>
						</View>
					</TouchableOpacity>
				</View>
			</View>
		</React.Fragment>
	);
};
export const CreatePassword = ({ navigation }) => {
	const statusBarHeight = StatusBar.currentHeight;
	const width = Dimensions.get('window').width;
	let [
		password,
		setPassword
	] = useState('');
	let [
		passwordCheck,
		setPasswordCheck
	] = useState('');
	let [
		passwordVisible,
		setPasswordVisible
	] = useState(false);
	let [
		passwordCheckVisible,
		setPasswordCheckVisible
	] = useState(false);
	return (
		<React.Fragment>
			<View style={{ backgroundColor: 'white' }}>
				<View style={{ padding: 6, justifyContent: 'flex-start', alignItems: 'flex-start' }}>
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
			</View>
			<View
				style={{
					flex            : 1,
					backgroundColor : 'white',
					paddingTop      : statusBarHeight,
					alignItems      : 'center'
				}}
			>
				<View style={{ padding: 16 }}>
					<View style={{ justifyContent: 'center', alignItems: 'center' }}>
						<Text style={{ fontSize: 30, fontWeight: 'bold' }}>Buat Sandi</Text>
					</View>
					<View style={{ padding: 6, width: width - 35 * 2, marginTop: 30, flexDirection: 'column' }}>
						<View style={{ marginBottom: 6 }}>
							<Text style={{ fontSize: 22, fontWeight: '600' }}>Sandi</Text>
						</View>
						<View
							style={{
								padding        : 6,
								borderColor    : 'blue',
								borderWidth    : 1,
								height         : 50,
								borderRadius   : 5,
								flexDirection  : 'row',
								alignItems     : 'center',
								justifyContent : 'space-between'
							}}
						>
							<TextInput
								value={password}
								placeholder='******'
								style={{ flex: 1 }}
								secureTextEntry={passwordVisible ? false : true}
								onChangeText={(v) => setPassword(v)}
							/>
							<TouchableOpacity
								onPress={() => setPasswordVisible(!passwordVisible)}
								activeOpacity={0.5}
								style={{ padding: 4, justifyContent: 'center', alignItems: 'center' }}
							>
								<Icon name={`${passwordVisible ? 'md-eye' : 'md-eye-off'}`} type='ionicon' />
							</TouchableOpacity>
						</View>
					</View>
					<View style={{ padding: 6, width: width - 35 * 2, flexDirection: 'column' }}>
						<View style={{ marginBottom: 6 }}>
							<Text style={{ fontSize: 22, fontWeight: '600' }}>Ketik ulang Sandi</Text>
						</View>
						<View
							style={{
								padding        : 6,
								borderColor    : 'blue',
								borderWidth    : 1,
								height         : 50,
								borderRadius   : 5,
								flexDirection  : 'row',
								alignItems     : 'center',
								justifyContent : 'space-between'
							}}
						>
							<TextInput
								placeholder='******'
								style={{ flex: 1 }}
								secureTextEntry={passwordCheckVisible ? false : true}
								onChangeText={(v) => setPasswordCheck(v)}
							/>
							<TouchableOpacity
								onPress={() => setPasswordCheckVisible(!passwordCheckVisible)}
								activeOpacity={0.5}
								style={{ padding: 4, justifyContent: 'center', alignItems: 'center' }}
							>
								<Icon name={`${passwordCheckVisible ? 'md-eye' : 'md-eye-off'}`} type='ionicon' />
							</TouchableOpacity>
						</View>
					</View>
					{passwordCheck === password ? null : (
						<Text style={{ color: 'red', padding: 4 }}>Pastikan Sandi harus sama.</Text>
					)}
					<TouchableOpacity
						onPress={() => navigation.navigate('RegisterDnB')}
						style={{ justifyContent: 'center', alignItems: 'center' }}
						disabled={passwordCheck === password ? false : true}
					>
						<View
							style={{
								marginTop      : 15,
								padding        : 6,
								borderColor    :
									passwordCheck === password && password !== '' && passwordCheck !== ''
										? 'blue'
										: 'red',
								borderWidth    : 1,
								height         : 43,
								width          : 140,
								borderRadius   : 25,
								alignItems     : 'center',
								justifyContent : 'center'
							}}
						>
							<Text style={{ fontSize: 18, fontWeight: '500' }}>Next</Text>
						</View>
					</TouchableOpacity>
				</View>
			</View>
		</React.Fragment>
	);
};

export const RegisterDnB = ({ navigation }) => {
	const statusBarHeight = StatusBar.currentHeight;
	const width = Dimensions.get('window').width;
	let [
		date,
		setDate
	] = useState(new Date());
	let [
		num,
		setNum
	] = useState(0);
	const numPadHandler = (val) => {
		setNum(val);
	};
	return (
		<React.Fragment>
			<View style={{ backgroundColor: 'white' }}>
				<View style={{ padding: 6, justifyContent: 'flex-start', alignItems: 'flex-start' }}>
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
			</View>
			<View
				style={{
					flex            : 1,
					backgroundColor : 'white',
					paddingTop      : statusBarHeight,
					alignItems      : 'center'
				}}
			>
				<View style={{ padding: 16 }}>
					<View style={{ justifyContent: 'center', alignItems: 'center' }}>
						<Text style={{ fontSize: 30, fontWeight: 'bold' }}>Masukkan No. HP</Text>
					</View>
					<View
						style={{
							padding       : 10,
							borderWidth   : 1,
							borderRadius  : 6,
							marginTop     : 10,
							alignItems    : 'center',
							flexDirection : 'row'
						}}
					>
						<View style={{ padding: 4 }}>
							<Text style={{ fontSize: 16 }}>+62 (0)</Text>
						</View>
						<View style={{ padding: 4, height: 50, width: 300 }}>
							<TextInput
								value={num}
								onChange={(val) => numPadHandler(val.nativeEvent.text)}
								keyboardType='number-pad'
								textContentType='telephoneNumber'
								style={{ fontSize: 16, letterSpacing: 1 }}
								autoFocus={true}
								maxLength={14}
							/>
						</View>
					</View>
					<TouchableOpacity
						onPress={() => navigation.navigate('pin')}
						style={{ justifyContent: 'center', alignItems: 'center' }}
						disabled={num.length > 7 ? false : true}
					>
						<View
							style={{
								marginTop      : 15,
								padding        : 6,
								borderColor    : num.length > 7 ? 'blue' : 'red',
								borderWidth    : 1,
								height         : 43,
								width          : 140,
								borderRadius   : 25,
								alignItems     : 'center',
								justifyContent : 'center'
							}}
						>
							<Text style={{ fontSize: 18, fontWeight: '500' }}>Next</Text>
						</View>
					</TouchableOpacity>
				</View>
			</View>
		</React.Fragment>
	);
};

export const pinVerification = ({ navigation }) => {
	const statusBarHeight = StatusBar.currentHeight;
	const width = Dimensions.get('window').width;
	let [
		num,
		setNum
	] = useState('');
	const numPadHandler = (val) => {
		setNum(val);
	};
	return (
		<React.Fragment>
			<View style={{ backgroundColor: 'white' }}>
				<View style={{ padding: 6, justifyContent: 'flex-start', alignItems: 'flex-start' }}>
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
			</View>
			<View
				style={{
					flex            : 1,
					backgroundColor : 'white',
					paddingTop      : statusBarHeight,
					alignItems      : 'center'
				}}
			>
				<View style={{ padding: 16 }}>
					<View style={{ justifyContent: 'center', alignItems: 'center' }}>
						<Text style={{ fontSize: 30, fontWeight: 'bold' }}>PIN Verifikasi</Text>
					</View>
					<View
						style={{
							padding       : 10,
							borderWidth   : 1,
							borderRadius  : 6,
							marginTop     : 10,
							alignItems    : 'center',
							flexDirection : 'row'
						}}
					>
						<View style={{ padding: 4, justifyContent: 'center', alignItems: 'center' }}>
							<Text style={{ fontSize: 16 }}>4 Digit</Text>
						</View>
						<View
							style={{
								padding        : 4,
								height         : 50,
								width          : 300,
								justifyContent : 'center',
								alignItems     : 'center'
							}}
						>
							<SmoothPinCodeInput
								value={num}
								cellStyle={{
									borderBottomWidth : 2,
									borderColor       : 'gray'
								}}
								celStyleFocused={{
									borderColor : 'black'
								}}
								onTextChange={(val) => setNum(val)}
							/>
						</View>
					</View>
					<View style={{ padding: 10, justifyContent: 'center', alignItems: 'center' }}>
						<View style={{ flexDirection: 'row' }}>
							<View style={{ padding: 4 }}>
								<Text style={{ fontSize: 16 }}>Tidak mendapatkan PIN Verifikasi ?</Text>
							</View>

							<View style={{ padding: 4, borderBottomWidth: 1, marginL: 6, borderBottomColor: 'blue' }}>
								<Text style={{ fontSize: 15, color: 'blue' }}>Kirim ulang </Text>
							</View>
						</View>
					</View>
					<TouchableOpacity
						onPress={() => navigation.navigate('AlmostThere')}
						style={{ justifyContent: 'center', alignItems: 'center' }}
						disabled={num.length === 4 ? false : true}
					>
						<View
							style={{
								marginTop      : 15,
								padding        : 6,
								borderColor    : num === '1234' ? 'blue' : 'red',
								borderWidth    : 1,
								height         : 43,
								width          : 140,
								borderRadius   : 25,
								alignItems     : 'center',
								justifyContent : 'center'
							}}
						>
							<Text style={{ fontSize: 18, fontWeight: '500' }}>Next</Text>
						</View>
					</TouchableOpacity>
				</View>
			</View>
		</React.Fragment>
	);
};

export const AlmostThere = ({ navigation }) => {
	const statusBarHeight = StatusBar.currentHeight;
	const width = Dimensions.get('window').width;
	return (
		<React.Fragment>
			<View style={{ backgroundColor: 'white' }}>
				<View style={{ padding: 6, justifyContent: 'flex-start', alignItems: 'flex-start' }}>
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
			</View>
			<View
				style={{
					flex            : 1,
					backgroundColor : 'white',
					paddingTop      : statusBarHeight,
					alignItems      : 'center',
					justifyContent  : 'center'
				}}
			>
				<View style={{ padding: 16 }}>
					<View style={{ padding: 4 }}>
						<Text style={{ fontSize: 25, fontWeight: '600' }}>Welcome to Cafely!</Text>
					</View>
					<TouchableOpacity
						onPress={() => navigation.navigate('Login')}
						style={{ justifyContent: 'center', alignItems: 'center' }}
					>
						<View
							style={{
								marginTop      : 15,
								padding        : 6,
								borderColor    : 'blue',
								borderWidth    : 1,
								height         : 43,
								width          : 140,
								borderRadius   : 25,
								alignItems     : 'center',
								justifyContent : 'center'
							}}
						>
							<Text style={{ fontSize: 18, fontWeight: '500' }}>Masuk</Text>
						</View>
					</TouchableOpacity>
				</View>
			</View>
			<View style={{ justifyContent: 'flex-end', backgroundColor: 'white' }}>
				<View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
					<View style={{ padding: 16 }}>
						<Text>Hak Cipta Cafely 2020</Text>
					</View>
					<View style={{ padding: 16 }}>
						<Text>Privacy and Agreement</Text>
					</View>
				</View>
			</View>
		</React.Fragment>
	);
};
