import React, { Component } from 'react'
import { View, Text, Image } from 'react-native';

export class Menu extends Component {
    static propTypes = {

    }

    render() {
        return (
        <View style={{ marginHorizontal: 17, marginTop: 8}}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', backgroundColor: 'blue', borderTopLeftRadius: 4, borderTopRightRadius: 4, padding: 14 }}>
            {/* <Image style={{ width:30, height: 30}} source={ require('../../../assets/icon//wallet.png')}/> */}
            <Text style={{ fontSize: 17, color: 'white', fontWeight: 'bold'}}>Saldo-ku</Text>
                  <Text style={{ fontSize: 17, color: 'white', fontWeight: 'bold'}}>Rp.123123.-</Text>
            </View>
            <View style={{ borderBottomLeftRadius: 4, borderBottomRightRadius: 4, flexDirection: 'row', paddingTop: 20, paddingBottom: 14, backgroundColor: '#2E64BC'}}>
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', color: 'white'}}>
                  <Image source={ require('../../../assets/icon/pey.png')}/>
                    <Text style={{ fontSize: 13, fontWeight: 'bold', color: 'white', marginTop: 15}}>Pay</Text>
                </View>
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', color: 'white'}}>
                <Image source={ require('../../../assets/icon/nearby.png')}/>
                    <Text style={{ fontSize: 13, fontWeight: 'bold', color: 'white', marginTop: 15}}>Nearby</Text>
                </View>
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', color: 'white'}}>
                <Image source={ require('../../../assets/icon/topup.png')}/>
                    <Text style={{ fontSize: 13, fontWeight: 'bold', color: 'white', marginTop: 15}}>TopUp</Text>
                </View>
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', color: 'white'}}>
                <Image source={ require('../../../assets/icon/moar.png')}/>
                    <Text style={{ fontSize: 13, fontWeight: 'bold', color: 'white', marginTop: 15}}>More</Text>
                </View>
            </View>
          </View>
        )
    }
}

export default Menu;
