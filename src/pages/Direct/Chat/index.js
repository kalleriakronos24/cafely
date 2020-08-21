import React from 'react';
import { View, Text, ScrollView, TextInput, Image, ToastAndroid, TouchableOpacity } from 'react-native';
import { Icon } from 'react-native-elements';
import Spinner from 'react-native-spinkit';

export const DirectChat = ({ navigation }) => {
	const f = false;
	return (
		<View style={{ flex: 1, backgroundColor: 'white' }}>
			<View
				style={{
					flex : 1
				}}
			>
				{f ? (
					<View
						style={{
							position        : 'absolute',
							height          : 30,
							backgroundColor : 'black',
							flex            : 1,
							width           : '100%',
							zIndex          : 10
						}}
					>
						<View style={{ flexDirection: 'row', marginLeft: 10, alignItems: 'center', padding: 5 }}>
							<Spinner color='white' size={20} type='FadingCircleAlt' />
							<Text style={{ color: 'white', marginLeft: 5 }}>Connecting...</Text>
						</View>
					</View>
				) : null}

				<ScrollView style={{ padding: 16, flex: 1 }}>
					<View style={{ padding: 5, flex: 1 }}>
						<View
							style={{
								flexDirection : 'row',
								flex          : 1,
								paddingRight  : 50
							}}
						>
							<View
								style={{
									height       : 45,
									width        : 45,
									borderRadius : 45 / 2,
									overflow     : 'hidden',
									borderColor  : '#43B581',
									borderWidth  : 2
								}}
							>
								<Image
									style={{
										height    : '100%',
										width     : '100%',
										alignSelf : 'stretch'
									}}
									source={require('../../../../assets/banner/q3.png')}
								/>
							</View>
							<View
								style={{
									flexDirection : 'column',
									padding       : 4
								}}
							>
								<View style={{ marginBottom: 6, flexDirection: 'row', alignItems: 'center' }}>
									<Text style={{ fontSize: 17, textTransform: 'capitalize', marginLeft: 4 }}>
										si udin
									</Text>

									<Text style={{ marginHorizontal: 7, fontWeight: 'bold', color: '#43B581' }}>
										&#5867;
									</Text>
									<Text style={{ color: 'black', opacity: 0.4 }}>Warung Makan Bu Udin 2</Text>
								</View>
								<View
									style={{
										marginLeft   : 5,
										padding      : 7,
										borderWidth  : 1,
										borderColor  : 'blue',
										borderRadius : 20
									}}
								>
									<View style={{ padding: 4 }}>
										<Text
											style={{
												fontSize   : 16,
												lineHeight : 20
											}}
										>
											qweqweqweqweqweqweqweqwe
										</Text>
									</View>
								</View>
								<View style={{ padding: 4, justifyContent: 'space-between', flexDirection: 'row' }}>
									<View />
									<View style={{ flexDirection: 'row', alignItems: 'center' }}>
										<Text style={{ color: 'black', opacity: 0.7 }}>
											{new Date().toLocaleDateString('id-ID', { hour12: false })}
										</Text>
										<Text
											style={{
												marginHorizontal : 7,
												fontWeight       : 'bold',
												color            : 'black',
												opacity          : 0.7
											}}
										>
											&#5867;
										</Text>
										<Text style={{ color: 'black', opacity: 0.7 }}>14 : 12</Text>
									</View>
								</View>
							</View>
						</View>
						{/* MEE */}
						<View
							style={{
								flexDirection : 'row',
								flex          : 1,
								paddingRight  : 50
							}}
						>
							<View
								style={{
									height       : 45,
									width        : 45,
									borderRadius : 45 / 2,
									overflow     : 'hidden',
									borderColor  : '#43B581',
									borderWidth  : 2
								}}
							>
								<Image
									style={{
										height    : '100%',
										width     : '100%',
										alignSelf : 'stretch'
									}}
									source={require('../../../../assets/banner/q3.png')}
								/>
							</View>
							<View
								style={{
									flexDirection : 'column',
									padding       : 4
								}}
							>
								<View style={{ marginBottom: 6, flexDirection: 'row', alignItems: 'center' }}>
									<Text style={{ fontSize: 17, textTransform: 'capitalize', marginLeft: 4 }}>
										Saya
									</Text>

									<Text style={{ marginHorizontal: 7, fontWeight: 'bold', color: '#43B581' }}>
										&#5867;
									</Text>
									<Text style={{ color: 'black', opacity: 0.4 }}>Mad</Text>
								</View>
								<View
									style={{
										marginLeft   : 5,
										padding      : 7,
										borderWidth  : 1,
										borderColor  : 'blue',
										borderRadius : 20
									}}
								>
									<View style={{ padding: 4 }}>
										<Text
											style={{
												fontSize   : 16,
												lineHeight : 20
											}}
										>
											gw sih owh aja Bro
										</Text>
									</View>
								</View>
								<View style={{ padding: 4, justifyContent: 'space-between', flexDirection: 'row' }}>
									<View />
									<View style={{ flexDirection: 'row', alignItems: 'center' }}>
										<Text style={{ color: 'black', opacity: 0.7 }}>
											{new Date().toLocaleDateString('id-ID', { hour12: false })}
										</Text>
										<Text
											style={{
												marginHorizontal : 7,
												fontWeight       : 'bold',
												color            : 'black',
												opacity          : 0.7
											}}
										>
											&#5867;
										</Text>
										<Text style={{ color: 'black', opacity: 0.7 }}>14 : 12</Text>
									</View>
								</View>
							</View>
						</View>
					</View>
				</ScrollView>
			</View>
			<View style={{ justifyContent: 'flex-end', padding: 8 }}>
				<View
					style={{
						padding         : 4,
						backgroundColor : '#efefef',
						height          : 50,
						borderRadius    : 25,
						flexDirection   : 'row',
						alignItems      : 'center',
						justifyContent  : 'space-between'
					}}
				>
					<View style={{ flexDirection: 'row', flex: 1 }}>
						<TouchableOpacity
							activeOpacity={0.5}
							onPress={() =>
								ToastAndroid.showWithGravity(
									'FItur Belum Tersedia',
									ToastAndroid.SHORT,
									ToastAndroid.BOTTOM,
									25,
									50
								)}
							style={{ justifyContent: 'center', alignItems: 'center', padding: 8 }}
						>
							<Icon name='ios-images' size={30} type='ionicon' />
						</TouchableOpacity>
						<View style={{ justifyContent: 'center', alignItems: 'center', marginLeft: 6, flex: 1 }}>
							<TextInput
								multiline={true}
								style={{ height: '100%', width: '100%', fontSize: 16 }}
								placeholder='Message Si Udin'
							/>
						</View>
					</View>
					<TouchableOpacity
						activeOpacity={0.5}
						onLongPress={() =>
							ToastAndroid.showWithGravity('Send', ToastAndroid.SHORT, ToastAndroid.BOTTOM, 25, 50)}
						style={{ justifyContent: 'center', alignItems: 'center', padding: 8 }}
					>
						<Icon name='md-send' size={30} type='ionicon' />
					</TouchableOpacity>
				</View>
			</View>
		</View>
	);
};
