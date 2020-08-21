import React, { useState, useEffect } from 'react';
import { View, Text, StatusBar, TouchableOpacity, Image } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import NumericInput from 'react-native-numeric-input';

const CartNew = ({ navigation }) => {
    const statusBarHeight = StatusBar.currentHeight;
    return (
        <View style={{
            paddingTop: statusBarHeight,
            flex: 1,
            backgroundColor: 'white'
        }}>
            {/* Header */}
            <View style={{ paddingVertical: 10, paddingHorizontal: 7, flexDirection: 'row', justifyContent: 'space-between' }}>
                <TouchableOpacity onPress={() => navigation.goBack()} activeOpacity={0.6} style={{ padding: 6, width: 40, height: 40, justifyContent: 'center', alignItems: 'center' }}>
                    <Icon name='times-circle' size={25} />
                </TouchableOpacity>
                <View style={{ padding: 6 }}>
                    <Text style={{ fontSize: 20 }}>Your Cart</Text>
                </View>
                <View style={{ padding: 6, width: 40, height: 40, justifyContent: 'center', alignItems: 'center' }} />
            </View>

            {/* Cart Item Section */}
            <View style={{ padding: 16 }}>
                {/* Number of Cart Item */}
                <Text style={{ fontSize: 18, letterSpacing: 2 }}>ITEM COUNT : 1</Text>
            </View>

            <View style={{ padding: 16 }}>
                <View>
                    <View style={{ flexDirection: 'row' }}>
                        {/* Product's Image */}
                        <View style={{ height: 105, width: 100 }}>
                            <Image style={{ height: '100%', width: '100%', alignSelf: 'stretch', borderRadius: 5 }} source={require('../../../assets/food_img/batsoup.png')} />
                        </View>
                        <View style={{ flexDirection: 'column', flex: 1 }}>
                            {/* Product Name Section and Toggle to open and hide more menus */}
                            <View style={{ paddingHorizontal: 6, flexDirection: 'row', justifyContent: 'space-between' }}>
                                <Text style={{ fontSize: 18, letterSpacing: 1.5 }}>Bat Soup</Text>
                                <Text style={{ fontSize: 16, letterSpacing: 1.5 }}>V</Text>
                            </View>
                            {/* Product Price */}
                            <View style={{ paddingHorizontal: 9, paddingTop: 6 }}>
                                <Text style={{ fontSize: 15, letterSpacing: 1.5, fontWeight: 'bold' }}>Rp. 8000</Text>
                            </View>
                            <View style={{ paddingHorizontal: 9, paddingTop: 4 }}>
                                <Text style={{ fontSize: 15, letterSpacing: 1.5 }}>Qty : 3</Text>
                            </View>
                            <View style={{ paddingHorizontal: 9, paddingTop: 4 }}>
                                <View style={{ padding: 4, borderWidth: 1, justifyContent: 'center', alignItems: 'center', borderRadius: 8 }}>
                                    <Text>Hapus</Text>
                                </View>
                            </View>
                        </View>
                    </View>
                    {/** Product's expanded Menu */}
                    <View style={{ padding: 4 }}>
                        <View style={{ padding: 4, borderWidth: 1, borderRadius: 4 }}>
                            <Text>V</Text>
                        </View>
                        <View style={{ paddingTop: 4 }}>
                            <View style={{ flexDirection: 'row', alignItems: 'center' }}>

                                <Text style={{ fontSize: 15, letterSpacing: 1.5 }}>Quantity : </Text>
                                <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                                    <NumericInput
                                        initValue={1}
                                        value={1}
                                        onChange={(value) => console.log(value)}
                                        minValue={1}
                                        valueType={'integer'}
                                        editable={true}
                                        borderColor={'white'}
                                        totalHeight={34}
                                        containerStyle={{
                                            borderWidth: 1,
                                            borderRadius: 4
                                        }}
                                        textColor={'black'}
                                        iconSize={25}
                                        leftButtonBackgroundColor={'white'}
                                        rightButtonBackgroundColor={'white'}
                                        inputStyle={{
                                            borderWidth: 0,
                                            borderRadius: 4
                                        }}
                                        iconStyle={{
                                            borderWidth: 0,
                                            borderRadius: 4
                                        }}
                                    />
                                </View>
                            </View>
                        </View>
                    </View>
                    {/** Border Between each Product */}
                    <View style={{ borderBottomWidth: 1.5, borderBottomColor: 'blue', borderBottomLeftRadius: 4, borderBottomRightRadius: 4, marginTop: 6 }} />
                </View>
            </View>
        </View>
    )
}

export {
    CartNew
}