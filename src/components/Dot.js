import React from "react";
import { StyleSheet, Text, View, useWindowDimensions } from "react-native";
import Animated, { Extrapolation, interpolate, interpolateColor, useAnimatedStyle } from "react-native-reanimated";


const  Dot= ({index, x}) => {
    const {width: SCREEN_WIDTH} = useWindowDimensions()

    const animatedDotStyle = useAnimatedStyle(() => {
        const widthAnimation = interpolate(
            x.value,
            [
                (index - 1) * SCREEN_WIDTH,
                index * SCREEN_WIDTH,
                (index + 1) * SCREEN_WIDTH
            ],
            [10,20,10],
            Extrapolation.CLAMP,  
        );
        const opacityAnimation = interpolate(
            x.value,
            [
                (index - 1) * SCREEN_WIDTH,
                index * SCREEN_WIDTH,
                (index + 1) * SCREEN_WIDTH
            ],
            [0.5,1,0.5],
            Extrapolation.CLAMP,  
        );
        return {
            width: widthAnimation,
            opacity: opacityAnimation
        }
    })

    const animatedColor = useAnimatedStyle(() => {
        const backgroundColor = interpolateColor(
            x.value,
            [0, SCREEN_WIDTH, 2*SCREEN_WIDTH],
            ['#5F3635ff', '#B25B20ff', '#412940ff']
        )
        return {
            backgroundColor:backgroundColor
        }
    })

  return(
    <Animated.View style={[styles.dot, animatedDotStyle, animatedColor]} />
  )
}

export default Dot;

const styles = StyleSheet.create({
    dot: {
        height: 10,
        //backgroundColor: 'black',
        borderRadius: 5,
        marginHorizontal: 10
    }
})