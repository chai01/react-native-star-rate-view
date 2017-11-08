/**
 * Created by zhaiqingchao on 2017/9/25.
 */
import React,{Component}from 'react';
import PropTypes  from'prop-types'
import {
    View,
    Image,
    StyleSheet,
    PanResponder,
    Animated,
    UIManager,
    findNodeHandle,
    Platform
}from'react-native';
export const RateType = {
    WholeStar: 0,
    HalfStar: 1,
    IncompleteStar: 2
}

Object.freeze(RateType);

var StarView = props => {
        var imgs = [];
        let styles= {
                position: 'absolute',
                flexDirection: 'row',
                width: props.originalWidth / props.numberStars,
                height: props.rateStyle.height, justifyContent: 'center',
                alignItems: 'center',
            }
        for(var i=0;i<props.numberStars;i++){
            imgs.push(
                    <Image key={i} resizeMode={'center'}source={props.source} style={[styles, {left: i * props.originalWidth / props.numberStars}]}/>
            );
        }
        let ViewStyle;
         if(Platform.OS==='android'){
             if(props.rateStyle.width===0){
                 ViewStyle=[props.rateStyle,{backgroundColor:'transparent'}];
             }else
             {
                 ViewStyle= props.rateStyle;
             }

         }else{
             ViewStyle= props.rateStyle;
         }
        return (<View style={ViewStyle}>
            {imgs}
        </View>);
}

export  class StarRateView extends React.Component{


    static props={
        rateStyle:PropTypes.style,
        width:PropTypes.number.isRequired,
        numberStars:PropTypes.number.isRequired,
        rateType:RateType.isRequired,
        foregroundStarImgSource:PropTypes.Image,
        backgroundStarImgSource:PropTypes.Image,
        animationTimeInterval:PropTypes.number,
        finish:PropTypes.func
    }
    static defaultProps = {
        rateStyle: {height:100,width:100,flexDirection:'row',justifyContent: 'space-between'},
    }
    constructor(props){
        super(props);
        this.state={
            numberStars:0,
            currentScore:0,
            width:new Animated.Value(0)
        }
    }
    getStyleObjectByStyleSheet=(styleSheet)=>{
        let style;
        if(!isNaN(styleSheet)){
            style=StyleSheet.flatten(styleSheet)
        }else
        {
            style=styleSheet;
        }
        return style;

    }
    componentWillMount(){
            this._panResponder = PanResponder.create({
                // Ask to be the responder:
                onStartShouldSetPanResponder: (evt, gestureState) => true,
                onStartShouldSetPanResponderCapture: (evt, gestureState) => true,
                onMoveShouldSetPanResponder: (evt, gestureState) => false,
                onMoveShouldSetPanResponderCapture: (evt, gestureState) => false,

                onPanResponderGrant: (evt, gestureState) => {
                    // The gesture has started. Show visual feedback so the user knows
                    // what is happening!
                    var locatoinPageX=evt.nativeEvent.pageX;
                    let style=this.getStyleObjectByStyleSheet(this.props.rateStyle);
                    const handle = findNodeHandle(this._view);
                    UIManager.measure(handle, (x, y, width, height, pageX, pageY) => {
                        //console.log('handle,x,y,width,height,pagex,pagey',handle,x,y,width,height,pageX,pageY);
                        let pX=locatoinPageX-pageX;
                        let realStarScore = pX / (style.width / this.props.numberStars);
                        let currentScore;
                        switch(this.props.rateType){
                            case RateType.WholeStar:{
                                currentScore=Math.ceil(realStarScore);
                                break;
                            }
                            case RateType.HalfStar:{
                                let halfStarScore=Math.round(realStarScore)>realStarScore?Math.ceil(realStarScore):(Math.ceil(realStarScore)-0.5)
                                currentScore=halfStarScore;
                                break;
                            }
                            case RateType.IncompleteStar:{
                                currentScore=realStarScore;
                                break;
                            }
                        }
                        this.setState({currentScore:currentScore});
                        if(this.props.finish){
                            this.props.finish(currentScore)
                        }
                        let animationTimeInterval;
                        if(this.props.animationTimeInterval||this.props.animationTimeInterval===NaN){
                            animationTimeInterval=this.props.animationTimeInterval
                        }else
                        {
                            animationTimeInterval=0;
                        }
                        Animated.timing(
                            this.state.width,
                            {
                                toValue: currentScore/this.props.numberStars*style.width,
                                duration: animationTimeInterval,
                                useNativeDriver: false, // <-- 加上这一行
                            }
                        ).start();

                    });


                },
                onPanResponderMove: (evt, gestureState) => {

                },
                onPanResponderTerminationRequest: (evt, gestureState) => true,
                onPanResponderRelease: (evt, gestureState) => {

                },
                onPanResponderTerminate: (evt, gestureState) => {

                },
                onShouldBlockNativeResponder: (evt, gestureState) => {

                    return true;
                },
            });
        }
    render() {
           let style=this.getStyleObjectByStyleSheet(this.props.rateStyle);
            return(
                    <View ref={(view) => { this._view = view; }}{...this._panResponder.panHandlers}style={style} collapsable={false}>

                        <StarView  source={this.props.backgroundStarImgSource}
                                   originalWidth={style.width}
                                   rateStyle={{position:'absolute',left:0,top:0,width:style.width,height:style.height}}
                                   numberStars={this.props.numberStars}/>
                        <Animated.View style={{position:'absolute',left:0,top:0,width:this.state.width,height:style.height,overflow:'hidden'}}>
                            <StarView  source={this.props.foregroundStarImgSource}
                                       originalWidth={style.width}
                                       rateStyle={{position:'absolute',left:0,top:0,width:this.state.currentScore/this.props.numberStars*style.width,height:style.height,overflow:'hidden'}}
                                       numberStars={this.props.numberStars}/>
                        </Animated.View>

                    </View>

            );
        }

}