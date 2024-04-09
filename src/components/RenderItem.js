import LottieView from "lottie-react-native";
import React from "react";
import { StyleSheet, Text, View, useWindowDimensions } from "react-native";
import Animated, { Extrapolation, interpolate, useAnimatedStyle } from "react-native-reanimated";


const RenderItem = ({item, index, x}) => {
    const {width: SCREEN_WIDTH} = useWindowDimensions()

    const lottieAnimationStyle = useAnimatedStyle(() => {
        const translateYAnimation = interpolate(
            x.value,
            [
                (index - 1) * SCREEN_WIDTH,
                index * SCREEN_WIDTH,
                (index + 1) * SCREEN_WIDTH
            ],
            [200,0,-200],
            Extrapolation.CLAMP,  
        );
        return {
            transform: [{translateY: translateYAnimation }]
        }
    })

    const circleAnimation = useAnimatedStyle(() => {
        const scale = interpolate(
            x.value,
            [
                (index - 1) * SCREEN_WIDTH,
                index * SCREEN_WIDTH,
                (index + 1) * SCREEN_WIDTH
            ],
            [1,4,4],
            Extrapolation.CLAMP,  
        );
        return {
            transform: [{scale: scale }]
        }
    })

  return(
    <View style={[styles.container, {width: SCREEN_WIDTH}]}>
        <View style={styles.circleContanier}>
            <Animated.View  
                style={[{
                    width: SCREEN_WIDTH, 
                    height: SCREEN_WIDTH, 
                    backgroundColor: item.backgroundColor,
                    borderRadius: SCREEN_WIDTH / 2
                  }, circleAnimation]}
                />
        </View>
        <Animated.View style={lottieAnimationStyle}>
            <LottieView source={item.animation} style={{width: SCREEN_WIDTH * 0.9, height: SCREEN_WIDTH * 0.9}} autoPlay loop/>
        </Animated.View>
        <View>
            <Text style={styles.itemTitle}>{item.title}</Text>
            <Text style={styles.itemText}>{item.text}</Text>
        </View>
    </View>
  )
}

export default RenderItem;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-around',
    alignItems: 'center',
    marginBottom: 120
  },
  itemText: {
    fontSize: 15,
    marginHorizontal: 20
  },
  itemTitle:{
    fontSize: 25,
    fontWeight: 'bold',
    marginBottom: 10,
    marginHorizontal: 20
  },
  circleContanier: {
    ...StyleSheet.absoluteFillObject,
    alignItems: 'center',
    justifyContent: 'flex-end'
  }

})