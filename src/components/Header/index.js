import React, { Component } from 'react'
import {
    View,
    TextInput,
    Image,
    Text,
    TouchableOpacity,
    Animated
} from 'react-native'

class Header extends Component {
   constructor(props){
       super(props);
       
   }
    render() {
        return (
            <View style={{ marginHorizontal : 17, paddingTop: 15, flexDirection: 'row', height:55}}>
            <TouchableOpacity onPress={() => this.props.navigation.popToTop()} style={{ position: 'relative', flex: 1}}>
                  <Image style={{ position: 'absolute', top: 5, left: 12, height: 30, width: 30}} source={ require('../../../assets/icon/arrow_left.png' )}/>
                  <Text style={{ textAlign: 'center'}}>Hello, Mada Nugraha. Good Evening !</Text>
                  <Text style={{ textAlign: 'center', fontSize: 12}}>Sunday, 15 Mar 2020 | 5:54 PM.</Text>
            </TouchableOpacity>
            <View style={{ borderWidth: 1, borderColor:'blue'}}></View>
          </View>
        )
    }
}

export default Header;
