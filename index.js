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
  View,
    Image
} from 'react-native';

import {StarRateView,RateType}from'./src/StarRateView'

const  BackgroundStarImage=require('./img/backgroundStarImage.png');

const  ForegroundStarImage=require('./img/foregroundStarImage.png');

export default class starRateView extends Component {
  render() {
    return (
        <View style={styles.container}>
          <StarRateView rateStyle={styles.firstStar}
                        foregroundStarImgSource={ForegroundStarImage}
                        backgroundStarImgSource={BackgroundStarImage}
                        numberStars={5}
                        rateType={RateType.WholeStar}
                        animationTimeInterval={200}
                        finish={(score)=>{console.log('score',score)}}/>
          <StarRateView rateStyle={styles.secondStar}
                        foregroundStarImgSource={ForegroundStarImage}
                        backgroundStarImgSource={BackgroundStarImage}
                        numberStars={5}
                        rateType={RateType.HalfStar}
                        finish={(score)=>{console.log('score',score)}}/>
          <StarRateView rateStyle={styles.thirdStar}
                        foregroundStarImgSource={ForegroundStarImage}
                        backgroundStarImgSource={BackgroundStarImage}
                        numberStars={5}
                        rateType={RateType.IncompleteStar}
                        animationTimeInterval={100}
                        finish={(score)=>{console.log('score',score)}}/>
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
  firstStar:{
      flexDirection:'row',
      marginLeft:0,
      marginTop:0,
      width:200,
      height:100
  },
    secondStar:{
        flexDirection:'row',
        marginLeft:0,
        marginTop:50,
        width:200,
        height:100
    },
    thirdStar:{
        flexDirection:'row',
        marginLeft:0,
        marginTop:50,
        width:200,
        height:100
    }
});

AppRegistry.registerComponent('starRateView', () => starRateView);
