import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { View, Text, Image, TouchableOpacity } from 'react-native';

export class Banner extends Component {

    render() {
        return (
    <View>
          <View style={{ paddingHorizontal: 16, paddingTop: 16 }}>
                <View style={{ position: 'relative' }}>
                      <Image style={{ borderRadius: 4, alignSelf: 'stretch', width: '100%', flex: 1, height: 140 }} source={ require('../../../assets/banner/q3.png')} />
                      <View style={{width: '100%', height: '100%', position:'absolute', top: 0, left: 0, backgroundColor: 'black', opacity: 0.2}}></View>
                      <View style={{ paddingBottom: 38, position: 'absolute', bottom: 0, left: 0, width: '100%', flexDirection: 'row', alignItems:'center', justifyContent: 'center', paddingHorizontal: 16}}>
                  
                        <View>
                              <Text style={{ color: 'white', fontSize: 20, fontWeight: 'bold', marginBottom: 6}}>In Light of COVID-19</Text>
                              <Text style={{ color: 'white', fontSize: 15}}>Sunday, 15 Mar 2020</Text>
                        </View>
                        <View style={{ flex: 1, paddingLeft: 12}}>
                        <TouchableOpacity style={{ backgroundColor: '#2296F3', borderRadius: 4, paddingHorizontal: 12, paddingVertical: 11, alignSelf: 'stretch', alignItems:'center', justifyContent:'center'}}>
                            <Text style={{ fontSize: 14, color: 'white'}}>See what's happening</Text>
                        </TouchableOpacity>
                        </View>
                      
                      </View>
                </View>
              </View>
        </View>
        )
    }
}

export default Banner;
