/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View
} from 'react-native';

import {StarRateView,RateType}from'./src/StarRateView'


export default class starRateView extends Component {
  render() {
    return (
        <View style={styles.container}>
          <StarRateView rateStyle={{flexDirection:'row',marginLeft:0,marginTop:0,width:200,height:100}} numberStars={5} rateType={RateType.WholeStar} animationTimeInterval={200} finish={(score)=>{console.log('score',score)}}/>
          <StarRateView rateStyle={{flexDirection:'row',marginLeft:0,marginTop:50,width:200,height:100}} numberStars={5} rateType={RateType.HalfStar} finish={(score)=>{console.log('score',score)}}/>
          <StarRateView rateStyle={{flexDirection:'row',marginLeft:0,marginTop:50,width:200,height:100}} numberStars={5} rateType={RateType.IncompleteStar}  animationTimeInterval={100} finish={(score)=>{console.log('score',score)}}/>
        </View>

    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});

AppRegistry.registerComponent('starRateView', () => starRateView);
