// import modules

import React from 'react';
import { useSelector, useDispatch, } from "react-redux";
import { ToastAndroid } from "react-native";
import { ADD_CART_COUNT } from '../Redux/actions/action';


// some functions
const dispatch = useDispatch();
const c = useSelector(state => state.order_items);


/**
 * @description add to cart function that takes 2 parameter, and will store it in local state
 * @param {*} data | required
 * @param {*} index | optional
 */
export const addToCart = async (data, index) => {

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