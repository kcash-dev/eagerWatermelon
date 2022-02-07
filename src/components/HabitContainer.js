import { StyleSheet, Text, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { colors, sizes, shadow } from '../../theme/Variables';
import Animated, {
    useSharedValue,
    withTiming,
    useAnimatedStyle
} from 'react-native-reanimated';

//Components
import PressableWrapper from './PressableWrapper';

const HabitContainer = ({ item }) => {
    const [ completed, setCompleted ] = useState(0)
    const [ goal, setGoal ] = useState(5)
    const [ progressPercentage, setProgressPercentage ] = useState()
    const progressWidth = useSharedValue('0%')

    const onPress = () => {
        if (completed !== goal) {
            setCompleted(completed + 1)
        }
    }

    useEffect(() => {
        const percentage = (completed / goal) * 100
        progressWidth.value = `${percentage}%`
    }, [ completed ])

    const transitionConfig = {
        duration: 200
      }
    
    const progressWidthStyles = useAnimatedStyle(() => {
    return {
        width: withTiming(progressWidth.value, transitionConfig)
    }
    })

  return (
    <PressableWrapper
        pressOut={ onPress }
    >
        <View style={[ styles.container, shadow ]}>
            <Animated.View 
                style={[
                    { 
                        backgroundColor: item.color, 
                        height: '100%', 
                        borderRadius: 8,
                        position: 'absolute' 
                    },
                    progressWidthStyles
                ]}
            >
            </Animated.View>
            <View style={ styles.innerTextContainer }>
                <Text style={ styles.text }>{ item.habitName }</Text>
                <Text>{ completed }/{ goal }</Text>
            </View>
            { completed === goal ?
                <View style={ styles.checkContainer }>
                    <MaterialCommunityIcons 
                        name="check-bold" 
                        size={sizes.lg} 
                        color={ colors.black }
                    />
                </View>
                :
                null
            }
        </View>
    </PressableWrapper>
  );
};

export default HabitContainer;

const styles = StyleSheet.create({
    container: {
        width: '90%',
        alignSelf: 'center',
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: colors.invalid,
        borderRadius: 8,
        justifyContent: 'space-between'
    },
    innerTextContainer: {
        paddingLeft: sizes.sm,
        paddingVertical: sizes.sm
    },
    text: {
        fontSize: sizes.xl
    },
    background: {
        backgroundColor: colors.black,
        borderRadius: sizes.xxxl * 2,
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: sizes.sm,
    },
    checkContainer: {
        paddingRight: sizes.sm
    }
});
