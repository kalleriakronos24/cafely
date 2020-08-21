import React , { useEffect, useState } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    TextInput,
    ScrollView,
    addons,
    Dimensions,
    ActivityIndicator,
    StatusBar,
    Image,
    ToastAndroid
} from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { CheckBox } from 'react-native-elements'
import { ADD_CART_COUNT, ADD_CART_ITEMS, DEC_CART_COUNT, REMOVE } from '../../Redux/actions/action';
import Swiper from 'react-native-swiper';
import { Icon } from 'react-native-elements';
import Modal from 'react-native-modal';
import ImagePlacebo from '../../components/ImagePlaceholder';
const FoodSingle = (props) => {
    
    let view = useSelector(state => state.CART_ITEMS);
    const p = view.VIEW_SINGLE.q.val;
    const CART_COUNT = useSelector(state => state.CART_COUNT);
    let [modalHide, setModalHide] = useState(false);
    let [warnText, setWarnText] = useState('');
    const is_added_to_cart = p.deleted_from_cart;
    const date = new Date();
    let dispatch = useDispatch();
    let [images] = useState([
        "https://source.unsplash.com/1024x768/?food",
        "https://source.unsplash.com/1024x768/?water",
        "https://source.unsplash.com/1024x768/?tree"// Network image
    ])
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
    useEffect(() => {
    }, [])

     

    const AddToOrderList = (val,idx) => {

        if(view.CART_ITEMS.some((v, i) => v.id === val.id)){
            ToastAndroid.showWithGravity(val.menu_name+' sudah ada di keranjang', ToastAndroid.SHORT, ToastAndroid.BOTTOM, 1000, 1000)
            return
        }
        dispatch({ type : 'EDIT_VALUE_TO_MINIM', id : idx, qty : val.qty, total : val.total  })
        dispatch(ADD_CART_COUNT());
        dispatch(ADD_CART_ITEMS({ val }));
 }

    let { width, height } = Dimensions.get('window');
   
    return (
        <View style={{ flex: 1, backgroundColor:'white' }}>
           <StatusBar translucent barStyle='light-content' backgroundColor='rgba(0,0,0,0.251)' animated />
<ScrollView style={{ flex: 1}}>

<View style={{ height: 17, backgroundColor: '#F2F2F4' }} />

    <Swiper style={{
        height: 350,
        borderRadius: 4
    }} showsButtons={false}>
        {
            images.map((v,i) => {
                return(
                <View style={{ paddingBottom: 16,borderRadius: 4}}>
                    <Image PlaceholderContent={<ImagePlacebo/>} style={{ height:'100%', width:'100%'}} source={{ uri : v }}/>
                </View>
                )
            })
        }
    </Swiper>
                <View style={{ flex: 1, paddingTop: 15}}>
                        <View style={{ padding: 16 }}>
                                <Text ellipsizeMode={'tail'} numberOfLines={1} style={{ textTransform:'capitalize',fontSize: 20, fontWeight: 'bold'}}>{p.menu_name}</Text>
                                <View style={{ padding: 10 }}>
                                        <Text>asdjsakdjaksjdaksdjaksdjaskdjaskdjasdkjadkjasdkjaskdjaskdjaksjdkasjdkjasdkjasdkjaskdjasdkj</Text>
                                </View>
                            <View style={{ padding: 7 }}>
                                        <Text style={{ fontSize: 17 }}>Tambahan Lainnya</Text>
                                        <View style={{ flexDirection: 'row', justifyContent: 'space-between'}}>
                                            <CheckBox
                                            containerStyle={{
                                                backgroundColor: 'none',
                                                borderWidth: 0
                                            }}
                                            checked={true}
                                            title="Sambel"
                                            />

                                            <CheckBox
                                            containerStyle={{
                                                backgroundColor: 'none',
                                                borderWidth: 0
                                            }}
                                            checked={true}
                                            title="Serondeng Kelapa"
                                            />
                                        </View>

                                        <View style={{ flexDirection: 'row', justifyContent: 'space-between'}}>
                                            <CheckBox
                                            containerStyle={{
                                                backgroundColor: 'none',
                                                borderWidth: 0
                                            }}
                                            checked={true}
                                            title="Sambel Goreng Tempe"
                                            />
                                           
                                        </View>
                            </View>
                                <View style={{ padding: 7}}>
                                <Text style={{ fontSize: 17 }}>Harga </Text>

                                <View style={{ marginTop: 5}}>

                                    <Text>Rp.{p.price_ea},-</Text>
                                </View>

                                </View>

                                <View style={{ padding: 7}}>
                                <Text style={{ fontSize: 17 }}>Alamat Warung </Text>

                                <View style={{ marginTop: 5}}>

                                    <Text>Jalan Santi Murni</Text>
                                </View>

                                </View>
   
                        </View>
                </View>
               
					<View style={{ height: 17, backgroundColor: '#F2F2F4', marginTop: 20 }} />
                <View style={{ flex: 1, padding: 16}}>
                    <View style={{ justifyContent:'space-between', flexDirection:'row'}}>
                        <Text style={{ fontSize: 17}}>Masakan Lainnya Dari Warung Ini</Text>
                        <Icon name='ios-list' type='ionicon' color='blue' />
                    </View>
                    <View style={{ marginTop: 10}}>
                    <ScrollView horizontal={true} style={{ flexDirection: 'row' }} showsHorizontalScrollIndicator={false}>
					{menu_list.map((v, i) => {
						return (
							<TouchableOpacity onPress={() => ViewSingleFood(v, i)} style={{ marginHorizontal: 16 }}>
								<View
									style={{
										borderRadius : 8,
										width        : width < 410 ? 170 : 240,
										height       : width < 410 ? 170 : 240,
										position     : 'relative'
									}}
								>
									<Image resizeMod='cover'
										style={{
                                            
											borderRadius : 8,
                                            resizeMode   : 'stretch',
                                            flex: 1
										}}
										source={{ uri: images[Math.floor(Math.random() * images.length)] }}
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
											fontSize   : width < 410 ? 15 : 18,
											fontWeight : 'bold',
											marginTop  : 14,
											color      : 'white'
										}}
									>
										{v.menu_name}
									</Text>
									<Text style={{ marginTop: 2, fontSize: width < 410 ? 14 : 17, color: 'white' }}>
										Rp.{v.price_ea},-
									</Text>
								</View>
							</TouchableOpacity>
						);
					})}
				</ScrollView>
                    </View>
                    <View style={{ flex: 1 }}>
						<View
							style={{
								padding        : 10,
								flexDirection  : 'row',
								justifyContent : 'center',
								alignItems     : 'center'
							}}
						>
							<Icon name='ios-list' type='ionicon' color='blue' />
							<Text style={{ textAlign: 'center', fontWeight: '600', fontSize: 16, marginLeft: 6 }}>
								See More
							</Text>
						</View>
						<View style={{ borderBottomColor: '#2296F3', borderBottomWidth: 1 }} />
					</View>
                </View>
                
					<View style={{ height: 17, backgroundColor: '#F2F2F4' }} />
                <View style={{ flex: 1, padding: 16}}>
                    <View>
                        <Text style={{ fontSize: 17 }}>Tentang {p.warung}</Text>
                    </View>
                    <View style={{ padding: 16, flexDirection: 'row' }}>
                        <View style={{ borderRadius: 4}}>
                            <Image style={{ height: 75, width: 75,borderRadius: 5}} source={require('../../../assets/banner/q3.png')} resizeMode='cover'/>
                        </View>
                        <View style={{ marginLeft: 10, flexDirection:'column'}}>
                            <View>
                            <Text style={{ fontSize: 16,fontWeight:'bold'}}>{p.warung}</Text>
                            </View>
                            <View style={{ padding: 4 }}>
                            <Text>{p.pemilik}</Text>
                            <View style={{ flexDirection:'row'}}>
                            <Icon name="ios-pin" type="ionicon" color="blue"/>
                            <Text style={{ marginLeft: 4}}>Samarinda</Text>
                            </View>
                            </View>
                        </View>
                        <View style={{ flexDirection:'row',flex: 1,justifyContent:'space-between'}}>
                            <Text/>
                            <View style={{ padding: 4, borderRadius: 4, borderColor:'blue', borderWidth: 1, justifyContent:'center', alignItems:'center', height: 40, width: 40}}>
                        
						<Icon name='ios-bookmark' color='blue' type='ionicon' />
                            </View>
                        </View>
                        
                    </View>
                    <View>
					<Text style={{ textAlign: 'center', fontSize: 11.7 }}>
						Stay up-to-date with local food and drink by getting lists of posts you may like
					</Text>
					<View style={{ borderWidth: 1, borderColor: '#2296F3', marginTop: 4 }} />
                    <View style={{ justifyContent:'space-between', flexDirection:'row', marginHorizontal: 25}}>
                    <TouchableOpacity activeOpacity={0.45}
                        style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginTop: 5 }}
                        onPress={() => props.navigation.navigate('View_Warung')}
					>
						<Icon name='ios-open' color='blue' type='ionicon' />
						<Text style={{ marginLeft: 6, textAlign: 'center', fontSize: 14 }}>Lihat Profil Warung</Text>
					</TouchableOpacity>
                    <View
						style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginTop: 5 }}
					>
						<Icon name='ios-notifications' color='blue' type='ionicon' />
						<Text style={{ marginLeft: 6, textAlign: 'center', fontSize: 14 }}>Keep Me Updated</Text>
					</View>
                    </View>
					
				</View>
                </View>

                </ScrollView>
                <View style={{ justifyContent:'flex-end', margin: 12, alignItems:'center'}}>
                   <View style={{ padding: 16,  flexDirection:'row',height: 50, alignItems:'center'}}>
                            
                            <TouchableOpacity onPress={() => AddToOrderList(p,p.id)} style={{ borderColor:'#2296F3',margin: 6,padding: 6, height: 40, width: width - (16 * 2) - (12* 2) - 50,borderRadius: 5, borderWidth: 1, justifyContent:"center",alignItems:'center', backgroundColor:'#2296F3'}}>
                                    <Text style={{ color:'white'}}>ORDER</Text>
                            </TouchableOpacity>
                            <View style={{ margin: 6,padding: 6, height: 40, width: 40,borderRadius: 5, borderWidth: 1, justifyContent:"center",alignItems:'center', borderColor: '#2296F3'}}>
                                <Icon name='ios-more' color='blue' type='ionicon'/>
                            </View>
                   </View>
                </View>
        </View>
    )
}

export default FoodSingle;