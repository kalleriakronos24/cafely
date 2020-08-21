import React, { Component, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { View, Text, Image, ScrollView, TouchableOpacity, Dimensions } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { VIEW_SINGLE } from '../../Redux/actions/action';

import { Icon } from 'react-native-elements';
import { useDarkMode } from 'react-native-dark-mode';

const Listings = (props) => {
	const dispatch = useDispatch();

	const ViewSingleFood = (val, idx) => {
		// dispatch(VIEW_SINGLE({ val }));
		dispatch({ type: 'WARUNG_NAME', name: val.warung });
		if (val !== null) {
			props.navigation.navigate('ViewPost', { viewSingleData: val });
		}
	};
	let [
		menu_list,
		setMenuList
	] = useState([
		{
			id                : 1,
			menu_name         : 'Kerikil ABCQWEQWEWQEQWEWQEqweqweqweqweqweqweweqweqweqwqweqwwqeqwweqwe',
			price_ea          : 12000,
			qty               : 1,
			total             : 8000,
			deleted_from_cart : false,
			distance          : 0,
			warung            : 'Warung Makan Bu UDIN',
			pemilik           : 'IBU UDIN',
			coords            : {
				latitude  : -0.5240333,
				longitude : 117.1711636
			},
			is_ket_order      : false,
			keterangan_order  : '',
			tambahan_lainnya  : {
				sambel    : true,
				serondeng : true,
				tempe     : true
			}
		},
		{
			id                : 2,
			menu_name         : 'Kerikil ABCD',
			price_ea          : 8000,
			qty               : 1,
			total             : 8000,
			deleted_from_cart : false,
			warung            : 'Warung Nasi Padang Prapatan',
			pemilik           : 'Pak Herman',
			distance          : 0,
			coords            : {
				latitude  : -0.5225474,
				longitude : 117.1694158
			},
			is_ket_order      : false,
			keterangan_order  : '',
			tambahan_lainnya  : {
				sambel    : true,
				serondeng : true,
				tempe     : true
			}
		},
		{
			id                : 3,
			menu_name         : 'Kerikil ABCDE',
			price_ea          : 8000,
			qty               : 1,
			total             : 8000,
			deleted_from_cart : false,
			warung            : 'Warung Nasi Kuning Ppg',
			pemilik           : 'IBU PPGA',
			distance          : 0,
			coords            : {
				latitude  : -0.5240333,
				longitude : 117.1711636
			},
			is_ket_order      : false,
			keterangan_order  : '',
			tambahan_lainnya  : {
				sambel    : true,
				serondeng : true,
				tempe     : true
			}
		}
	]);
	let { width, height } = Dimensions.get('window');
	const isDarkMode = useDarkMode();
	return (
		<View>
			<View>
				<View
					style={{
						alignItems        : 'center',
						justifyContent    : 'center',
						flexDirection     : 'row',
						justifyContent    : 'space-between',
						marginBottom      : 18,
						paddingHorizontal : 16
					}}
				>
					<Text
						style={{
							fontSize   : width < 410 ? 19 : 24,
							fontWeight : 'bold',
							color      : isDarkMode ? '#B1B1B1' : 'black'
						}}
					>
						FOOD
					</Text>
					<TouchableOpacity onPress={() => props.navigation.navigate('Buy')}>
						<Icon name='ios-list' color={isDarkMode ? '#B1B1B1' : 'blue'} type='ionicon' />
					</TouchableOpacity>
				</View>

				<ScrollView horizontal={true} style={{ flexDirection: 'row' }} showsHorizontalScrollIndicator={false}>
					{menu_list.map((v, i) => {
						return (
							<TouchableOpacity key={i} onPress={() => ViewSingleFood(v, i)} style={{ marginHorizontal: 16 }}>
								<View
									style={{
										borderRadius : 8,
										width        : width < 410 ? 170 : 210,
										height       : width < 410 ? 170 : 240,
										position     : 'relative'
									}}
								>
									<Image
										style={{
											borderRadius : 8,
											resizeMode   : 'cover',
											height       : '100%',
											width        : '100%',
											flex         : 1
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
										numberOfLines={1}
										ellipsizeMode={'tail'}
										style={{
											fontSize      : width < 410 ? 15 : 18,
											fontWeight    : 'bold',
											marginTop     : 14,
											color         : 'white',
											textTransform : 'uppercase'
										}}
									>
										{v.menu_name}
									</Text>
									<Text style={{ marginTop: 2, fontSize: width < 410 ? 14 : 17, color: 'white' }}>
										Rp. {v.price_ea},-
									</Text>
								</View>
							</TouchableOpacity>
						);
					})}
					<View style={{ marginHorizontal: 16 }}>
						<View
							style={{
								borderRadius    : 8,
								width           : width < 410 ? 170 : 210,
								height          : width < 410 ? 170 : 240,
								borderWidth     : 1,
								justifyContent  : 'center',
								alignItems      : 'center',
								backgroundColor : '#121212',
								borderColor     : isDarkMode ? '#B1B1B1' : 'black'
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
									<Icon name='md-restaurant' color='white' type='ionicon' size={35} />
								</View>
								<View style={{ justifyContent: 'center', alignItems: 'center', padding: 8 }}>
									<Text
										style={{
											fontWeight : 'bold',
											fontSize   : 16,
											textAlign  : 'center',
											color      : '#B1B1B1'
										}}
									>
										Jelajahi Makanan Lainnya di Cafely
									</Text>
								</View>
								<TouchableOpacity
									onPress={() => props.navigation.navigate('Buy')}
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
									<Text style={{ color: '#B1B1B1', fontSize: 16 }}>Explore</Text>
								</TouchableOpacity>
							</View>
						</View>
					</View>
				</ScrollView>
				<View style={{ padding: 7 }}>
					<Text
						style={{
							textAlign : 'center',
							fontSize  : 11.7,
							color     : isDarkMode ? '#B1B1B1' : 'black'
						}}
					>
						Stay up-to-date with local food and drink by getting lists of posts you may like
					</Text>
					<View
						style={{ borderBottomWidth: 1, borderColor: '#2296F3', marginHorizontal: 12, marginTop: 4 }}
					/>
					<View
						style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginTop: 5 }}
					>
						<Icon name='ios-notifications' color={isDarkMode ? '#B1B1B1' : 'blue'} type='ionicon' />
						<Text
							style={{
								marginLeft : 6,
								textAlign  : 'center',
								fontSize   : 14,
								color      : isDarkMode ? '#B1B1B1' : 'black'
							}}
						>
							Keep Me Updated
						</Text>
					</View>
				</View>
			</View>

			{/* <View style={{ paddingTop: 16 }}>
				<View
					style={{
						alignItems        : 'center',
						justifyContent    : 'center',
						flexDirection     : 'row',
						justifyContent    : 'space-between',
						marginBottom      : 18,
						paddingHorizontal : 16
					}}
				>
					<Text style={{ fontSize: width < 410 ? 19 : 24, fontWeight: 'bold' }}>HIRE-ME</Text>
					<TouchableOpacity onPress={() => this.props.navigation.navigate('Hire')}>
						<Icon name='ios-list' color='blue' type='ionicon' />
					</TouchableOpacity>
				</View>

				<ScrollView horizontal={true} style={{ flexDirection: 'row' }}>
					<View style={{ paddingHorizontal: 16 }}>
						<View style={{ borderRadius: 8, width: 200, height: 200 }}>
							<Image
								style={{
									resizeMode   : 'cover',
									height       : undefined,
									width        : undefined,
									flex         : 1,
									borderRadius : 8
								}}
								source={require('../../../assets/person/sponjibob.png')}
							/>
						</View>
						<Text style={{ fontSize: 16, fontWeight: 'bold', marginTop: 14 }}>Mada Dwi Nugraha</Text>
						<Text>UX Designer / Backend Developer</Text>
					</View>
				</ScrollView>

				<View
					style={{
						marginHorizontal  : 16,
						paddingBottom     : 20,
						borderBottomColor : '#2296F3',
						borderBottomWidth : 1
					}}
				/>
			</View> */}
		</View>
	);
};

export default Listings;
// export class Listings extends Component {
//     static propTypes = {

//     }

//     render() {
//         return (
//            <View>
//                 <View>
//                         <View style={{ alignItems:'center', justifyContent: 'center', flexDirection: 'row', justifyContent: 'space-between', marginBottom: 18, paddingHorizontal: 16}}>
//                         <Text style={{ fontSize: 24 , fontWeight: 'bold'}}>Nasi Kuning</Text>
//                         <TouchableOpacity onPress={() => this.props.navigation.navigate('Buy')} >
//                           <Text style={{ fontSize: 16, color: 'blue'}}>Lihat Semua</Text>
//                           </TouchableOpacity>
//                         </View>

//                         <ScrollView horizontal={true} style={{ flexDirection: 'row'}}>
//                           <TouchableOpacity onPress={() => this.props.navigation.navigate('FoodSingle')} style={{ alignItems:'center', justifyContent: 'center', paddingHorizontal: 16}}>
//                               <View style={{ borderRadius: 8, width: 200, height: 200}}>
//                               <Image style={{ resizeMode: 'cover', height:undefined, width: undefined, flex: 1, borderRadius:8}} source={ require('../../../assets/icon/rice.png' )}/>
//                               </View>
//                               <Text style={{ fontSize: 18, fontWeight: 'bold', marginTop: 14}}>Nasi Kuning Ikan Tongkol Bumbu Bali</Text><Text style={{ marginTop: 2, fontSize: 17}}>Rp.8.000,-</Text>
//                           </TouchableOpacity>
//                           <View style={{ alignItems:'center', justifyContent: 'center', paddingHorizontal: 16}}>
//                               <View style={{ borderRadius: 8, width: 200, height: 200}}>
//                               <Image style={{ resizeMode: 'cover', height:undefined, width: undefined, flex: 1, borderRadius:8}} source={ require('../../../assets/icon/rice.png' )}/>
//                               </View>
//                               <Text style={{ fontSize: 18, fontWeight: 'bold', marginTop: 14}}>Nasi Kuning Ayam Bumbu Bali</Text><Text style={{ marginTop: 2, fontSize: 17}}>Rp.8.000,-</Text>
//                           </View>
//                           <View style={{ alignItems:'center', justifyContent: 'center', paddingHorizontal: 16}}>
//                               <View style={{ borderRadius: 8, width: 200, height: 200}}>
//                               <Image style={{ resizeMode: 'cover', height:undefined, width: undefined, flex: 1, borderRadius:8}} source={ require('../../../assets/icon/rice.png' )}/>
//                               </View>
//                               <Text style={{ fontSize: 18, fontWeight: 'bold', marginTop: 14}}>Nasi Kuning Ikan Haruan Bumbu Bali</Text><Text style={{ marginTop: 2, fontSize: 17}}>Rp.8.000,-</Text>
//                           </View>
//                         </ScrollView>
//                         <View style={{ marginHorizontal: 16,  paddingBottom: 20, borderBottomColor: '#2296F3', borderBottomWidth: 1}}></View>
//                   </View>

//                   <View style={{ paddingTop: 16}}>
//                         <View style={{ alignItems:'center', justifyContent: 'center', flexDirection: 'row', justifyContent: 'space-between', marginBottom: 18, paddingHorizontal: 16}}>
//                         <Text style={{ fontSize: 24 , fontWeight: 'bold'}}>HIRE-ME</Text>
//                         <TouchableOpacity onPress={() => this.props.navigation.navigate('Hire')} >
//                           <Text style={{ fontSize: 16, color: 'blue'}}>Lihat Semua</Text>
//                           </TouchableOpacity>
//                         </View>

//                         <ScrollView horizontal={true} style={{ flexDirection: 'row'}}>
//                           <View style={{ paddingHorizontal: 16}}>
//                               <View style={{ borderRadius: 8, width: 200, height: 200}}>
//                               <Image style={{ resizeMode: 'cover', height:undefined, width: undefined, flex: 1, borderRadius:8}} source={ require('../../../assets/person/sponjibob.png' )}/>
//                               </View>
//                               <Text style={{ fontSize: 16, fontWeight: 'bold', marginTop: 14}}>Mada Dwi Nugraha</Text><Text>UX Designer / Backend Developer</Text>
//                           </View>

//                         </ScrollView>
//                         <View style={{  marginHorizontal: 16, paddingBottom: 20, borderBottomColor: '#2296F3', borderBottomWidth: 1}}></View>
//                   </View>

//            </View>
//         )
//     }
// }
