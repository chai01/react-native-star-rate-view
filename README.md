# react-native-star-rate-view
a react-native Scoring view, You can add custom image to display and  scoring 

******Npm:

npm install react-native-star-rate-view

*****Requireprops:

rateStyle:  a style object or a stylesheet

numberstars:  the number of stars or other images

rateType:      RateType Object:RateType.WholeStar,RateType.HalfStar,RateType.IncompleteStar

foregroundStarImgSource:    mark score image object  eg:require('./img/foregroundStarImage.png')

backgroundStarImgSource:   become a background image   eg:require('./img/backgroundStarImage.png')

animationTimeInterval:      Animation time  if you don't set,default value is 0 with no animation display

finish                      score callback, get a score    eg:finish={(score)=>{console.log('score',score)}}     
