import React, { useEffect, useState } from 'react';
import {
	View,
	ScrollView,
	RefreshControl,
	StyleSheet,
	Text,
	StatusBar,
	TouchableOpacity,
	Image,
	Dimensions
} from 'react-native';
import { Icon } from 'react-native-elements';

import Animated from 'react-native-reanimated';

export const Covid19 = (props) => {
	let [
		scrollY,
		setScrollY
	] = useState(new Animated.Value(0));

	let { width, height } = Dimensions.get('window');
	let HEADER_MAX_HEIGHT = width < 410 ? 270 : 300;
	let HEADER_MIN_HEIGHT = 170;
	let HEADER_SCROLL_DISTANCE = HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT;
	let baseWidth = 350;
	let baseHeight = 680;
	let w = width < 410;
	let scale = (size) => width / baseWidth * size;

	let moderateScale = (size, factor = 0.5) => size + (scale(size) - size) * factor;

	useEffect(() => {}, []);
	const styles = StyleSheet.create({
		fill              : {
			flex : 1
		},
		header            : {
			position        : 'absolute',
			top             : 0,
			left            : 0,
			right           : 0,
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
			marginTop       : 30
		},
		title             : {
			backgroundColor : 'transparent',
			color           : 'white',
			fontSize        : moderateScale(18)
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
	return (
		<View style={{ flex: 1, backgroundColor: 'white', paddingTop: statusBarHeight }}>
			<Animated.ScrollView
				style={{
					backgroundColor : 'white',
					flex            : 1
				}}
				scrollEventThrottle={1}
				onScroll={Animated.event(
					[
						{ nativeEvent: { contentOffset: { y: scrollY } } }
					],
					{ useNativeDriver: true }
				)}
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
								width    : '100%',
								height   : '100%',
								position : 'absolute',
								top      : 0,
								left     : 0
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
							<Text style={{ color: 'white', fontSize: width < 410 ? 12 : 15, textAlign: 'center' }}>
								Sunday, 15 Mar 2020
							</Text>
						</View>
					</View>
				</View>

				<View style={{ padding: 16, flex: 1, marginTop: HEADER_MAX_HEIGHT }}>
					<View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
						<Text style={{ fontWeight: 'bold', fontSize: width < 410 ? 16 : 25 }}>Apa itu COVID-19 ?</Text>
					</View>
					<View style={{ alignItems: 'flex-start', paddingTop: 12 }}>
						<Text style={{ fontSize: width < 410 ? 16 : 23, fontWeight: 'bold' }}>
							COVID-19
							<Text
								style={{
									fontSize   : width < 410 ? 13 : 16,
									fontWeight : '100',
									lineHeight : 30,
									textAlign  : 'justify'
								}}
							>
								&nbsp;Atau biasa dikenal dengan Corona Virus adalah virus yang menyerang sistem
								pernapasan manusia. Virus ini masih berhubungan dengan penyebab SARS dan MERS yang
								sempat merebak beberapa tahun lalu.
							</Text>
						</Text>
					</View>
					<View
						style={{ marginTop: 6, paddingBottom: 20, borderBottomColor: '#2296F3', borderBottomWidth: 1 }}
					/>
					<View
						style={{
							flex           : 1,
							alignItems     : 'center',
							justifyContent : 'center',
							paddingTop     : 15
						}}
					>
						<Text style={{ fontWeight: 'bold', fontSize: width < 410 ? 16 : 25 }}>
							Penyebab Virus Corona
						</Text>
					</View>
					<View style={{ alignItems: 'flex-start', paddingTop: 12 }}>
						<Text style={{ fontSize: width < 410 ? 16 : 23, fontWeight: 'bold' }}>
							Sampai
							<Text
								style={{
									fontSize   : width < 410 ? 13 : 16,
									fontWeight : '100',
									lineHeight : 30,
									textAlign  : 'justify'
								}}
							>
								&nbsp;saat ini belum diketahui penyebab dari virus Corona, tetapi diketahui virus ini
								disebarkan oleh hewan dan mampu menjangkit dari satu spesies ke spesies lainnya,
								termasuk manusia. Diketahui virus Corona berasal dari Kota Wuhan di China dan muncul
								pada Desember 2019
							</Text>
						</Text>
					</View>
					<View
						style={{ marginTop: 6, paddingBottom: 20, borderBottomColor: '#2296F3', borderBottomWidth: 1 }}
					/>
					<View
						style={{
							flex           : 1,
							alignItems     : 'center',
							justifyContent : 'center',
							paddingTop     : 15
						}}
					>
						<Text style={{ fontWeight: 'bold', fontSize: width < 410 ? 16 : 25 }}>Gejala Virus Corona</Text>
					</View>
					<View style={{ alignItems: 'flex-start', paddingTop: 12 }}>
						<Text style={{ fontSize: width < 410 ? 16 : 23, fontWeight: 'bold' }}>
							Virus
							<Text
								style={{
									fontSize   : width < 410 ? 13 : 16,
									fontWeight : '100',
									lineHeight : 30,
									textAlign  : 'justify'
								}}
							>
								&nbsp;Corona muncul dengan beberapa gejala yang berbeda-beda pada tubuh pasiennya.
								Namun, secara umum, gejala virus Corona adalah flu, demam, batu, hingga sesak napas.
							</Text>
						</Text>
					</View>
					<View
						style={{ marginTop: 6, paddingBottom: 20, borderBottomColor: '#2296F3', borderBottomWidth: 1 }}
					/>
					<View
						style={{
							flex           : 1,
							alignItems     : 'center',
							justifyContent : 'center',
							paddingTop     : 15
						}}
					>
						<Text style={{ fontWeight: 'bold', fontSize: width < 410 ? 16 : 25 }}>Bahaya Virus Corona</Text>
					</View>
					<View style={{ alignItems: 'flex-start', paddingTop: 12 }}>
						<Text style={{ fontSize: width < 410 ? 16 : 23, fontWeight: 'bold' }}>
							Berdasarkan
							<Text
								style={{
									fontSize   : width < 410 ? 13 : 16,
									fontWeight : '100',
									lineHeight : 30,
									textAlign  : 'justify'
								}}
							>
								&nbsp;penelitian, bahaya virus Corona bisa menyebabkan kematian. Bahkan, pasien yang
								terinfeksi dan sembuh akan mengalami kerusakan{' '}
								<Text style={{ fontSize: width < 410 ? 16 : 23, fontWeight: 'bold' }}>
									PERMANEN
								</Text>{' '}
								pada paru-paru dan antibodi Manusia.
							</Text>
						</Text>
					</View>
					<View
						style={{ marginTop: 6, paddingBottom: 20, borderBottomColor: '#2296F3', borderBottomWidth: 1 }}
					/>
					<View
						style={{
							flex           : 1,
							alignItems     : 'center',
							justifyContent : 'center',
							paddingTop     : 15
						}}
					>
						<Text style={{ fontWeight: 'bold', fontSize: width < 410 ? 16 : 25 }}>
							Penyembuhan Virus Corona
						</Text>
					</View>
					<View style={{ alignItems: 'flex-start', paddingTop: 12 }}>
						<Text style={{ fontSize: width < 410 ? 16 : 23, fontWeight: 'bold' }}>
							Sampai
							<Text
								style={{
									fontSize   : width < 410 ? 13 : 16,
									fontWeight : '100',
									lineHeight : 30,
									textAlign  : 'justify'
								}}
							>
								&nbsp;saat ini belum ditemukan Vaksin atau obat untuk mengobati Virus Corona ini. Namun,
								tercatat ada beberapa orang yang telah sembuh dari virus Corona setelah menjalani
								isolasi serta perawatan di rumah sakit.
							</Text>
						</Text>
					</View>
					<View style={{ alignItems: 'flex-start', paddingTop: 12 }}>
						<Text style={{ fontSize: width < 410 ? 16 : 23 }}>
							Di Indonesia,
							<Text
								style={{
									fontSize   : width < 410 ? 13 : 16,
									fontWeight : '100',
									lineHeight : 30,
									textAlign  : 'justify'
								}}
							>
								&nbsp;misalnya, per 15 Maret 2020, Pemerintah mengkalim telah ada 8 orang yang sembuh
								dari Virus Corona. Hal itu didasari dua kali pemeriksaan spesimen tidak ditemukan
								kembali Virus Corona dalam tubuh.
							</Text>
						</Text>
					</View>

					<View style={{ marginTop: 20 }}>
						<Text style={{ fontSize: width < 410 ? 13 : 16 }}>Sumber : Detik News / 16 Maret 2020</Text>
						<Text style={{ fontSize: width < 410 ? 13 : 16 }}>Website : www.detiknews.com</Text>
					</View>
					<View
						style={{ marginTop: 6, paddingBottom: 20, borderBottomColor: '#2296F3', borderBottomWidth: 1 }}
					/>
					<View
						style={{
							flex           : 1,
							alignItems     : 'center',
							justifyContent : 'center',
							paddingTop     : 15
						}}
					>
						<Text style={{ fontWeight: 'bold', fontSize: width < 410 ? 16 : 25 }}>IMBAUAN</Text>
					</View>
					<View style={{ alignItems: 'flex-start', paddingTop: 12 }}>
						<Text style={{ fontSize: width < 410 ? 16 : 23, fontWeight: 'bold' }}>
							Ada
							<Text
								style={{
									fontSize   : width < 410 ? 14 : 18,
									fontWeight : '100',
									lineHeight : 30,
									textAlign  : 'justify'
								}}
							>
								&nbsp;beberapa himbauan kesehatan dan keselmatan dari WHO atau Organisasi Kesehatan
								Dunia maupun dari Mentri Kesehatan Indonesia, antara lainnya :
							</Text>
						</Text>
					</View>
					<View style={{ marginTop: 15 }}>
						<Text
							style={{
								fontSize   : width < 410 ? 14 : 18,
								fontWeight : '100',
								lineHeight : 30,
								textAlign  : 'justify'
							}}
						>
							1. Jaga Jarak interaksi soasial di publik atau tempat umum maupun di dalam rumah, dengan
							jaga jarak kurang lebih 1,5 meter untuk menghindari Penularan Virus Corona.
						</Text>
						<Text
							style={{
								fontSize   : width < 410 ? 14 : 18,
								fontWeight : '100',
								lineHeight : 30,
								textAlign  : 'justify'
							}}
						>
							2. Jangan Lupa untuk selaulu Mencuci Tangan, jangan Sentuh Mulut, Mata, Hidung, ataupun
							Wajah anda sebelum Mencuci Tangan, karena tangan adalah media terbesar untuk masuknya virus
							ke tubuh dengan kita menyentuhkannya ke wajah, jadi jangan Lupa Untuk Mencuci Tangan !!!.
						</Text>
						<Text
							style={{
								fontSize   : width < 410 ? 14 : 18,
								fontWeight : '100',
								lineHeight : 30,
								textAlign  : 'justify'
							}}
						>
							3. Jika anda berpergian jauh dan datang ketempat yang ramai , pastikan anda mencuci tangan,
							kaki, melepas jaket anda (jika memakainya) sebelum memasuki rumah atau jika kembali kerumah,
							dan jangan lupa mandi dengan bersih ketika sudah memasuki rumah, jangan kontak langsung
							dengan orang rumah.
						</Text>
						<Text
							style={{
								fontSize   : width < 410 ? 14 : 18,
								fontWeight : '100',
								lineHeight : 30,
								textAlign  : 'justify'
							}}
						>
							4. Jika anda mengalami flu atau batuk , pastikan berdiam diri dirumah kurang lebih 7 hari ,
							dan jangan lupa untuk memakai masker, jika flu dan batuk tersebut memburuk contohnya jika
							ada gejala sesak nafas setelah berdiam diri atau biasa disebut Isolasi Mandiri dirumah
							segeralah pergi kerumah sakit dan berkonsultasi, dan pastikan jaga jarak.
						</Text>
						<Text
							style={{
								fontSize   : width < 410 ? 14 : 18,
								fontWeight : '100',
								lineHeight : 30,
								textAlign  : 'justify'
							}}
						>
							5. Selalu hindari keramaian dan jika bisa diam diri dirumah.
						</Text>
						<Text
							style={{
								fontSize   : width < 410 ? 14 : 18,
								fontWeight : '100',
								lineHeight : 30,
								textAlign  : 'justify'
							}}
						>
							6. Jangan melaksanakan acara yang membuat keramaian seperti Acara Pernikahan, Solat Jum'at
							untuk sementara waktu, Cafe dan lain-lainnya. Semua Berdasarkan Protokol atau Perintah dari
							WHO atau Pemerintah Pusat.
						</Text>
						<Text
							style={{
								fontSize   : width < 410 ? 14 : 18,
								fontWeight : '100',
								lineHeight : 30,
								textAlign  : 'justify'
							}}
						>
							7. Lindungi Diri, Lindugi Keluarga, Cintai Diri, Cintai Keluarga, Lindugi Orang Sekitar,
							Cintai Orang Sekitar, Jaga Jarak dan Jangan lupa untuk Mencuci Tangan Selalu.!!
						</Text>
					</View>
					<View style={{ marginTop: 20 }}>
						<Text style={{ fontSize: width < 410 ? 14 : 18 }}>
							Sumber : Protokol / Perintah dari Organisasi Kesehatan Dunia, Menteri Kesehatan Indonesia ,
							Rangkuman dari Acara Indonesia Lawyers Club TvOne
						</Text>
						<Text style={{ fontSize: width < 410 ? 14 : 18, marginTop: 8 }}>
							Ditulis Oleh : Mada Dwi Nugraha | Cafely Founder
						</Text>
						<Text style={{ fontSize: width < 410 ? 14 : 18 }}>Diposting : Jum'at 3 April 2020 , 17:44</Text>
					</View>
					<View style={{ flex: 1, marginTop: 34, flexDirection: 'row', flexWrap: 'wrap' }}>
						<View
							style={{
								borderWidth    : 1,
								height         : 30,
								alignItems     : 'center',
								justifyContent : 'center',
								padding        : 20,
								margin         : 7
							}}
						>
							<Text style={{ color: 'blue', fontSize: width < 410 ? 9 : 15 }}>#DirumahAja</Text>
						</View>
						<View
							style={{
								borderWidth    : 1,
								height         : 30,
								alignItems     : 'center',
								justifyContent : 'center',
								padding        : 20,
								margin         : 7
							}}
						>
							<Text style={{ color: 'blue', fontSize: width < 410 ? 9 : 15 }}>#CoronaVirus</Text>
						</View>
						<View
							style={{
								borderWidth    : 1,
								height         : 30,
								alignItems     : 'center',
								justifyContent : 'center',
								padding        : 20,
								margin         : 7
							}}
						>
							<Text style={{ color: 'blue', fontSize: width < 410 ? 9 : 15 }}>#Covid19</Text>
						</View>
						<View
							style={{
								borderWidth    : 1,
								height         : 30,
								alignItems     : 'center',
								justifyContent : 'center',
								padding        : 20,
								margin         : 7
							}}
						>
							<Text style={{ color: 'blue', fontSize: width < 410 ? 10 : 15 }}>#StayAtHome</Text>
						</View>
						<View
							style={{
								borderWidth    : 1,
								height         : 30,
								alignItems     : 'center',
								justifyContent : 'center',
								padding        : 20,
								margin         : 7
							}}
						>
							<Text style={{ color: 'blue', fontSize: width < 410 ? 9 : 15 }}>#SocialDistancing</Text>
						</View>
					</View>
				</View>
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
							onPress={() => props.navigation.goBack()}
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
						<View
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
									In Depth of Covid-19
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
								Pengertian dan Pencegahan
							</Animated.Text>
						</View>

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
		</View>
	);
};
