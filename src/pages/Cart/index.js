import React, {useEffect, useState}from 'react';
import { View, Text, Image, TouchableOpacity, ScrollView, RefreshControl, Dimensions, ActivityIndicator, StatusBar } from 'react-native';

import NumericInput from 'react-native-numeric-input';
import { Icon } from 'react-native-elements';
import { TextInput } from 'react-native-gesture-handler';
import { useSelector, useDispatch } from 'react-redux';

import * as geolib from 'geolib';
import Geolocation from '@react-native-community/geolocation';
import RNAndroidLocationEnabler from 'react-native-android-location-enabler';
import Geocoder from 'react-native-geocoding';
import moment from 'moment';
import { useDarkMode } from 'react-native-dark-mode';
Geocoder.init("AIzaSyCbpEHfzwBGfdSIfbFCODyH_muffddTZvg");
import AsyncStorage from '@react-native-community/async-storage';

const Cart = (props) => {

    const { width, height } = Dimensions.get('window');
    let cart = useSelector(state => state.CART_ITEMS);
    let cart_count = useSelector(state => state.CART_COUNT);
    let c = useSelector(state => state.order_items);
    const dispatch = useDispatch();
    let [order_count, setOrderCount] = useState(0);
    let [order_items, setOrderItems] = useState([]);

    let [pos, setPos] = useState(cart.pos);
    let [meters, setMeters] = useState(0);
    let [infoLainnya, setInfoLainnya] = useState(false);
    let [refresh, setRefresh] = useState(false);
    let [alamat, setAlamat] = useState('');
    let [nama, setNama] = useState('');
    let [nohp, setHP] = useState(0);
    let [initLoading, setInitLoading] = useState(false);
    const isDarkMode = useDarkMode();
    const onRefresh = React.useCallback(() => {

        setRefresh(true);
        wait(2000).then(() => setRefresh(false))
        Geolocation.getCurrentPosition(
            (position) => {
                for(var i = 0; i < order_items.length; i++){
                    order_items[i][Object.keys(order_items[i])].warung_info.distance = geolib.getDistance(position.coords, {
                        latitude:  order_items[i][Object.keys(order_items[i])].warung_info.coords.latitude,
                        longitude:  order_items[i][Object.keys(order_items[i])].warung_info.coords.longitude,
                    })
                }
                setPos(pos = position.coords)
                dispatch({ type : 'save_pos', pos : position.coords, distance : position.coords})
            },
            (err) => {
                onRefresh();
            },
            { enableHighAccuracy: true, distanceFilter: 100, timeout: 8000 }
        )
    }, [refresh])
    
    
    useEffect(() => {
        setOrderItems(order_items = c.order_items);
        setOrderCount(order_count = cart_count);
    }, [order_count,alamat, order_items])

    const wait = (timeout) => {
        return new Promise((resolve, reject) => {
            setTimeout(resolve, timeout);
        })
    }

    const loadingSpinner = () => {
        setInitLoading(true)
        setTimeout(() => {
            setInitLoading(false);
        }, 1000);
    }

    const IncreaseQtyNum = (name,index,value) => {

        // dispatch({ type : 'CHANGE_PRICE_BY_QTY', id: index , qty : value })
        // dispatch({ type : 'CHANGE_PRICE_BY_QTY_MENU', id: index, qty : value })
        // setOrderItems(order_items = order_items.map((v,i) => (v.id == index ? Object.assign(v, { qty : value, total : v.price_ea * value }) : v)));
        setOrderItems(order_items = order_items.map((v,i) => {
            if(v[Object.keys(v)].warung_info.name === name){
                console.log('not work ?');
                v[Object.keys(v)].order_items.map((x,y) => (x.id === index ? Object.assign(x, { qty : value, total : x.price_ea * value }) : x));
            }else{
               console.log('something went wrong');
            }
            return v;
        }))
     }

     const removeItem = async (name,index) => {
         let q = order_items.some((v,i) => v[Object.keys(v)].warung_info.name === name);
         let l = order_items.filter((v,i) => v[Object.keys(v)].warung_info.name === name)[0]
         if(q){
             console.log(l[Object.keys(l)].order_items.length);
            if(l[Object.keys(l)].order_items.length < 2){
                console.log('fully removed')
                return dispatch({ type: 'remove', name : name })
            }else{
                console.log('only removed one order')
                return dispatch({ type: 'remove_order', name, id : index })
            }
         }
     }
     const RemoveCartItems = async (name, val, idx, index, id, order_id) => {
         removeItem(name, order_id);
        setOrderCount(order_count = order_count - 1);
        // setOrderItems(order_items = order_items.filter((v,i) => v.id !== idx));
        // dispatch({ type : 'remove_order', id : idx })
        dispatch({ type : 'DEC' });
        //     if(order_items[n][Object.keys(order_items[n])].order_items.length < 1) {
        //         console.log('yg ini work')
        //         setOrderItems(order_items = order_items.filter((x,y) => Object.keys(order_items[y])[0] !== name));
        //     }else{
        //         console.log('ni ga work');
        //         setOrderItems(order_items = order_items.map((v,i) => {
        //             if(Object.keys(order_items[i])[0] === name){
        //                 order_items[i][Object.keys(order_items[i])].order_items.filter((x,y) => x.id !== idx);
        //             }else{
        //                 console.log('err')
        //             }
        //             return v;
        //         }))
        //     }


        // let items = await AsyncStorage.getItem('order_items');
        // let c = await AsyncStorage.getItem('order_count');
        // let item = JSON.parse(items) || [];
        // let i_c = JSON.parse(c) || 0

        // if(!item){
        //     item = []
        // };
        // if(!i_c){
        //     i_c = 0
        // };
        
        // const check = item.some((v,i) => i === id);

        // if(check){

        //     setOrderItems(order_items = order_items.map((v,i) => {
        //         if(i === id){
        //             v[Object.keys(v)].order_items = v[Object.keys(v)].order_items.filter((x,y) => y !== index);
        //         }
        //         return v;
        //     }));

        //     setOrderItems(order_items = order_items.filter((v,i) => v[Object.keys(v)].order_items.length !== 0))

        //     item = item.map((v,i) => {
        //         if(i === id){
        //             v[Object.keys(v)].order_items = v[Object.keys(v)].order_items.filter((x,y) => y !== index);
        //         }
        //         return v;
        //     });
    
        //     item = item.filter((v,i) => v[Object.keys(v)].order_items.length !== 0);

        //     await AsyncStorage.setItem('order_items', JSON.stringify(item))
        //                     .then((res) => {
        //                         console.log('removed')
        //                     })
        //                     .catch(err => {
        //                         throw new Error(err);
        //                     });
        //                     await AsyncStorage.setItem('order_count', JSON.stringify(i_c < 1 ? 0 : i_c - 1))
        // }
      }
    //   let q = order_items.map((v,i) => order_items[i][Object.keys(order_items[i])].order_items.map((x,y) => x.total)).reduce((acc, curr) => {
    //     return acc + curr
    //  }, 0);
    //  const totalTravelDistance = order_items.map((v,i) => order_items[i][Object.keys(order_items[i])].warung_info.distance).reduce((a,c) => {
    //      return a + c;
    //  }, 0)
     const open_keterangan_field = (name, id, idx) => {
            //  setOrderItems(order_items = order_items.filter((v,i) => order_items[i][Object.keys(order_items[i])].order_items.filter((y,x) => (y.id === idx ? Object.assign(y, { is_ket_order : !y.is_ket_order }) : y) ) ) );
            // let temp = order_items.map((v,i) => Object.keys(order_items[i])[0] === name)[0];
            // console.log(temp);
            // setOrderItems(order_items = temp[name].order_items.map((v,i) => (v.id === idx ? Object.assign(v, { is_ket_order : !v.is_ket_order }) : v) ))
            // return order_items[index][Object.keys(order_items[index])].order_items.filter((v,i) => (v.id === idx ? Object.assign(v, { is_ket_order : !v.is_ket_order }) : v));
            // console.log(order_items[index][Object.keys(order_items[index])].order_items[0].is_ket_order);
          
            // let item = order_items.some((v,i) => Object.keys(order_items[i])[0] === name);
           
            // if(item){
            //     let temp_item = order_items.filter((v,i) => Object.keys(order_items[i])[0] === name)[0];
                
            //     if(temp_item[name].order_items.some((v,i) => v.id === idx)){
            //         console.log(order_items[id][name].order_items[0].is_ket_order);
            //         return setOrderItems(order_items[id][name].order_items[0].is_ket_order = !order_items[id][name].order_items[0].is_ket_order);
            //     }else{
            //         console.log('ada yg salah');
            //     }
            // }else{
            //     console.log('something went wrong');
            // }
            setOrderItems(order_items = order_items.map((v,i) => {
                if(Object.keys(order_items[i])[0] === name){
                    console.log('work')
                    order_items[i][Object.keys(order_items[i])].order_items.map((x,y) => (x.id === idx ? Object.assign(x, { is_ket_order : !x.is_ket_order }) : x));
                }else{
                    console.log('ada masalah')
                }
                return v;
            }))
        }
     const keteranganHandler = (text,idx) => {
        // setOrderItems(order_items = order_items.map((v,i) => (i === idx ? Object.assign(v, { keterangan_order : text }) : v)));
     }
     const isi_cart = {
        order_items : order_items,
        order_count : order_count,
        alamat : alamat,
        // total_payment : q + (totalTravelDistance < 1000 ? (1000 / 1000) * 2500 : (totalTravelDistance / 1000) * 2500),
        date : moment().locale('id-ID').format('DD MMMM YYYY hh:mm'),
        order_id : moment().locale('id-ID').format('DD/MM/YY') + '/' + Math.round(Math.random() * 9999),
        buyer_coords : pos
    };
	return (
    <View style={{ flex: 1, backgroundColor: isDarkMode ? '#121212' : 'white' }}>
        <StatusBar translucent barStyle={isDarkMode ? 'light-content' :'dark-content'} backgroundColor={isDarkMode ? '#18191C' : 'white'} animated />
        {
            initLoading ? (
                <View style={{ flex: 1, alignItems:'center', justifyContent:'center', backgroundColor: isDarkMode ? '#121212' : 'white '}}>
                    <ActivityIndicator color='blue' size='large'/>
                </View>
            ) : (
                <React.Fragment>
<ScrollView style={{ flex: 1, backgroundColor: isDarkMode ? '#121212' : 'white' }}
        refreshControl={
            <RefreshControl refreshing={refresh} onRefresh={onRefresh}/>
        }>
			<View style={{ padding: 16 }}>
				<View>
					<Text style={{ fontSize: 19, color: isDarkMode ? '#b1b1b1' : 'black' }}>ITEM</Text>
				</View>
                {
                    order_items.map((y, x) => order_items[x][Object.keys(order_items[x])].order_items.map((v,i) => {
                      
                            return (
                                <View style={{ paddingBottom: 7 }}>
                                <View style={{ flexDirection: 'row', margin: 4 }}>
                                    <View>
                                        <Image
                                            style={{ height: 80, width: 80, borderRadius: 10 }}
                                            source={require('../../../assets/banner/q3.png')}
                                        />
                                    </View>
                                    <View style={{ marginLeft: 10, flex:1 }}>
                                        <Text numberOfLines={1} ellipsizeMode={'tail'} style={{ fontWeight: 'bold', fontSize: 18, color: isDarkMode ? '#b1b1b1' : 'black' }}>{v.menu_name}</Text>
                                        <View style={{ margin: 4 }}>
                                            <Text style={{ color: isDarkMode ? '#b1b1b1' : 'black'}}>Rp. {v.price_ea}</Text>
                                            <Text numberOfLines={1} ellipsizeMode={'tail'} style={{ color: isDarkMode ? '#b1b1b1' : 'black' }}>| {v.warung}</Text>
                                        </View>
                                    </View>
                                    <View style={{ marginLeft: 10, justifyContent: 'center', alignItems: 'center', flex: 1 }}>
                                        <NumericInput
                                            initValue={v.qty}
                                            value={v.qty}
                                            onChange={(value) => IncreaseQtyNum(Object.keys(order_items[x])[0],v.id, value)}
                                            minValue={1}
                                            editable={true}
                                            borderColor={isDarkMode ? '#b1b1b1' : 'white'}
                                            totalHeight={34}
                                            containerStyle={{
                                                borderWidth: 1,
                                                borderRadius: 4
                                            }}
                                            textColor={isDarkMode ? 'white' : 'black'}
                                            iconSize={25}
                                            leftButtonBackgroundColor={isDarkMode ? '#b1b1b1' : 'white'}
                                            rightButtonBackgroundColor={isDarkMode ? '#b1b1b1' : 'white'}
                                            inputStyle={{
                                                borderWidth: 0,
                                                borderRadius: 4
                                            }}
                                            iconStyle={{
                                                borderWidth:0,
                                                borderRadius: 4
                                            }}
                                        />
                                        <TouchableOpacity
                                        onPress={() => RemoveCartItems(Object.keys(order_items[x])[0], v, v.id,i,x,v.id)}
                                            style={{
                                                padding         : 4,
                                                borderRadius    : 4,
                                                borderWidth     : 1,
                                                width           : 140,
                                                backgroundColor : '#d63447',
                                                justifyContent:'center',
                                                alignItems:'center',
                                                height:35
                                            }}
                                        >
                                            <Text style={{ textAlign: 'center', color: 'white' }}>HAPUS</Text>
                                        </TouchableOpacity>
                                    </View>
                                </View>
                                
                                <TouchableOpacity activeOpacity={0.5}
                                onPress={() => open_keterangan_field(Object.keys(order_items[x])[0],x,v.id)}
                                    style={{
                                        flexDirection : 'row',
                                        alignItems    : 'center',
                                        padding       : 4,
                                        borderWidth   : 1,
                                        borderRadius  : 4,
                                        borderColor:isDarkMode?'#b1b1b1' :'black'
                                    }}
                                >
                                    <Icon name='ios-add' color={isDarkMode ? '#b1b1b1' : 'black'} type='ionicon' />
                                    <Text style={{ marginLeft: 4, color: isDarkMode ? '#b1b1b1' : 'black' }}>TAMBAHKAN KETERANGAN</Text>
                                </TouchableOpacity>
                                {
                                    v.is_ket_order ?
                                <View
                                    style={{
                                        padding      : 4,
                                        borderWidth  : 1,
                                        borderRadius : 4,
                                        borderColor : isDarkMode?'#b1b1b1' :'black',
                                        backgroundColor: isDarkMode ? '#121212' :'white'
                                    }}
                                >
                                    <TextInput style={{ color: isDarkMode?'#b1b1b1' :'black' }} value={v.keterangan_order} onChangeText={(value) => keteranganHandler(value,v.id)} placeholder='Contoh : 1 bungkus tidak pakai sambel' />
                                </View>
                                 : null
                                }
                                
                            </View>
                            )
                        })
                    )
                }
			</View>

			<View style={{ height: 12, backgroundColor: '#F2F2F4', opacity: isDarkMode ? 0.2 : 1 }} />
			<View style={{ padding: 16 }}>
				<View>
					<Text style={{ fontSize: 19, color: isDarkMode?'#b1b1b1' :'black' }}>Alamat Tujuan</Text>
				</View>
				<View style={{ margin: 8 }}>
					<View style={{ padding: 4 }}>
						<View style={{ flexDirection: 'row' }}>
							<Text style={{ color: isDarkMode?'#b1b1b1' :'black' }}>Alamat Lengkap</Text>
						</View>
						<View style={{ margin: 2, borderRadius: 4, borderWidth: 1, borderColor: isDarkMode?'#b1b1b1' :'blue' , marginTop: 4 }}>
							<TextInput
                            value={alamat}
                            onChangeText={(value) => setAlamat(alamat = value)}
								multiline={true}
								numberOfLines={4}
								style={{ height: 60, color: isDarkMode?'#b1b1b1' :'black' }}
                                placeholder='Jalan Santi Murni, Kec. Sambutan, Kel.Sungai Kapih, Blok D No.510, RT 14 , Samarinda'
                                placeholderTextColor={isDarkMode ? '#b1b1b1' : 'silver'}
							/>
						</View>
						<View style={{ marginTop: 5 }}>
							<View style={{ flexDirection: 'row' }}>
                            <View style={{ padding: 4}}>

                            <Text style={{ color: isDarkMode?'#b1b1b1' :'black'}}>Layanan Lokasi Perangkat</Text>
                            </View>
                                <View style={{ padding: 4 , borderWidth: 1,borderColor: isDarkMode ? '#b1b1b1' : 'blue', backgroundColor: isDarkMode ? '#b1b1b1' : 'blue', flexDirection:'row', alignItems:'center', justifyContent:'center', borderRadius: 4}}>
                                    
							<Icon name='ios-checkmark-circle-outline' color='white' type='ionicon' />
                                    <Text style={{color:'white', marginLeft: 4}}>Telah Aktif</Text>
                                </View>
                                <TouchableOpacity onPress={() => props.navigation.navigate('Maps', { currLocation : pos })} style={{ padding: 4 , borderWidth: 1,borderColor: isDarkMode ? '#b1b1b1' : 'blue', flexDirection:'row', alignItems:'center', justifyContent:'center', borderRadius: 4, marginLeft: 4}}>
                                    
							<Icon name='ios-pin' color={isDarkMode ? '#b1b1b1' : 'blue'} type='ionicon' />
                                    <Text style={{color: isDarkMode ? '#b1b1b1' : 'white', marginLeft: 4}}>Lihat Maps</Text>
                                </TouchableOpacity>
							</View>
						</View>
                        {
                            order_items.map((v, i) => {
                                return (
                                <View style={{ padding: 5, borderRadius: 4, borderWidth: 1, borderColor: isDarkMode ? '#b1b1b1' : 'blue', marginTop: 6}}>
                                    <Text style={{ color:isDarkMode ? '#b1b1b1' : 'black'}}>Jarak-mu terhadap {order_items[i][Object.keys(order_items[i])].warung_info.name} adalah {order_items[i][Object.keys(order_items[i])].warung_info.distance || 0} meter atau {(order_items[i][Object.keys(order_items[i])].warung_info.distance / 1000).toFixed(2) || 0} km</Text>
                                </View>
                                   
                                )
                            })
                        }
                        
					</View>
				</View>
			</View>
			<View style={{ height: 12, backgroundColor: '#F2F2F4', opacity: isDarkMode ? 0.2 : 1 }} />
			<View style={{ padding: 16, flex: 1 }}>
				<View>
					<Text style={{ fontSize: 19, color: isDarkMode ? '#b1b1b1' : 'black' }}>Informasi Penerima</Text>
				</View>
				<View style={{ margin: 8 }}>
					<View style={{ padding: 4 }}>
						<View style={{ flexDirection: 'row' }}>
							<Text style={{ color: isDarkMode ? '#b1b1b1' : 'black'}}>Nama Lengkap</Text>
						</View>
						<View style={{ margin: 2, borderRadius: 4, borderWidth: 1, borderColor: isDarkMode ? '#b1b1b1' : 'blue', marginTop: 4 }}>
							<TextInput
                            onChangeText={(value) => setNama(nama = value)}
                            value={nama}
								multiline={true}
								numberOfLines={4}
								style={{ height: 40, color: isDarkMode ? '#b1b1b1' : 'black' }}
                                placeholder='Mada Dwi Nugraha'
                                placeholderTextColor={isDarkMode ? '#b1b1b1' : 'black'}
							/>
						</View>
						<View style={{ flexDirection: 'row', marginTop: 5 }}>
							<Text style={{ color: isDarkMode ? '#b1b1b1' : 'black' }}>Nomor Handphone</Text>
						</View>
						<View style={{ margin: 2, borderRadius: 4, borderWidth: 1, borderColor: isDarkMode ? '#b1b1b1' : 'blue', marginTop: 4 }}>
							<TextInput
                            keyboardType='number-pad'
                            onChangeText={(value) => setHP(nohp = value)}
                            value={nohp}
								multiline={true}
								numberOfLines={4}
								style={{ height: 40, color: isDarkMode ? '#b1b1b1' : 'black' }}
                                placeholder='08125838123'
                                placeholderTextColor={isDarkMode ? '#b1b1b1' : 'black'}
							/>
						</View>
					</View>
				</View>
			</View>

			<View style={{ height: 12, backgroundColor: '#F2F2F4', opacity: isDarkMode ? 0.2 : 1 }} />
			<View style={{ padding: 16, flex: 1 }}>
				<View>
					<Text style={{ fontSize: 19, color: isDarkMode ? '#b1b1b1' : 'black' }}>Detail Pesanan</Text>
				</View>
				<View style={{ margin: 8 }}>
					<View>
						<Text style={{ fontSize: 16, fontWeight: 'bold', color: isDarkMode ? '#b1b1b1' : 'black' }}>Nama Pesanan</Text>
						<View style={{ margin: 4 }}>
                            {
                                order_items.map((y, x) => y[Object.keys(y)].order_items.map((v,i) => {
                                        return (
                                            <View style={{ justifyContent: 'space-between', flexDirection: 'row' }}>
                                            <Text numberOfLines={2} ellipsizeMode='tail' style={{ fontSize: 15, color: isDarkMode ? '#b1b1b1' : 'black' }}>{v.menu_name.length > 25 ? v.menu_name.slice(0,25) + '...' : v.menu_name}</Text>
                                            <Text style={{ color: isDarkMode ? '#b1b1b1' : 'black' }}>{v.qty} ea x Rp.{v.price_ea},-</Text>
                                        </View>
                                        )
                                    })
                                )
                            }
						</View>
						<View>
                        <Text style={{ fontSize: 16, fontWeight: 'bold', color: isDarkMode ? '#b1b1b1' : 'black' }}>Ongkir</Text>
						<View style={{ margin: 4 }}>
                            {
                                order_items.map((v, i) => {
                                    return (
                                        <View style={{ justifyContent: 'space-between', flexDirection: 'row' }}>
                                        <Text numberOfLines={2} ellipsizeMode='tail' style={{ fontSize: 15, color: isDarkMode ? '#b1b1b1' : 'black' }}>{v[Object.keys(v)].warung_info.name.length > 26 ? v[Object.keys(v)].warung_info.name.slice(0,26) + '...' : v[Object.keys(v)].warung_info.name}</Text>
                                        <Text style={{ color: isDarkMode ? '#b1b1b1' : 'black' }}>Rp. {(v[Object.keys(v)].warung_info.distance < 1000 ? (1000 / 1000) * 2500 : parseInt((Math.round(v[Object.keys(v)].warung_info.distance / 1000)) * 2500))},-</Text>
                                    </View>
                                    )
                                })
                            }
						</View>
                        </View>
                        <View>
                        <Text style={{ fontSize: 16, fontWeight: 'bold', color: isDarkMode ? '#b1b1b1' : 'black' }}>Estimasi Waktu Pengiriman</Text>
						<View style={{ margin: 4 }}>
                            {
                                order_items.map((v, i) => {
                                    return (
                                        <View style={{ justifyContent: 'space-between', flexDirection: 'row' }}>
                                        <Text numberOfLines={2} ellipsizeMode='tail' style={{ fontSize: 15,color: isDarkMode ? '#b1b1b1' : 'black' }}>{v[Object.keys(v)].warung_info.name.length > 26 ? v[Object.keys(v)].warung_info.name.slice(0,26) + '...' : v[Object.keys(v)].warung_info.name}</Text>
                                        <Text style={{ color: isDarkMode ? '#b1b1b1' : 'black' }}>{Math.round(((v[Object.keys(v)].warung_info.distance / 1000) / 33.3 * 60)) || 0} ~ {Math.round(((v[Object.keys(v)].warung_info.distance / 1000) / 33.3 * 60 + 4)) || 0} Menit</Text>
                                    </View>
                                    )
                                })
                            }
						</View>
                        </View>
                        <View>
                        <Text style={{ fontSize: 16, fontWeight: 'bold', color: isDarkMode ? '#b1b1b1' : 'black' }}>Total Pembayaran</Text>
						<View style={{ margin: 4 }}>
                            {/* {
                                order_items.map((x, i) => x[Object.keys(x)].order_items.map((v,y) => {
                                        return (
                                            <View style={{ justifyContent: 'space-between', flexDirection: 'row' }}>
                                            <Text numberOfLines={2} ellipsizeMode='tail' style={{ fontSize: 15, color: isDarkMode ? '#b1b1b1' : 'black' }}>{v.warung}</Text>
                                            <Text style={{color: isDarkMode ? '#b1b1b1' : 'black'}}>Rp.{v.total + (v[Object.keys(v)].warung_info.distance < 1000 ? (1000 / 1000) * 2500 : (v[Object.keys(v)].warung_info.distance / 1000) * 2500) || 0},-</Text>
                                        </View>
                                        )
                                    })
                                )
                            } */}
                            {
                                order_items.map((v,i) => {
                                    return (
                                    <View style={{ justifyContent: 'space-between', flexDirection: 'row' }}>
                                        <Text numberOfLines={2} ellipsizeMode='tail' style={{ fontSize: 15, color: isDarkMode ? '#b1b1b1' : 'black' }}>{v[Object.keys(v)].warung_info.name}</Text>
                                        <Text style={{color: isDarkMode ? '#b1b1b1' : 'black'}}>Rp.{v[Object.keys(v)].order_items.map((x,y) => x.total).reduce((a,c) => { return a + c }, 0) + (v[Object.keys(v)].warung_info.distance < 1000 ? (1000 / 1000) * 2500 : parseInt((Math.round(v[Object.keys(v)].warung_info.distance / 1000)) * 2500)) || 0},-</Text>
                                    </View>
                                    )
                                })
                            }
						</View>
                        </View>
						
					</View>
				</View>
			</View>
            
			<View style={{ height: 12, backgroundColor: '#F2F2F4', opacity: isDarkMode ? 0.2 : 1 }} />
            <View style={{ padding: 16, flex: 1}}>
                <View style={{ flexDirection:'row'}}> 
                    <Text style={{ fontSize: 19, color: isDarkMode ? '#b1b1b1' : 'black' }}>Informasi Lainnya</Text>
                    <TouchableOpacity onPress={() => setInfoLainnya(infoLainnya = !infoLainnya)} style={{ marginLeft: 4}}>
                         <Icon name={infoLainnya ? 'ios-arrow-dropup' : 'ios-arrow-dropdown'} type='ionicon' color={isDarkMode ? '#b1b1b1' : 'black'}/>
                    </TouchableOpacity>
                </View>
                {
                    infoLainnya ? 
                    <View style={{ padding: 7, borderWidth: 1,borderColor:isDarkMode ? '#b1b1b1' : 'blue', borderRadius:4, marginTop: 5}}>
                    <View style={{ padding: 4 }}>
                    <Text style={{ fontSize: 16,lineHeight : 20,textAlign  : 'justify', color: isDarkMode ? '#b1b1b1' : 'black'}}>{order_count > 1 ? 'Karena kamu memesan lebih dari 1 warung, maka masing-masing pihak warung akan mengirimkan pesanan mereka kepada Kamu.' : 'Kamu mengorder '+order_items[0][Object.keys(order_items[0])].order_items[0].menu_name+' dari '+order_items[0][Object.keys(order_items[0])].warung_info.name+', setelahnya pihak '+order_items[0][Object.keys(order_items[0])].warung_info.name+' akan mengirimkan pesanan mereka kepada kamu.'}</Text>
                    </View>
                    <View style={{ padding: 4, marginTop: 20}}>
                    <Text style={{ fontSize: 16,lineHeight : 20,textAlign  : 'justify', color: isDarkMode ? '#b1b1b1' : 'black'}}>Ongkir sudah termasuk di Total Pembayaran yang dikenakan biaya 2500 Rupiah per kilometer.</Text>
                    </View>
                    <View style={{ padding: 4, marginTop: 20}}>
                    <Text style={{ fontSize: 16,lineHeight : 20,textAlign  : 'justify', color: isDarkMode ? '#b1b1b1' : 'black'}}>Pembayaran ditujukan untuk {order_count > 1 ? 'masing masing warung ' : order_items[0][Object.keys(order_items[0])].warung_info.name} dan pembayaran ditempat atau COD  </Text>
                    </View>
                </View>
                : null
                }
                
            </View>
		</ScrollView>
        {
            refresh ? (
                <View style={{ justifyContent:'flex-end', margin: 12, alignItems:'center'  }}>
                    <ActivityIndicator color='blue' size='large'/>
                </View>
            ) : (
                <React.Fragment>
                    <View style={{ justifyContent:'flex-end', margin: 12, alignItems:'center' }}>
                        <View style={{ padding: 16,  flexDirection:'row',height: 50, alignItems:'center', backgroundColor:isDarkMode ? '#121212' :'white'}}>
                            <TouchableOpacity disabled={nohp === '' || alamat === '' || nama === '' ? true : false} onPress={() => props.navigation.navigate('Checkout', { checkoutItems : isi_cart })} style={{ margin: 6,padding: 6, height: 40, width: (width - 16 * 2) - 40,borderRadius: 5, justifyContent:"center",alignItems:'center', backgroundColor: nohp === '' || alamat === '' || nama === '' ? 'red' : '#2296F3'}}>
                                <Text style={{ color:'white'}}>BAYAR</Text>
                            </TouchableOpacity>
                        <TouchableOpacity onPress={() => console.log('nothing will happens here')} style={{ margin: 6,padding: 6, height: 40, width: 40, borderRadius: 5, borderWidth: 1, justifyContent:"center",alignItems:'center', borderColor: '#2296F3'}}>
                            <Icon name='ios-more' color={isDarkMode ? 'white' : 'blue'} type='ionicon'/>
                        </TouchableOpacity>
                        </View>
                    </View>
                </React.Fragment>
            )
        }
                </React.Fragment>
            )
        }
     </View>
	);
};

export default Cart;
