import React from "react";
import { StyleSheet,  TouchableWithoutFeedback, View, useWindowDimensions } from "react-native";
import Animated, { interpolateColor, useAnimatedStyle, withSpring, withTiming } from "react-native-reanimated";


const CustomButton = ({flatlistRef, flatlistIndex, dataLength, x}) => {
    const {width: SCREEN_WIDTH} = useWindowDimensions()

    const buttonAnimation = useAnimatedStyle(() => {
        return{
            width: flatlistIndex.value === dataLength -1 
                ? withSpring(140) 
                : withSpring(60),
            height: 60
        }
    })

    const arrowAnimationStyle = useAnimatedStyle(() => {
        return{
            width: 30,
            height: 30,
            opacity: 
                flatlistIndex.value === dataLength - 1 ? withTiming(0) : withTiming(1),
            transform: [
                {
                    translateX: flatlistIndex.value === dataLength - 1 ? withTiming(100) : withTiming(0)
                }
            ]

        }
    })

    const animatedColor = useAnimatedStyle(() => {
        const backgroundColor = interpolateColor(
            x.value,
            [0, SCREEN_WIDTH, 2*SCREEN_WIDTH],
            ['#5F3635ff', '#B25B20ff', '#412940ff']
        )
        return {
            backgroundColor: backgroundColor
        }
    })

    const textAnimationStyle = useAnimatedStyle(() => {
        return{
            opacity: flatlistIndex.value === dataLength -1 
                ? withTiming(1)
                : withTiming(0),
            transform: [{
                translateX: flatlistIndex.value === dataLength -1 
                    ? withTiming(0)
                    : withTiming(100)
            }]
        }
    })

  return(
    <TouchableWithoutFeedback
        onPress={() => {
            if(flatlistIndex.value < dataLength -1){
                flatlistRef.current?.scrollToIndex({index: flatlistIndex.value + 1 })
            }
        }}
    >
        <Animated.View style={[styles.container, animatedColor, buttonAnimation]}>
            <Animated.Text style={[styles.text, textAnimationStyle]}>Get Started</Animated.Text>
            <Animated.Image source={require('../assets/images/right-arrow.png')} style={[styles.arrow, arrowAnimationStyle]}/>
        </Animated.View>
    </TouchableWithoutFeedback>
  )
}

export default CustomButton;

const styles = StyleSheet.create({
    container: {
        padding: 10,
        borderRadius: 100,
        justifyContent: 'center',
        alignItems: 'center',
        overflow: 'hidden',
        width: 60,
        height: 60
    },
    arrow:{
        position: 'absolute',
        width: 30,
        height: 30
    },
    text:{
        color: 'white',
        fontSize: 16,
        position: 'absolute'
    }

})