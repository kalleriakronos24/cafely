import React, { useState, useEffect } from 'react';
import {
	View,
	Text,
	TextInput,
	Image,
	Dimensions,
	TouchableHighlight,
	TouchableOpacity,
	ScrollView,
	FlatList,
	ToastAndroid
} from 'react-native';
import { Icon } from 'react-native-elements';
import NumericInput from 'react-native-numeric-input';
import { useSelector, useDispatch } from 'react-redux';
import { ADD_CART_COUNT, ADD_CART_ITEMS, VIEW_SINGLE } from '../../../Redux/actions/action';

const ProductListing = ({
	View_Single_Food,
	distance,
	name,
	id,
	warung,
	NumHandler,
	price,
	AddToCardHandler,
	qty,
	pos,
	item
}) => {
	const width = Dimensions.get('window').width;
	return pos === 0 ? null : (
		<View style={{ padding: 6 }}>
			<View style={{ flexDirection: 'row' }}>
				<TouchableOpacity onPress={() => View_Single_Food(item, id)} style={{ borderRadius: 10 }}>
					<View
						style={{
							borderRadius : 8,
							height       : 187,
							width        : 187,
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
							source={require('../../../../assets/banner/q3.png')}
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
							ellipsizeMode={'tail'}
							numberOfLines={2}
							style={{
								fontSize      : width < 410 ? 15 : 18,
								fontWeight    : 'bold',
								marginTop     : 14,
								color         : 'white',
								textTransform : 'capitalize'
							}}
						>
							{name}
						</Text>
						<Text style={{ marginTop: 2, fontSize: width < 410 ? 14 : 17, color: 'white' }}>
							Rp.{price},-
						</Text>
					</View>
				</TouchableOpacity>
				<View style={{ marginLeft: 16, flex: 1, flexDirection: 'column' }}>
					<Text
						ellipsizeMode={'tail'}
						numberOfLines={2}
						style={{
							fontSize      : 20,
							fontWeight    : 'bold',
							fontFamily    : 'Roboto',
							textTransform : 'capitalize'
						}}
					>
						{name}
					</Text>
					<View style={{ padding: 4 }}>
						<Text style={{ fontSize: 15, marginTop: 5 }}>wqeqweqweqweqweqwewqeqweqweqwewqeqwewqe</Text>
					</View>
					<View
						style={{
							flex           : 1,
							padding        : 6,
							justifyContent : 'center',
							alignItems     : 'center'
						}}
					>
						<View
							style={{
								width          : '35%',
								height         : 50,
								left           : 0,
								top            : 0,
								alignItems     : 'center',
								justifyContent : 'center'
							}}
						>
							<NumericInput
								initValue={qty}
								value={qty}
								minValue={1}
								editable={true}
								onChange={(value) => NumHandler(id, value)}
								borderColor={'white'}
								totalHeight={34}
								containerStyle={{
									borderWidth : 0
								}}
								iconSize={25}
							/>
						</View>
						<TouchableOpacity
							onPress={() => AddToCardHandler(item, id)}
							style={{
								backgroundColor : '#2296F3',
								width           : '100%',
								height          : 32,
								borderRadius    : 4,
								alignItems      : 'center',
								justifyContent  : 'center'
							}}
						>
							<Text style={{ fontSize: 14, color: 'white' }}>ORDER</Text>
						</TouchableOpacity>
					</View>
				</View>
			</View>
		</View>
	);
};

export const Food_Warung = (props) => {
	const CART_ITEMS = useSelector((state) => state.CART_ITEMS);
	const dispatch = useDispatch();
	let [
		menu_list,
		setMenuList
	] = useState([
		{
			id                : 1,
			menu_name         : 'Kerikil ABCQWEQWEWQEQWEWQE',
			price_ea          : 8000,
			qty               : 1,
			total             : 8000,
			deleted_from_cart : false,
			distance          : 0,
			warung            : 'Warung Bu UDIN',
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
			warung            : 'Warung Bu UDIN',
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
			warung            : 'Warung Bu UDIN',
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
	const pos = {
		latitude  : -0.53109341,
		longitude : 117.16818794
	};
	const ViewSingleFood = (val, idx) => {
		dispatch(VIEW_SINGLE({ val }));
		if (val !== null) {
			props.navigation.navigate('FoodSingle');
		}
	};

	const AddToOrderList = (val, idx) => {
		if (CART_ITEMS.CART_ITEMS.some((v, i) => v.id === val.id)) {
			ToastAndroid.showWithGravity(
				val.menu_name + ' sudah ada di keranjang',
				ToastAndroid.SHORT,
				ToastAndroid.BOTTOM,
				25,
				50
			);
			return;
		}
		dispatch({ type: 'EDIT_VALUE_TO_MINIM', id: idx, qty: val.qty, total: val.total });

		dispatch(ADD_CART_COUNT());
		dispatch(ADD_CART_ITEMS({ val }));
	};

	const IncreaseQtyNum = (index, value) => {
		setMenuList(
			(menu_list = menu_list.map(
				(v, i) => (v.id == index ? Object.assign(v, { qty: value, total: v.price_ea * value }) : v)
			))
		);
	};
	return (
		<ScrollView style={{ flex: 1, backgroundColor: 'white' }} showsVerticalScrollIndicator={false}>
			<View style={{ padding: 16 }}>
				<View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
					<Text style={{ fontWeight: '700', fontSize: 18.4, letterSpacing: 0.7 }}>Makanan</Text>
				</View>
				<FlatList
					data={menu_list}
					renderItem={({ item }) => (
						<ProductListing
							id={item.id}
							pos={pos}
							warung={item.warung}
							View_Single_Food={ViewSingleFood}
							AddToCardHandler={AddToOrderList}
							name={item.menu_name}
							NumHandler={IncreaseQtyNum}
							price={item.price_ea}
							qty={item.qty}
							distance={item.distance}
							item={item}
						/>
					)}
					keyExtractor={(item) => item.id}
				/>

				<View style={{ flex: 1 }}>
					<View
						style={{
							padding        : 10,
							flexDirection  : 'row',
							justifyContent : 'center',
							alignItems     : 'center'
						}}
					>
						<Text style={{ textAlign: 'center', fontWeight: '600', fontSize: 16, marginLeft: 6 }}>
							Last Updated Sun, 29 Apr 2020
						</Text>
					</View>
					<View style={{ borderBottomColor: '#2296F3', borderBottomWidth: 1 }} />
				</View>
			</View>
		</ScrollView>
	);
};
