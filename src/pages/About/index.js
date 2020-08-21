import React, { Component } from 'react';
import {View, Text} from 'react-native';
import Footer from '../../components/Footer/index';
import Header from '../../components/Header/index';

class About extends Component {
  constructor(props){
      super(props);
      
    }
      render(){ 
         
          return (
              <View style={{ flex: 1, backgroundColor:'white'}}>
                  <Header navigation={this.props.navigation}/>
            
                  <Footer navigation={this.props.navigation}/>
              </View>
          )
      }
} 

export default About;