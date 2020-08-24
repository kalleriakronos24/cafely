// modules
import React, { Component, useEffect, useState, useRef, forwardRef } from 'react'
import { View, Text, ToastAndroid, Image, ScrollView, TouchableOpacity, FlatList, RefreshControl, Dimensions, PermissionsAndroid, StatusBar, ActivityIndicator } from 'react-native';
import NumericInput from 'react-native-numeric-input';
import { Checkout } from '../Maps/index';
import { Icon } from 'react-native-elements';
import { useSelector, useDispatch } from 'react-redux';
import { ADD_CART_COUNT, ADD_CART_ITEMS, VIEW_SINGLE } from '../../Redux/actions/action';
import Modal from 'react-native-modal';
import Footer from '../../../src/components/Footer/index';
import * as geolib from 'geolib';
import Geolocation from '@react-native-community/geolocation';
import AsyncStorage from '@react-native-community/async-storage';
import RNAndroidLocationEnabler from 'react-native-android-location-enabler';
import Geocoder from 'react-native-geocoding';
import { useCombinedRefs } from '../../config/utils/combined_ref';
import { Modalize } from 'react-native-modalize';
import { useDarkMode } from 'react-native-dark-mode';
import Carousel from 'react-native-snap-carousel';
import moment from 'moment';
Geocoder.init("AIzaSyCbpEHfzwBGfdSIfbFCODyH_muffddTZvg");


// global vars
var global_props;
var location_service;
var ok_button;


/**
 * @description Carousel's Render Component
 * @param props any:
 */
const RenderCarouselItem = (props) => {

    const dateTo = moment('2020-11-10');
    const now = moment();

    let duration = moment.duration(dateTo.diff(now));
    let [day, setDay] = useState('00')
    let [hour, setHour] = useState('00')
    let [min, setMin] = useState('00')
    let [sec, setSec] = useState('00')

    const updateTime = () => {
        const x = setInterval(() => {
            if (duration < 0)
                clearInterval(x)

            duration = duration.subtract(1, 's');
            const days = duration.days();
            const hrs = duration.hours();
            const mins = duration.minutes();
            const secs = duration.seconds();

            setDay(days)
            setHour(hrs)
            setMin(mins)
            setSec(secs)
        }, 1000)
    }
    useEffect(() => {
        updateTime();
    }, [duration])

    return (
        <View style={{ height: 220, padding: 16 }}>
            <View style={{
                position: 'relative',
                flex: 1,
                overflow: 'hidden'
            }}>

                <Image source={require('../../../assets/banner/q3.png')}
                    style={{ borderRadius: 7, alignSelf: 'stretch', width: '100%', flex: 1, height: 220 }}
                />
                <View
                    style={{
                        width: '100%',
                        height: '100%',
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        backgroundColor: 'black',
                        opacity: 0.2,
                        borderRadius: 7
                    }}
                />
                <View
                    style={{
                        paddingBottom: 15,
                        position: 'absolute',
                        bottom: 0,
                        left: 0,
                        width: '100%',
                        flexDirection: 'row',
                        alignItems: 'center',
                        paddingHorizontal: 16
                    }}
                >
                    <View>
                        <Text
                            style={{
                                color: 'white',
                                fontSize: 20,
                                fontWeight: 'bold',
                                marginBottom: 6
                            }}
                        >
                            10% off of wut (test)
                        </Text>
                        <Text style={{ color: 'white', fontSize: 15 }}>
                            Day {day} : Hour {hour} : Min {min} : Sec {sec}
                        </Text>
                    </View>
                </View>
            </View>
        </View>
    )
}

/**
 * @description Modal to enable location | Show and Hide
 * @param props and forwarded ref's
 */
const EnableLocationModal = forwardRef((_, ref) => {

    const modalRef = useRef(null);
    const combinedRef = useCombinedRefs(ref, modalRef);
    const [toggle, setToggle] = useState(false);

    const handleClose = () => {
        if (combinedRef.current) {
            combinedRef.current.close();
        }
    }
    useEffect(() => {
    })

    const modalContent = () => {

        const GetCurrentLocation = e => {

            RNAndroidLocationEnabler.promptForEnableLocationIfNeeded({ interval: 10000, fastInterval: 10000 })
                .then(data => {
                    console.log(data);
                    setToggle(true);
                    _.refresh_state();
                    handleClose();
                    // The user has accepted to enable the location services
                    // data can be :
                    //  - "already-enabled" if the location services has been already enabled
                    //  - "enabled" if user has clicked on OK button in the popup

                }).catch(err => {
                    combinedRef.current.open();
                    // The user has not accepted to enable the location services or something went wrong during the process
                    // "err" : { "code" : "ERR00|ERR01|ERR02", "message" : "message"}
                    // codes : 
                    //  - ERR00 : The user has clicked on Cancel button in the popup
                    //  - ERR01 : If the Settings change are unavailable
                    //  - ERR02 : If the popup has failed to open
                    console.log(err);
                });
        }

        return (
            <View style={{ padding: 16, backgroundColor: 'white' }}>
                <TouchableOpacity onPress={() => handleClose()} style={{ alignItems: 'flex-start' }}>
                    <Icon name='ios-close' size={37} type='ionicon' />
                </TouchableOpacity>
                <View style={{ padding: 10, justifyContent: 'center', alignItem: 'center' }}>
                    <View style={{ height: 180, borderRadius: 4 }}>
                        <Image style={{ resizeMode: 'cover', width: '100%', height: '100%', borderRadius: 4 }} source={require('../../../assets/banner/q3.png')} />
                    </View>
                    <View style={{ padding: 10 }}>
                        <Text style={{ fontSize: 18, textAlign: 'center', fontWeight: '500', letterSpacing: 0.6 }}>Nyalakan Layanan Lokasi Perangkat untuk memudahkan kami dalam bekerja :)</Text>
                    </View>
                    <TouchableOpacity activeOpacity={0.74} onPress={() => GetCurrentLocation()} style={{ backgroundColor: '#2296F3', padding: 4, borderWidth: 1, borderColor: '#2296F3', borderRadius: 4, justifyContent: 'center', alignItems: 'center', height: 40, marginTop: 8 }}>
                        <Text style={{ fontSize: 16, fontWeight: 'bold', color: 'white' }}>Aktifkan</Text>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }
    const check = true;
    return (
        <Modalize ref={combinedRef} adjustToContentHeight={true} onClose={() => toggle ? console.log('t') : global_props.navigate('Home')}>
            {modalContent()}
        </Modalize>
    )
})

/**
 * @description FlatList's Render Component
 * @param {*} Object
 */
const ProductListing = ({ View_Single_Food, distance, name, id, warung, NumHandler, price, AddToCardHandler, qty, pos, item }) => {

    const isDarkMode = useDarkMode();
    return pos === 0 ? null : (
        <View style={{ padding: 16 }}>
            <View style={{ flexDirection: 'row' }}>
                <TouchableOpacity onPress={() => View_Single_Food(item, id)} style={{ borderRadius: 10 }}>
                    <Image style={{ height: 187, width: 187, borderRadius: 10 }} source={require('../../../assets/banner/q3.png')} />
                </TouchableOpacity>
                <View style={{ marginLeft: 16, flex: 1 }}>
                    <Text numberOfLines={2} ellipsizeMode={'tail'} style={{ fontSize: 20, fontWeight: 'bold', fontFamily: 'Roboto', textTransform: 'capitalize', color: isDarkMode ? '#b1b1b1' : 'black' }}>{name}</Text>
                    <View style={{ padding: 4 }}>
                        <Text numberOfLines={2} ellipsizeMode={'tail'} style={{ fontSize: 15, marginTop: 5, color: isDarkMode ? '#b1b1b1' : 'black' }}>wqeqweqweqweqweqwewqeqweqweqwewqeqwewqe</Text>
                        <Text numberOfLines={1} ellipsizeMode={'tail'} style={{ fontSize: 15, marginTop: 3, textTransform: 'capitalize', color: isDarkMode ? '#b1b1b1' : 'black' }}>| {warung}</Text>
                        <View style={{ flexDirection: 'row' }}>

                            <Text style={{ fontSize: 15, marginTop: 3, color: isDarkMode ? '#b1b1b1' : 'black' }}>~ </Text>
                            <Icon name='ios-pin' color={isDarkMode ? '#b1b1b1' : 'blue'} style={{ height: 10, width: 10 }} type='ionicon' />
                            <Text style={{ fontSize: 15, marginTop: 3, color: isDarkMode ? '#b1b1b1' : 'black' }}> {(distance / 1000).toFixed(2) || 0} km </Text>
                        </View>
                    </View>
                </View>
            </View>


            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 10, alignItems: 'center' }}>
                <Text style={{ paddingLeft: 16, fontSize: 20, fontWeight: 'bold', color: isDarkMode ? '#b1b1b1' : 'black' }}>Rp. {price},-</Text>
                <TouchableOpacity onPress={() => AddToCardHandler(item, id)} style={{ backgroundColor: '#2296F3', width: '35%', height: 32, borderRadius: 4, paddingHorizontal: 12, paddingVertical: 11, alignSelf: 'flex-end', alignItems: 'center', justifyContent: 'center' }}>

                    <Text style={{ fontSize: 14, color: 'white' }}>ORDER</Text>


                </TouchableOpacity>
            </View>

            <View style={{ paddingBottom: 20, borderBottomColor: '#2296F3', borderBottomWidth: 1 }}></View>

        </View>
    )
}

/**
 * @description primary function of this file 
 * @param {*} props 
 */
export const Buy = (props) => {

    const modals = Array.from({ length: 1 }).map(_ => useRef(null).current);
    const CART_COUNT = useSelector(state => state.CART_COUNT);
    const CART_ITEMS = useSelector(state => state.CART_ITEMS);
    const c = useSelector(state => state.order_items);
    const currentPos = CART_ITEMS.pos;
    const dispatch = useDispatch();
    let [pos, setPos] = useState(0);
    let { width, height } = Dimensions.get('window');
    let [
        menu_list,
        setMenuList
    ] = useState([
        {
            id: 1,
            menu_name: 'Kerikil ABCQWEQWEWQEQWEWQE',
            price_ea: 8000,
            qty: 1,
            total: 8000,
            deleted_from_cart: false,
            distance: 0,
            warung: 'Warung Makan Bu UDIN',
            coords: {
                latitude: -0.5240333,
                longitude: 117.1711636
            },
            is_ket_order: false,
            keterangan_order: '',
        }, {
            id: 4,
            menu_name: 'Kerikil ABCQWEQWEWQEQWEWQE',
            price_ea: 8000,
            qty: 1,
            total: 8000,
            deleted_from_cart: false,
            distance: 0,
            warung: 'Warung Makan Bu UDIN',
            coords: {
                latitude: -0.5240333,
                longitude: 117.1711636
            },
            is_ket_order: false,
            keterangan_order: '',
        },
        {
            id: 2,
            menu_name: 'Kerikil ABCD',
            price_ea: 8000,
            qty: 1,
            total: 8000,
            deleted_from_cart: false,
            warung: 'Warung Makan Bu UDIN 2',
            distance: 0,
            coords: {
                latitude: -0.5225474,
                longitude: 117.1694158
            },
            is_ket_order: false,
            keterangan_order: '',
        }, {
            id: 3,
            menu_name: 'Kerikil ABCDE',
            price_ea: 8000,
            qty: 1,
            total: 8000,
            deleted_from_cart: false,
            warung: 'Warung Makan Bu UDIN 3',
            distance: 0,
            coords: {
                latitude: -0.5249333,
                longitude: 117.1767636
            },
            is_ket_order: false,
            keterangan_order: '',
            courier: {
                courier_id: Math.random() * 20,
                name: 'Mada Nugraha',
                courier_of: 'Warung Makan Bu UDIN 3',
                status: false
            }
        }
    ]);

    let [refresh, setRefresh] = useState(false);
    let timerComponents = [];
    useEffect(() => {

        global_props = props.navigation;

        if (pos === 0) {
            onRefresh();
        }


    }, [pos, menu_list]);

    const onRefresh = React.useCallback(() => {
        setRefresh(true);
        Geolocation.getCurrentPosition(
            (position) => {
                for (var i = 0; i < menu_list.length; i++) {
                    menu_list[i].distance = geolib.getDistance(position.coords, {
                        latitude: menu_list[i].coords.latitude,
                        longitude: menu_list[i].coords.longitude,
                    })
                }
                location_service = true;
                console.log(position.coords)
                setPos(pos = position.coords)

                setRefresh(false)
                dispatch({ type: 'save_pos', pos: position.coords, distance: position.coords })
            },
            (err) => {
                location_service = false;
                console.log(err)
                modals[0].open();
            },
            { enableHighAccuracy: false, distanceFilter: 100, timeout: 8000 }
        )
    }, [refresh]);


    const addToCart = async (data, index) => {

        let arr = c.order_items;
        let check = await arr.some((v, i) => Object.keys(arr[i])[0] === data.warung);

        if (check) {
            let d = await arr.filter((v, i) => Object.keys(arr[i])[0] === data.warung)[0];
            if (d[data.warung].order_items.some((x, y) => x.id === data.id)) {
                ToastAndroid.showWithGravity(data.menu_name + ' sudah ada di keranjang', ToastAndroid.SHORT, ToastAndroid.BOTTOM, 25, 50)
                return
            }
            dispatch({ type: 'add_order', wr: data.warung, order: data });
            dispatch(ADD_CART_COUNT());
        } else {
            let obj = {
                [data.warung]: {
                    order_items: [data],
                    warung_info: {
                        name: data.warung,
                        distance: data.distance,
                        coords: {
                            latitude: data.coords.latitude,
                            longitude: data.coords.longitude
                        }
                    },
                    courier: {
                        courier_id: Math.random() * 99999999,
                        name: 'Mada Nugraha',
                        courier_of: 'Warung Makan Bu UDIN 3',
                        status: false,
                        ratings: 4.5
                    },
                    details: {
                        order_id: Math.random() * 99999999
                    }
                }
            };
            dispatch({ type: 'add', data: obj })
            dispatch(ADD_CART_COUNT());
        }
    }


    const IncreaseQtyNum = (index, value) => {

        setMenuList(menu_list = menu_list.map((v, i) => (v.id == index ? Object.assign(v, { qty: value, total: v.price_ea * value }) : v)));
    }

    const wait = (timeout) => {
        return new Promise((resolve, reject) => {
            setTimeout(resolve, timeout);
        })
    }

    const ViewSingleFood = (val, idx) => {
        if (val !== null) {
            props.navigation.navigate('ViewPost', { viewSingleData: val })
        }
    }

    const isDarkMode = useDarkMode();
    let carouselRef = useRef(null);

    return (
        <React.Fragment>
            <StatusBar translucent barStyle={isDarkMode ? 'light-content' : 'dark-content'} backgroundColor={isDarkMode ? '#18191C' : 'white'} animated />
            <View style={{ flex: 1, backgroundColor: isDarkMode ? '#121212' : 'white' }}>
                <EnableLocationModal ref={el => (modals[0] = el)} refresh_state={() => onRefresh()} />

                {
                    refresh ? (
                        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                            <ActivityIndicator color='blue' size='large' />
                        </View>
                    )

                        : (
                            <FlatList
                                data={menu_list.sort((a, v) => a.distance - v.distance)}
                                renderItem={({ item }) => (
                                    <ProductListing
                                        id={item.id}
                                        pos={pos}
                                        warung={item.warung}
                                        View_Single_Food={ViewSingleFood}
                                        AddToCardHandler={addToCart}
                                        name={item.menu_name}
                                        NumHandler={IncreaseQtyNum}
                                        price={item.price_ea}
                                        qty={item.qty}
                                        distance={item.distance}
                                        item={item} />
                                )}
                                ListHeaderComponent={({ item }) => (
                                    <React.Fragment>
                                        <Carousel
                                            ref={(ref) => carouselRef = ref}
                                            layout={'stack'}
                                            layoutCardOffset={18}
                                            data={menu_list}
                                            itemWidth={width}
                                            sliderWidth={width}
                                            renderItem={() => <RenderCarouselItem />}
                                            style={{
                                                flex: 1,
                                                paddingHorizontal: 16,
                                                paddingVertical: 16,
                                                backgroundColor: 'white'
                                            }} />

                                        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                            <View style={{ padding: 16, justifyContent: 'center', alignItems: 'center' }}>
                                                <Text style={{ textAlign: 'center', fontSize: width / 19, fontWeight: 'bold', marginBottom: 3, color: isDarkMode ? '#b1b1b1' : 'black' }}>Today's Pick</Text>
                                            </View>
                                            <View style={{ padding: 16, justifyContent: 'center', alignItems: 'center', flexDirection: 'row' }}>
                                                <Icon name='ios-pin' color={isDarkMode ? '#b1b1b1' : 'blue'} type='ionicon' />
                                                <Text style={{ marginLeft: 5, color: 'blue', textAlign: 'center', fontSize: 17, color: isDarkMode ? '#b1b1b1' : 'black' }}>Samarinda</Text>
                                            </View>
                                        </View>
                                    </React.Fragment>

                                )}
                                keyExtractor={item => item.id} />
                        )
                }

{/* 
                <Footer navigation={props.navigation} home_active_link={true} /> */}

            </View>
        </React.Fragment>
    )
}

export default Buy