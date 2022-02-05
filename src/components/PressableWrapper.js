import { StyleSheet, Pressable } from 'react-native';
import React from 'react';
import Animated, {
    useSharedValue,
    withTiming,
    useAnimatedStyle
  } from 'react-native-reanimated';

const PressableWrapper = ({ children, pressIn, pressOut, style }) => {
    const buttonSize = useSharedValue(1)

    const transitionConfig = {
        duration: 50
      }
      
    const buttonAnimatedStyles = useAnimatedStyle(() => {
      return {
          transform: [{ scale: withTiming(buttonSize.value, transitionConfig) }]
      }
    })

    const runPressInFunction = () => {
        pressIn()
    }

    const runPressOutFunction = () => {
        pressOut()
    }

  return (
    <Animated.View style={[ style, buttonAnimatedStyles ]}>
        <Pressable
            onPressIn={() => {
                if(pressIn) {
                    runPressInFunction()
                }
                buttonSize.value = 0.95
            }}
            onPress={() => {
                if(pressOut) {
                    runPressOutFunction()
                }
                buttonSize.value = 1
            }}
        >
            { children }
        </Pressable>
    </Animated.View>
  );
};

export default PressableWrapper;

const styles = StyleSheet.create({});
